module.exports = {
    BD_URL: process.env,
    PORT: process.env.PORT || 5050,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:4200;http://localhost:3000',

    PASSWORD_POSTGRESQL: process.env.PASSWORD_POSTGRESQL || '5442',
    LOGIN_POSTGRESQL: process.env.LOGIN_POSTGRESQL || 'postgres',
    URL_POSTGRESQL: process.env.URL_POSTGRESQL || 'incora',

};
