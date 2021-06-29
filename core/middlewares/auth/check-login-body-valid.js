const { ErrorHandler, errorCode, errorMessage: { USER_NOT_FOUND, BODY_NOT_VALID } } = require('../../error');
const { userService } = require('../../services');
const { authValidator } = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const { error } = authValidator.loginUserValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, BODY_NOT_VALID.customCode, error.details[0].message);
        }

        const { dataValues } = await userService.getSingleUser({ email });

        if (!dataValues) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, USER_NOT_FOUND.customCode, 'User not found!');
        }

        req.user = dataValues;
        next();
    } catch (e) {
        next(e);
    }
};
