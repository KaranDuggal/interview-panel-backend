const express = require('express');
const router = express.Router();
const { TagController } = require('../../controller/common');

router.route('/')
    .get(TagController.get);

module.exports = router;