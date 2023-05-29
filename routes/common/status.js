const express = require('express');
const router = express.Router();
const { statusController } = require('../../controller/common');

router.route('/')
    .put(statusController.status);

module.exports = router;
