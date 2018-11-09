const EventEmitter = require('events');

/**
 * Base class for use case.
 * Add common methods for use case.
 * Extends EventEmitter to handle different response for method.
 */
class UseCase extends EventEmitter {

  /**
   * Construct use case
   * @param events array of events handle by use case
   */
  constructor(events) {
    super();

    this._setEvents(events);
  }

  /**
   * Set array off events handle by usecase
   * @param eventsArray array of events handle by use case
   * @private
   */
  _setEvents(eventsArray) {
    this.events = eventsArray.reduce((array, currentEvent) => {
      array[currentEvent] = currentEvent;
      return array;
    }, Object.create(null));
  }

  /**
   * Attach handler to specific usecase event.
   * @param event use case event to react to
   * @param handler function to execute
   */
  on(event, handler) {
    if (this.events && this.events[event]) {
      return this.addListener(event, handler);
    }

    throw new Error(`Event ${event} doesn't exists for ${this.constructor.name}`);
  }
}

module.exports = UseCase;
