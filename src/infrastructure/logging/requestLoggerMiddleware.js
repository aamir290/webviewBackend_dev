/**
 * Log request access to console
 */

const morgan = require('morgan');

module.exports = morgan('dev');

