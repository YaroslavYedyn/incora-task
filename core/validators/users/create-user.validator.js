const Joi = require('joi');

const { regexp: { EMAIL, PASSWORD, PHONE } } = require('../../constants');

module.exports = Joi.object({
    first_name: Joi.string()
        .trim()
        .required()
        .min(2),
    last_name: Joi.string()
        .trim()
        .min(2),
    email: Joi.string()
        .trim()
        .required()
        .regex(EMAIL),
    phone: Joi.string()
        .trim()
        .regex(PHONE),
    password: Joi.string()
        .trim()
        .required()
        .min(8)
        .regex(PASSWORD)
});
