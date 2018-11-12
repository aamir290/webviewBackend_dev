/**
 * Application Class.
 * Initiate global element and start server.
 */

module.exports = class Application {

  /**
   * Init application.
   * @param server representing server object to start for app.
   */
  constructor(server) {
    this.server = server;
  }

  async start() {
    if (this.server && this.server.start) {
      await this.server.start();
    }else{
      throw new Error('Application must have server to start');
    }
  }
};
