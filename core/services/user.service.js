const { UserModel } = require('../dataBase/models');

module.exports = {
    createUser: (object) => UserModel.create(object),
    getAllUsers: (query) => UserModel.findAll({ where: query }),
    getSingleUser: (params) => UserModel.findOne({ where: params }),
    getUserById: (id) => UserModel.findByPk(id),
    updateUser: (body, id) => UserModel.update({ ...body }, { where: { id } })
};
