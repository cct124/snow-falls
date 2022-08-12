export default class Event<T> {
    private events;
    constructor();
    add(fn: (evt: T) => void): () => boolean;
    run(evt: T): boolean;
}
