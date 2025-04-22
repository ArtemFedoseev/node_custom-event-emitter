'use strict';

class MyEventEmitter {
  #listeners;

  constructor() {
    this.#listeners = {};
  }

  on(event, callback) {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [];
    }
    this.#listeners[event].push(callback);
  }
  once(event, callback) {
    callback.once = true;
    this.on(event, callback);
  }
  off(event, callback) {
    if (!this.#listeners[event]) {
      return;
    }

    this.#listeners[event] = this.#listeners[event].filter(
      (elem) => elem !== callback,
    );
  }
  emit(event, ...args) {
    if (!this.#listeners[event]) {
      return;
    }

    for (const callback of this.#listeners[event]) {
      callback(...args);
    }

    this.#listeners[event] = this.#listeners[event].filter((el) => !el.once);
  }
  prependListener(event, callback) {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [callback];

      return;
    }
    this.#listeners[event] = [callback, ...this.#listeners[event]];
  }
  prependOnceListener(event, callback) {
    callback.once = true;

    this.prependListener(event, callback);
  }
  removeAllListeners(event) {
    if (!event) {
      this.#listeners = {};

      return;
    }

    if (!this.#listeners[event]) {
      return;
    }

    this.#listeners[event] = [];
  }
  listenerCount(event) {
    if (!this.#listeners[event]) {
      return 0;
    }

    return this.#listeners[event].length;
  }
}

module.exports = MyEventEmitter;
