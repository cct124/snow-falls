export default class Event<T> {
  private events = new Set<(evt: T) => void>();
  constructor() {}

  add(fn: (evt: T) => void) {
    this.events.add(fn);
    return () => this.events.delete(fn);
  }

  run(evt: T) {
    this.events.forEach((fn) => {
      fn(evt);
    });
    return true;
  }
}
