const { O_AuthModel } = require('../dataBase/models');

module.exports = {
    getTokenByParams: (params) => O_AuthModel.findOne({ where: params }),
    createTokens: (tokens, id) => O_AuthModel.create({ ...tokens, user_id: id }),
    deleteTokensByParams: (params) => O_AuthModel.destroy({ where: params }),
};
