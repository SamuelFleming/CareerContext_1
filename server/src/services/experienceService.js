// server/src/services/experienceService.js

const mongoose = require('mongoose');
const Experience = require('../models/Experience');
const Activity = require('../models/Activity');
const activityService = require('./activityService');
const { createServiceError } = require('../utils/serviceError');
const {
  parseListQuery,
  buildListMeta,
  parseDateParam,
  endOfUtcDay,
  parseCommaSeparated,
  parseBooleanQuery,
  parseOptionalNonNegativeInt,
  escapeRegex,
} = require('../utils/listQuery');

const { EXPERIENCE_TYPES } = Experience;

const EXPERIENCE_SORT_FIELDS = [
  'updatedAt',
  'createdAt',
  'title',
  'dateStart',
  'dateEnd',
  'type',
  'duration',
  'activityCount',
];

const AGGREGATION_SORT_FIELDS = new Set(['duration', 'activityCount']);

const toExperience = (experience) => experience.toJSON();

const toListItem = (experience, activityCount = 0) => {
  const json = typeof experience.toJSON === 'function' ? experience.toJSON() : experience;

  return {
    id: json.id || json._id?.toString(),
    type: json.type,
    title: json.title,
    organisation: json.organisation,
    role: json.role,
    dateStart: json.dateStart,
    dateEnd: json.dateEnd,
    isCurrent: json.isCurrent,
    activityCount,
    technologies: json.technologies,
    skills: json.skills,
    updatedAt: json.updatedAt,
  };
};

const parseExperienceTypes = (value) => {
  const types = parseCommaSeparated(value);

  if (!types.length) {
    return null;
  }

  const invalidType = types.find((type) => !EXPERIENCE_TYPES.includes(type));

  if (invalidType) {
    throw createServiceError(400, `Invalid experience type: ${invalidType}`);
  }

  return types;
};

const buildArrayFieldOrFilter = (fieldName, value) => {
  const terms = parseCommaSeparated(value);

  if (!terms.length) {
    return null;
  }

  return {
    $or: terms.map((term) => ({
      [fieldName]: new RegExp(escapeRegex(term), 'i'),
    })),
  };
};

const buildExperienceListFilter = (userId, query) => {
  const filter = {
    userId: new mongoose.Types.ObjectId(userId),
    isArchived: false,
  };

  const types = parseExperienceTypes(query.type);

  if (types) {
    filter.type = types.length === 1 ? types[0] : { $in: types };
  }

  const isCurrent = parseBooleanQuery('isCurrent', query.isCurrent);

  if (isCurrent !== undefined) {
    filter.isCurrent = isCurrent;
  }

  const dateFrom = parseDateParam('dateFrom', query.dateFrom);
  const dateTo = parseDateParam('dateTo', query.dateTo);

  if (dateFrom !== undefined || dateTo !== undefined) {
    filter.dateStart = { $ne: null };

    if (dateTo !== undefined) {
      filter.dateStart.$lte = endOfUtcDay(dateTo);
    }

    if (dateFrom !== undefined) {
      filter.$or = [
        { dateEnd: { $gte: dateFrom } },
        { isCurrent: true },
        { dateEnd: null },
      ];
    }
  }

  const skillFilter = buildArrayFieldOrFilter('skills', query.skill);

  if (skillFilter) {
    filter.$and = [...(filter.$and || []), skillFilter];
  }

  const technologyFilter = buildArrayFieldOrFilter('technologies', query.technology);

  if (technologyFilter) {
    filter.$and = [...(filter.$and || []), technologyFilter];
  }

  const search = typeof query.search === 'string' ? query.search.trim() : '';

  if (search) {
    const pattern = new RegExp(escapeRegex(search), 'i');
    const searchClause = {
      $or: [
        { title: pattern },
        { organisation: pattern },
        { role: pattern },
        { skills: pattern },
        { technologies: pattern },
      ],
    };

    filter.$and = [...(filter.$and || []), searchClause];
  }

  return filter;
};

const needsAggregationPipeline = ({ sort, minDuration, maxDuration }) =>
  AGGREGATION_SORT_FIELDS.has(sort) || minDuration !== undefined || maxDuration !== undefined;

const buildDurationMonthsExpression = () => ({
  $cond: {
    if: { $eq: ['$dateStart', null] },
    then: null,
    else: {
      $dateDiff: {
        startDate: '$dateStart',
        endDate: {
          $cond: {
            if: { $or: [{ $eq: ['$isCurrent', true] }, { $eq: ['$dateEnd', null] }] },
            then: '$$NOW',
            else: '$dateEnd',
          },
        },
        unit: 'month',
      },
    },
  },
});

const buildActivityCountLookupStages = () => [
  {
    $lookup: {
      from: Activity.collection.name,
      let: { experienceId: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$experienceId', '$$experienceId'] },
                { $eq: ['$isArchived', false] },
              ],
            },
          },
        },
        { $count: 'count' },
      ],
      as: 'activityCountResult',
    },
  },
  {
    $addFields: {
      activityCount: {
        $ifNull: [{ $arrayElemAt: ['$activityCountResult.count', 0] }, 0],
      },
      durationMonths: buildDurationMonthsExpression(),
    },
  },
  {
    $project: {
      activityCountResult: 0,
    },
  },
];

const buildDurationFilterMatch = (minDuration, maxDuration) => {
  const durationFilter = { durationMonths: { $ne: null } };

  if (minDuration !== undefined) {
    durationFilter.durationMonths.$gte = minDuration;
  }

  if (maxDuration !== undefined) {
    durationFilter.durationMonths.$lte = maxDuration;
  }

  return durationFilter;
};

const buildAggregationSortField = (sort) => {
  if (sort === 'duration') {
    return 'durationMonths';
  }

  if (sort === 'activityCount') {
    return 'activityCount';
  }

  return sort;
};

const listExperiencesWithAggregation = async ({
  filter,
  sort,
  order,
  limit,
  offset,
  minDuration,
  maxDuration,
}) => {
  const pipeline = [{ $match: filter }, ...buildActivityCountLookupStages()];

  if (minDuration !== undefined || maxDuration !== undefined) {
    pipeline.push({ $match: buildDurationFilterMatch(minDuration, maxDuration) });
  }

  const sortField = buildAggregationSortField(sort);
  const sortDirection = order === 'asc' ? 1 : -1;

  pipeline.push({
    $facet: {
      items: [
        { $sort: { [sortField]: sortDirection } },
        { $skip: offset },
        { $limit: limit },
      ],
      total: [{ $count: 'total' }],
    },
  });

  const [result] = await Experience.aggregate(pipeline);
  const experiences = result?.items || [];
  const total = result?.total?.[0]?.total || 0;

  const items = experiences.map((experience) =>
    toListItem(experience, experience.activityCount || 0)
  );

  return {
    items,
    meta: buildListMeta({
      count: items.length,
      total,
      limit,
      offset,
    }),
  };
};

const getActivityCountsByExperienceIds = async (experienceIds) => {
  if (!experienceIds.length) {
    return new Map();
  }

  const counts = await Activity.aggregate([
    {
      $match: {
        experienceId: { $in: experienceIds },
        isArchived: false,
      },
    },
    {
      $group: {
        _id: '$experienceId',
        count: { $sum: 1 },
      },
    },
  ]);

  return new Map(counts.map(({ _id, count }) => [_id.toString(), count]));
};

const listExperiencesWithFind = async ({ filter, sortObject, limit, offset }) => {
  const [experiences, total] = await Promise.all([
    Experience.find(filter).sort(sortObject).skip(offset).limit(limit),
    Experience.countDocuments(filter),
  ]);

  const activityCounts = await getActivityCountsByExperienceIds(
    experiences.map((experience) => experience._id)
  );

  const items = experiences.map((experience) =>
    toListItem(experience, activityCounts.get(experience._id.toString()) || 0)
  );

  return {
    items,
    meta: buildListMeta({
      count: items.length,
      total,
      limit,
      offset,
    }),
  };
};

const listExperiences = async (userId, query = {}) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw createServiceError(400, 'Invalid user ID');
  }

  const minDuration = parseOptionalNonNegativeInt('minDuration', query.minDuration);
  const maxDuration = parseOptionalNonNegativeInt('maxDuration', query.maxDuration);

  if (
    minDuration !== undefined &&
    maxDuration !== undefined &&
    minDuration > maxDuration
  ) {
    throw createServiceError(400, 'minDuration must be less than or equal to maxDuration');
  }

  const { limit, offset, sort, order, sortObject } = parseListQuery(query, {
    allowedSortFields: EXPERIENCE_SORT_FIELDS,
    defaultSort: 'updatedAt',
    defaultOrder: 'desc',
    strictSort: true,
  });

  const filter = buildExperienceListFilter(userId, query);

  if (needsAggregationPipeline({ sort, minDuration, maxDuration })) {
    return listExperiencesWithAggregation({
      filter,
      sort,
      order,
      limit,
      offset,
      minDuration,
      maxDuration,
    });
  }

  return listExperiencesWithFind({ filter, sortObject, limit, offset });
};

const createExperience = async (userId, validatedBody) => {
  const experience = new Experience({
    userId,
    ...validatedBody,
  });

  await experience.save();

  return toExperience(experience);
};

const getExperienceById = async (experience) => toExperience(experience);

const updateExperience = async (experience, validatedBody) => {
  Object.assign(experience, validatedBody);
  await experience.save();

  return toExperience(experience);
};

const archiveExperience = async (experience) => {
  experience.isArchived = true;
  experience.archivedAt = new Date();

  await experience.save();
};

const getExperienceWorkspace = async (experience, query = {}) => {
  const listQuery = parseListQuery(query, {
    allowedSortFields: ['updatedAt', 'createdAt', 'title'],
    defaultSort: 'updatedAt',
    defaultOrder: 'desc',
  });

  const { items: activities, meta: activitiesMeta } =
    await activityService.listActivitiesForExperience(experience, query);

  return {
    experience: toExperience(experience),
    activities,
    activitiesMeta,
    journalEntries: [],
    journalMeta: buildListMeta({
      count: 0,
      total: 0,
      limit: listQuery.limit,
      offset: listQuery.offset,
    }),
  };
};

module.exports = {
  listExperiences,
  createExperience,
  getExperienceById,
  updateExperience,
  archiveExperience,
  getExperienceWorkspace,
};
