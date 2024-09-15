const express = require('express');
const router = express.Router();

const LoginController = require('../Controller/LoginController');
const LoginMiddlewares = require('../Middlewares/LoginMiddlewares');

router.use(LoginMiddlewares)

router.post('/login', LoginController.login);

module.exports = router;