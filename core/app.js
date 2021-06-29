const express = require('express');
const fileUploader = require('express-fileupload');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');

const { PORT, ALLOWED_ORIGIN } = require('./config/configs');
const { sequelize } = require('./dataBase');
const { apiRouter } = require('./routes');

const app = express();

const configureCors = (origin, callback) => {
    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!origin) {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new Error('Cors not allowed'), false);
    }

    return callback(null, true);
};

app.use(cors({ origin: configureCors }));

app.use(express.json());
app.use(morgan('dev'));
app.use(fileUploader());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            customCode: err.customCode || 0,
            message: err.message || ''
        });
});

sequelize.sync({ alter: true })
    .then(() => app.listen(5050, () => {
        console.log(`App listen ${PORT}`);
    }));

console.log(dotenv);
