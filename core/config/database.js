const { LOGIN_POSTGRESQL, PASSWORD_POSTGRESQL, URL_POSTGRESQL } = require('./configs');

module.exports = {
    development: {
        username: LOGIN_POSTGRESQL,
        password: PASSWORD_POSTGRESQL,
        database: URL_POSTGRESQL,
        host: 'localhost',
        dialect: 'postgres'
    }
};
