/**
 * Init and configure debug loger
 */

const logger = {};

//method for debug log
logger.debug = require('debug')('searchDirectoryApi-debug');

//Method for information log
logger.info = require('debug')('searchDirectoryApi-info');

//Method for error log
logger.error = require('debug')('searchDirectoryApi-error');


module.exports = logger;
