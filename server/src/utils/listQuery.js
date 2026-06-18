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
  { allowedSortFields, defaultSort = 'updatedAt', defaultOrder = 'desc' } = {}
) => {
  const sortField = value && allowedSortFields.includes(value) ? value : defaultSort;
  return sortField;
};

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
  const sort = parseSort(query.sort, options);
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
};
