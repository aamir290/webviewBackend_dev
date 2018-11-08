const EventEmitter = require('events');

/**
 * Base class for use case.
 * Add common methods for use case.
 * Extends EventEmitter to handle different response for method.
 */
class UseCase extends EventEmitter {

  /**
   * Attach handler to specific usecase event.
   * @param event use case event to react to
   * @param handler function to execute
   */
  on(event, handler){
    if(this.events && this.events[event]){
      return this.addListener(event, handler);
    }

    throw new Error(`Event ${event} doesn't exists for ${this.constructor.name}`);
  }
}

