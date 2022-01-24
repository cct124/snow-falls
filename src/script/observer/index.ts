import * as PIXI from "pixi.js";

export default class Observer<T, E> extends PIXI.Container {
  private map: Map<T, Set<(event: E, ...args: unknown[]) => void>>;
  constructor(observer?: [T, Set<(...args: unknown[]) => void>][]) {
    super();
    this.map = new Map(observer);
  }

  on(channel: T, fn: (event: E, ...args: unknown[]) => void) {
    if (this.map.has(channel)) {
      this.map.get(channel)!.add(fn);
    } else {
      this.map.set(channel, new Set([fn]));
    }

    return () => this.map.get(channel)!.delete(fn);
  }

  send(channel: T, event: E, ...args: unknown[]) {
    if (!this.map.has(channel)) return;
    this.map.get(channel)!.forEach((fn) => fn(event, ...args));
  }
}
