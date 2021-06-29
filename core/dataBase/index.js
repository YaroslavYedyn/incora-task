const { Sequelize } = require('sequelize');

const { URL_POSTGRESQL, LOGIN_POSTGRESQL, PASSWORD_POSTGRESQL } = require('../config/configs');
const { database: { development } } = require('../config');

module.exports.sequelize = new Sequelize({
    username: 'postgres',
    host: 'localhost',
    dialect: 'postgres',
    password: '5442',
    database: 'incora',
});
