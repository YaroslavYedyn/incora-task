const bcrypt = require('bcrypt');

const { ErrorHandler, errorMessage, errorCode } = require('../error');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordEquals = await bcrypt.compare(password, hashPassword);
        if (!isPasswordEquals) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, errorMessage.TOO_WEAK_PASSWORD.customCode, 'Password to weak');
        }
    }
};
