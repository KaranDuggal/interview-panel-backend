const express = require('express');
const router = express.Router();
const {AuthController} = require('../../controller/admin');

router.route('/signup')
    .post(AuthController.signup)

router.route('/login')
    .post(AuthController.login)



module.exports = router;
