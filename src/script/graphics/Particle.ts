import * as PIXI from "pixi.js";

export default class Particle extends PIXI.Container {
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
