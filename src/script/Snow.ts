import * as PIXI from "pixi.js";
import { randomNum } from "../utils";
import Particle from "./graphics/Particle";
import GraphicsSonwPool from "./graphics/GraphicsSonwPool";
import Snowflake from "./graphics/Snowflake";
import GraphicsSonw from "./graphics/GraphicsSonw";

interface SnowPixi {
  app: PIXI.Application;
}

export default class Snow {
  width: number;
  height: number;
  view: HTMLElement;
  pixi: SnowPixi;
  graphicsSonwPool: GraphicsSonwPool;
  snowflakeNum: number;
  redundancy = 50;
  snowflakes = new Set<GraphicsSonw>();

  constructor(view = document.body, snowflakeNum = 100) {
    this.view = view;
    this.width = this.view.offsetWidth;
    this.height = this.view.offsetHeight;
    this.pixi = {
      app: new PIXI.Application({
        width: this.width,
        height: this.height,
        backgroundColor: 0x22313f,
      }),
    };
    this.snowflakeNum = snowflakeNum;

    this.graphicsSonwPool = new GraphicsSonwPool(
      () => this.newSnowflake(),
      this.snowflakeNum + this.redundancy
    );
    this.view.appendChild(this.pixi.app.view);
    this.pixi.app.ticker.add((dt) => this.ticker(dt));
  }

  newSnowflake() {
    const snowflake = new Snowflake({
      app: this.pixi.app,
      size: randomNum(2, 1, 2),
      cd: randomNum(0.8, 0.4, 2),
      mass: randomNum(0.0005, 0.0002, 4),
    });
    snowflake.stops.add((particle) => {
      this.pixi.app.stage.removeChild(particle);
      this.snowflakes.delete(particle);
      this.graphicsSonwPool.add(particle);
    });
    return snowflake;
  }

  createSnowflake() {
    const particle = this.graphicsSonwPool.get()!;
    this.snowflakes.add(particle);
    const x = randomNum(this.width, 0);
    particle.mx(x);
    particle.my(0);
    particle.start();
    this.pixi.app.stage.addChild(particle);
  }

  ticker(dt: number) {
    if (this.snowflakes.size < this.snowflakeNum) {
      const timeout = randomNum(1000, 0);
      setTimeout(() => {
        this.createSnowflake();
      }, timeout);
    }
  }

  test() {
    let circle = new PIXI.Graphics();
    circle.beginFill(0x9966ff);
    circle.drawCircle(0, 0, 1);
    circle.endFill();
    circle.x = 100;
    circle.y = 100;
    this.pixi.app.stage.addChild(circle);
  }
}
