import * as PIXI from "pixi.js";

export default class Particle extends PIXI.Container {
  constructor() {
    super();
  }

  mx(x: number) {
    this.x = x;
  }

  my(y: number) {
    this.y = y;
  }
}
