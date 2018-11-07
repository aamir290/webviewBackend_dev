/**
 * Server Class.
 * Setup server and launch.
 */

const express = require('express');


class Server {

  /**
   * Init application
   * @param router application router
   */
  constructor(router) {
    this.router = router;
    this.express = express();
  }

  start() {
    return new Promise((resolve) => {
      const http = this.express
        .listen(3000, () => {
          const { port } = http.address();
          console.log(`[p ${process.pid}] Listening at port ${port}`);
          resolve();
        });
    });
  }
}

module.exports = Server;
