const express = require('express');
const router = express.Router();

router.use('/status', require('./status'));
router.use('/tag', require('./tag'));

module.exports = router;
