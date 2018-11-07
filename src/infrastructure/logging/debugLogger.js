/**
 * Init and configure debug loger
 */

const logger = {};

//method for debug log
logger.debug = require('debug')('searchDirectoryApi');

//Method for information log
logger.info = require('debug')('info');

//Method for error log
logger.error = require('debug')('error');


module.exports = logger;
