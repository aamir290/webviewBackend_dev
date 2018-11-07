/**
 * Server Class.
 * Setup server and launch.
 */

class Server {

  /**
   * Init application.
   */
  constructor(router) {
    this.router = router;
  }

  async start() {
    return new Promise((resolve) => {
      resolve();
    });
  }
}

module.exports = Server;
