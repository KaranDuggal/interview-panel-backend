const express = require('express');
const router = express.Router();
// const { Auth } = require('../../middleware/index');

router.use('/auth', require('./auth'));
router.use('/tattoo', require('./tattoo'));
router.use('/tag', require('./tag'));
router.use('/product', require('./product'));


module.exports = router;
