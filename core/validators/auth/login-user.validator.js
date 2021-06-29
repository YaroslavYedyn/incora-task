const Joi = require('joi');

const { regexp: { PASSWORD, EMAIL } } = require('../../constants');

module.exports = Joi.object({
    email: Joi.string()
        .trim()
        .required()
        .regex(EMAIL),
    password: Joi.string()
        .trim()
        .required()
        .regex(PASSWORD)
});
