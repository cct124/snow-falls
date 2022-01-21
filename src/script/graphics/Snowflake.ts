import * as PIXI from "pixi.js";
import { mixins } from "../../utils";
import GraphicsSonw from "./GraphicsSonw";

export interface SnowflakeOptions {
  id: number;
  app: PIXI.Application;
  color?: number;
  size: number;
  x?: number;
  y?: number;
  cd: number;
  mass: number;
  rho: number;
  ag: number;
  texture?: PIXI.Texture;
  createFunction?: () => void | undefined;
}

export default class Snowflake extends GraphicsSonw {
  private graphics: PIXI.Graphics | undefined;
  /**
   * 图形颜色
   */
  color: number;
  /**
   * 图形大小
   */
  size: number;

  texture?: PIXI.Texture;

  createFunction?: () => void | undefined;

  constructor(options: SnowflakeOptions) {
    const { size, color, x, y, texture, createFunction, id } = mixins(
      { color: 0xffffff, x: 0, y: 0 },
      options
    );
    super({
      radius: size,
      ...options,
    });
    this.color = color!;
    this.size = size;
    this.x = x!;
    this.y = y!;
    this.texture = texture;
    this.createFunction = createFunction;
    if (this.createFunction) {
      this.createFunction.call(this);
    } else {
      if (texture) {
        this.bitmap(texture);
      } else {
        this.graphics = new PIXI.Graphics();
        this.circle(this.graphics);
      }
    }
  }

  bitmap(texture: PIXI.Texture) {
    const sprite = new PIXI.Sprite(texture);
    sprite.width = this.size;
    sprite.height = this.size;
    this.addChild(sprite);
  }

  circle(graphics: PIXI.Graphics) {
    graphics.beginFill(this.color);
    graphics.drawCircle(0, 0, this.size);
    graphics.endFill();
    this.addChild(graphics);
  }
}
