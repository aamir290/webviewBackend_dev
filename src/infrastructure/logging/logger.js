/**
 * Init and configure logger.
 * Use winston library
 *
 * Method for logger :
 *
 *  logger.debug('message');
 *  logger.info('message');
 *  logger.warn('message');
 *  logger.error('message');
 */
const winston = require('winston');

module.exports = (config) => {

  //Custom log format
  const myFormat = winston.format.printf(info => {
    return `${info.level} - ${info.timestamp} : ${info.message}`;
  });

  //Create logger
  const logger = winston.createLogger({
    level: config.log.level || 'info',
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.timestamp(),
      myFormat
    ),
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({filename: 'error.log', level: 'error'}),
      new winston.transports.File({filename: 'combined.log'})
    ]
  });

  //Add console in development mode as stdout
  if (process.env.NODE_ENV !== 'production') {


    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.colorize(),
        myFormat
      )
    }));
  }

  return logger;
};
