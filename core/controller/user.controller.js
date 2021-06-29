const { ErrorHandler, errorMessage, errorCode } = require('../error');
const { userService } = require('../services');
const { passwordHelper } = require('../helper');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { body } = req;

            const passwordHash = await passwordHelper.hash(body.password);

            await userService.createUser({ ...req.body, password: passwordHash });

            res.json('Create');
        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const { id } = req;

            const user = await userService.getUserById(id);

            if (!user) {
                throw new ErrorHandler(errorCode.BAD_REQUEST,
                    errorMessage.USER_NOT_FOUND.customCode,
                    'User not found');
            }

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { id, body } = req;
            await userService.updateUser(body, id);

            const { dataValues } = await userService.getUserById(id);

            res.json(dataValues);
        } catch (e) {
            next(e);
        }
    }
};
