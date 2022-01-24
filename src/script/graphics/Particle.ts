import * as PIXI from "pixi.js";
import Observer from "../observer";

export default class Particle<T, E> extends Observer<T, E> {
  id: number;
  constructor(id: number) {
    super();
    this.id = id;
  }

  mx(x: number) {
    this.x = x;
  }

  my(y: number) {
    this.y = y;
  }

  mr(r: number) {
    this.rotation = r;
  }
}
