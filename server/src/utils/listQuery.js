// server/src/utils/listQuery.js

const { createServiceError } = require('./serviceError');

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

const parseLimit = (value, { defaultLimit = DEFAULT_LIMIT, maxLimit = MAX_LIMIT } = {}) => {
  if (value === undefined || value === '') {
    return defaultLimit;
  }

  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed < 1) {
    throw createServiceError(400, 'limit must be a positive integer');
  }

  return Math.min(parsed, maxLimit);
};

const parseOffset = (value) => {
  if (value === undefined || value === '') {
    return 0;
  }

  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed < 0) {
    throw createServiceError(400, 'offset must be a non-negative integer');
  }

  return parsed;
};

const parseSort = (
  value,
  { allowedSortFields, defaultSort = 'updatedAt', defaultOrder = 'desc', strict = false } = {}
) => {
  if (value === undefined || value === '') {
    return defaultSort;
  }

  if (!allowedSortFields.includes(value)) {
    if (strict) {
      throw createServiceError(400, `sort must be one of: ${allowedSortFields.join(', ')}`);
    }

    return defaultSort;
  }

  return value;
};

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const parseDateParam = (name, value) => {
  if (value === undefined || value === '') {
    return undefined;
  }

  if (typeof value !== 'string' || !ISO_DATE_REGEX.test(value)) {
    throw createServiceError(400, `${name} must be an ISO date (YYYY-MM-DD)`);
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(parsed.getTime())) {
    throw createServiceError(400, `${name} must be a valid date`);
  }

  return parsed;
};

const endOfUtcDay = (date) =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));

const parseCommaSeparated = (value) => {
  if (value === undefined || value === '') {
    return [];
  }

  if (typeof value !== 'string') {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseBooleanQuery = (name, value) => {
  if (value === undefined || value === '') {
    return undefined;
  }

  const normalized = String(value).toLowerCase();

  if (normalized === 'true') {
    return true;
  }

  if (normalized === 'false') {
    return false;
  }

  throw createServiceError(400, `${name} must be true or false`);
};

const parseOptionalNonNegativeInt = (name, value) => {
  if (value === undefined || value === '') {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed < 0) {
    throw createServiceError(400, `${name} must be a non-negative integer`);
  }

  return parsed;
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const parseOrder = (value, { defaultOrder = 'desc' } = {}) => {
  if (value === undefined || value === '') {
    return defaultOrder;
  }

  const normalized = value.toLowerCase();

  if (normalized !== 'asc' && normalized !== 'desc') {
    throw createServiceError(400, 'order must be asc or desc');
  }

  return normalized;
};

const buildSortObject = (sortField, order) => ({
  [sortField]: order === 'asc' ? 1 : -1,
});

const buildListMeta = ({ count, total, limit, offset }) => ({
  count,
  total,
  limit,
  offset,
  hasMore: offset + count < total,
});

const parseListQuery = (query, options = {}) => {
  const limit = parseLimit(query.limit, options);
  const offset = parseOffset(query.offset);
  const sortOptions = {
    ...options,
    strict: options.strictSort === true,
  };
  const sort = parseSort(query.sort, sortOptions);
  const order = parseOrder(query.order, options);

  return {
    limit,
    offset,
    sort,
    order,
    sortObject: buildSortObject(sort, order),
    search: typeof query.search === 'string' ? query.search.trim() : '',
  };
};

module.exports = {
  DEFAULT_LIMIT,
  MAX_LIMIT,
  parseListQuery,
  buildListMeta,
  parseDateParam,
  endOfUtcDay,
  parseCommaSeparated,
  parseBooleanQuery,
  parseOptionalNonNegativeInt,
  escapeRegex,
};
