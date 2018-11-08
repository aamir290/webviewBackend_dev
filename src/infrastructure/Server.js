/**
 * Server Class.
 * Setup server and launch.
 */

const express = require('express');


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

    this.express = express();
    this.express.use(router);
  }

  start() {
    return new Promise((resolve) => {
      const port = this.config.port || 3000;
      const host = this.config.host || 'localhost';

      const http = this.express
        .listen(port, host, () => {
          this.logger.info(`[p ${process.pid}] - Listening at ${host}:${port}`);
          resolve();
        });
    });
  }
}

module.exports = Server;
