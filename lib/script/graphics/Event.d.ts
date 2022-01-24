export default class Event<T> {
    private events;
    private noceEvents;
    constructor();
    add(fn: (evt: T) => void): () => boolean;
    once(fn: (evt: T) => void): () => boolean;
    run(evt: T): boolean;
}
