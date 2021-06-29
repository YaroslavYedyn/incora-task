const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middlewares');

router.post('/', userMiddleware.checkIsCreateUserValid, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userMiddleware.checkIsUserIdValid, userController.getUserById);

module.exports = router;
