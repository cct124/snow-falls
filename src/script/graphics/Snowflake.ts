import * as PIXI from "pixi.js";
import { mixins } from "../../utils";
import GraphicsSonw from "./GraphicsSonw";

export interface SnowflakeOptions {
  app: PIXI.Application;
  color?: number;
  size?: number;
  x?: number;
  y?: number;
  cd?: number;
  mass?: number;
  rho?: number;
  ag?: number;
}

export default class Snowflake extends GraphicsSonw {
  private graphics: PIXI.Graphics;
  /**
   * 图形颜色
   */
  color: number;
  /**
   * 图形大小
   */
  size: number;

  constructor(options: SnowflakeOptions) {
    const { size, color, x, y } = mixins(
      { color: 0xffffff, size: 2, x: 0, y: 0 },
      options
    );
    super({
      radius: size!,
      ...options,
    });
    this.color = color!;
    this.size = size!;
    this.x = x!;
    this.y = y!;
    this.graphics = new PIXI.Graphics();
    this.circle();
  }

  circle() {
    this.graphics.beginFill(this.color);
    this.graphics.drawCircle(0, 0, this.size);
    this.graphics.endFill();
    this.addChild(this.graphics);
  }
}
