'use strict';

var router = require('express').Router();
var morgan = require('morgan');

// router.use(function(req, res, next){
//   if(req.)
// })
router.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

module.exports = router;
