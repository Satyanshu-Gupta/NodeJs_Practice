const express = require('express');
const router = express.Router();
const UsersController = require('../Controller/UsersController');
const UsersMiddlewares = require('../Middlewares/UsersMiddlewares');

// Public routes
router.get('', UsersController.getAllUsers);
router.post('/create', UsersMiddlewares.validateUser, UsersController.createUser);
router.get('/:id', UsersController.getUserById);
router.put('/:id', UsersMiddlewares.validateUser, UsersController.updateUser);
router.delete('/:id', UsersController.deleteUser);

module.exports = router;
