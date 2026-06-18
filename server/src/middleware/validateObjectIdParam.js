// server/src/middleware/validateObjectIdParam.js

const mongoose = require('mongoose');

const validateObjectIdParam = (paramName, label) => {
  const displayLabel = label || paramName;

  return (req, res, next) => {
    const value = req.params[paramName];

    if (!value || !mongoose.isValidObjectId(value)) {
      return res.status(400).json({
        message: `Invalid ${displayLabel}`,
      });
    }

    return next();
  };
};

module.exports = validateObjectIdParam;
