const jwt = require('jsonwebtoken');

const { authService } = require('../../services');
const { errorMessage: { NO_TOKEN, WRONG_TOKEN }, errorCode, ErrorHandler } = require('../../error');
const { jwtSecret: { JWT_REFRESH_SECRET } } = require('../../config');
const { constants: { AUTHORIZATION } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, NO_TOKEN.customCode);
        }

        jwt.verify(token, JWT_REFRESH_SECRET, (error) => {
            if (error) {
                throw new ErrorHandler(errorCode.BAD_REQUEST, WRONG_TOKEN.customCode, error.details[0].message);
            }
        });

        const { dataValues } = await authService.getTokenByParams({ refresh_token: token });

        if (!dataValues) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, WRONG_TOKEN.customCode);
        }

        req.user_id = dataValues.user_id;
        req.token = token;
        next();
    } catch (e) {
        next(e);
    }
};
