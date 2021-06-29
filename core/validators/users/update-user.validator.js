const Joi = require('joi');

const { regexp: { EMAIL, PHONE } } = require('../../constants');

module.exports = Joi.object({
    first_name: Joi.string()
        .trim()
        .min(2),
    last_name: Joi.string()
        .trim()
        .min(2),
    email: Joi.string()
        .trim()
        .regex(EMAIL),
    phone: Joi.string()
        .trim()
        .regex(PHONE),
});
