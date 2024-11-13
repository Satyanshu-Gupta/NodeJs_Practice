const express = require('express');
const router = express.Router();
const UsersController = require('../Controller/UsersController');
const UsersMiddlewares = require('../Middlewares/UsersMiddlewares');
const authorizeRole = require('@middlewares/authorization');
const { ROLES_CONSTANT } = require('@utils/constants');

router.get('', authorizeRole(ROLES_CONSTANT.SUPER_ADMIN), UsersController.getAllUsers);
router.post('/create', UsersMiddlewares.validateUser, UsersController.createUser);
router.get('/:id', UsersController.getUserById);
router.put('/:id', UsersMiddlewares.validateUser, UsersController.updateUser);
router.delete('/:id', UsersController.deleteUser);

module.exports = router;
