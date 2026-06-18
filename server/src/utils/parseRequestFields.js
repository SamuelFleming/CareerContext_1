// server/src/utils/parseRequestFields.js

const { createServiceError } = require('./serviceError');

const parseOptionalDate = (value, fieldName) => {
  if (value === undefined) {
    return undefined;
  }

  if (value === null || value === '') {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw createServiceError(400, `${fieldName} must be a valid date`);
  }

  return date;
};

const parseStringArray = (value, fieldName) => {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw createServiceError(400, `${fieldName} must be an array`);
  }

  return value.map((item) => {
    if (typeof item !== 'string') {
      throw createServiceError(400, `${fieldName} must contain strings`);
    }

    return item.trim();
  });
};

module.exports = {
  parseOptionalDate,
  parseStringArray,
};
