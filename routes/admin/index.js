const express = require('express');
const router = express.Router();
// const { Auth } = require('../../middleware/index');

router.use('/auth', require('./auth'));


module.exports = router;
