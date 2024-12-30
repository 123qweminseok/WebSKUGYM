const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/findPassword',userController.findPassword);
router.post('/findEmail',userController.findEmail);

module.exports = router;