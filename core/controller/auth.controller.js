const { authService } = require('../services');
const { tokenizer, passwordHelper } = require('../helper');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await authService.deleteTokensByParams({ user_id: user.id.toString() });

            await passwordHelper.compare(password, user.password);

            const tokens = tokenizer();

            await authService.createTokens(tokens, user.id);

            res.status(200).json(tokens);
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            await authService.deleteTokensByParams({ access_token: token });

            res.json('logout').status(204);
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const { token, user_id } = req;

            await authService.deleteTokensByParams({ refresh_token: token });

            const tokens = tokenizer();
            await authService.createTokens(tokens, user_id);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};
