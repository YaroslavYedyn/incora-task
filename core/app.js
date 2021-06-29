const cors = require('cors');
const dotenv = require('dotenv').config();
const express = require('express');
const fileUploader = require('express-fileupload');
const http = require('http');
const morgan = require('morgan');
const { Server } = require('socket.io');

const { PORT, ALLOWED_ORIGIN } = require('./config/configs');
const { constants: { SOCKET_EVENTS_ENUM } } = require('./constants');
const { sequelize } = require('./dataBase');
const { apiRouter } = require('./routes');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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

io.on('connection', (socket) => {
    console.log('connected');
    socket.on(SOCKET_EVENTS_ENUM.NEW_NOTIFICATION, ({ message }) => {
        socket.emit(SOCKET_EVENTS_ENUM.SHOW_NOTIFICATION, message);
    });
    socket.on('disconnect', () => {
        console.log('disconnected');
    });
});

sequelize.sync({ alter: true })
    .then(() => server.listen(5050, () => {
        console.log(`App listen ${PORT}`);
    }));

console.log(dotenv);
