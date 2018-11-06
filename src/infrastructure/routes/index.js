var express = require('express');
var router = express.Router();
const debug = require('debug')('searchDirectoryApi');

/* GET home page. */
router.get('/', function(req, res, next) {
  debug('toto');
  res.send('respond with a resource');
});

module.exports = router;
