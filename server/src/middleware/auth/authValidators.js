//server/src/middleware/validators/authValidator.js

const { body } = require("express-validator");
const validateRequest = require("../validateRequest");

const registerValidation = [
    body("name")
        .exists({ checkFalsy: true })
        .withMessage("name is required")
        .isString()
        .withMessage("name must be a string")
        .trim(),

    body("email")
        .exists({ checkFalsy: true })
        .withMessage("email is required")
        .isEmail()
        .withMessage("email must be a valid email address")
        .normalizeEmail(),

    body("password")
        .exists({ checkFalsy: true })
        .withMessage("password is required")
        .isString()
        .withMessage("password must be a string")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters long"),

    validateRequest,
];

const loginValidation = [
    body("email")
        .exists({ checkFalsy: true })
        .withMessage("email is required")
        .isEmail()
        .withMessage("email must be a valid email address")
        .normalizeEmail(),

    body("password")
        .exists({ checkFalsy: true })
        .withMessage("password is required")
        .isString()
        .withMessage("password must be a string"),

    validateRequest,
];

module.exports = {
    registerValidation,
    loginValidation,
};