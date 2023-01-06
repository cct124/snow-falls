import * as PIXI from "pixi.js";
/**
 * 事件类
 */
export default class Observer<T, E> extends PIXI.Container {
    private map;
    constructor(observer?: [T, Set<(...args: unknown[]) => void>][]);
    on(channel: T, fn: (event: E, ...args: unknown[]) => void): () => boolean;
    send(channel: T, event: E, ...args: unknown[]): void;
}
