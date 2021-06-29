const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware: { checkRefreshToken, checkAccessToken, checkLoginBodyValid } } = require('../middlewares');

router.post('/', checkLoginBodyValid, authController.login);
router.post('/refresh', checkRefreshToken, authController.refreshToken);
router.post('/logout', checkAccessToken, authController.logout);

module.exports = router;
