const Joi = require('joi');

module.exports = Joi.number().integer().required().min(1);
