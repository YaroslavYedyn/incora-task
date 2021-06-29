const { ErrorHandler, errorMessage, errorCode } = require('../../error');
const { userValidator } = require('../../validators');

module.exports = (req, res, next) => {
    try {
        const { body } = req;

        const { error } = userValidator.createUser.validate(body);

        if (error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST,
                errorMessage.BODY_NOT_VALID.customCode,
                error.details[0].message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
