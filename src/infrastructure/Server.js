/**
 * Server Class.
 * Setup server and launch.
 */

const express = require('express');
const applyHttpHeaderSecurity = require('./security/htppHeaderSecurityManager');
const errorHandlerMiddlware = require('./error/errorHandlerMiddleware');


class Server {

  /**
   * Init application
   * @param router application router
   * @param config Server configuration
   * @param logger logger for application
   */
  constructor(router, config, logger) {
    this.config = config;
    this.logger = logger;
    this.server = undefined;

    this.express = express();
    applyHttpHeaderSecurity(this.express);
    this.express.use(router);
    this.express.use(errorHandlerMiddlware);
  }

  start() {
    return new Promise((resolve) => {
      const port = this.config.port || 2000;
      const host = this.config.host || 'localhost';

      this.server = this.express
        .listen(port, host, () => {
          this.logger.info(`Listening at ${host}:${port}`);
          this.logger.info(`[p ${process.pid}]`);
          resolve();
        });
    });
  }

  stop() {
    this.server.close();
  }
}

module.exports = Server;
