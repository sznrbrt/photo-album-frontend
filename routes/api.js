'use strict';

var express = require('express');
var router = express.Router();

// /api/
router.use('/imgs', require('./imgs'));
router.use('/albums', require('./albums'));

module.exports = router;
