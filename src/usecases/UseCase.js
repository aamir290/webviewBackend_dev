const EventEmitter = require('events');

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

