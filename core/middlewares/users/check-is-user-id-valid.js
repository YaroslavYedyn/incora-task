const { ErrorHandler, errorMessage, errorCode } = require('../../error');
const { userValidator } = require('../../validators');

module.exports = (req, res, next) => {
    try {
        const { params: { id } } = req;

        const { error } = userValidator.id.validate(id);

        if (error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST,
                errorMessage.ID_NOT_VALID.customCode,
                error.details[0].message);
        }

        req.id = id;
        next();
    } catch (e) {
        next(e);
    }
};
