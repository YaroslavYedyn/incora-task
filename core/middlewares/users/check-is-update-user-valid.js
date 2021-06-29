const { ErrorHandler, errorCode, errorMessage } = require('../../error');
const { userValidator } = require('../../validators');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { params: { id }, body } = req;

        const idValid = userValidator.id.validate(id);

        if (idValid.error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST,
                errorMessage.ID_NOT_VALID.customCode,
                idValid.error.details[0].message);
        }
        const { error } = userValidator.updateUser.validate(body);

        if (error) {
            throw new ErrorHandler(errorCode.BAD_REQUEST,
                errorMessage.BODY_NOT_VALID.customCode,
                error.details[0].message);
        }

        const { dataValues } = await userService.getUserById(id);

        req.user = dataValues;
        req.id = id;
        next();
    } catch (e) {
        next(e);
    }
};
