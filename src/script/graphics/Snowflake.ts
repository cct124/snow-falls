import * as PIXI from "pixi.js";
import { mixins } from "../../utils";
import GraphicsSonw from "./GraphicsSonw";

export interface SnowflakeOptions {
  /**
   * 雪花的id
   */
  id: number;
  app: PIXI.Application;
  /**
   * 雪花的颜色
   */
  color?: number;
  /**
   * 雪花的大小
   */
  size: number;
  /**
   * 雪花的x轴位置
   */
  x?: number;
  /**
   * 雪花的y轴位置
   */
  y?: number;
  /**
   * 雪花的阻力系数
   */
  cd: number;
  /**
   * 雪花的质量
   */
  mass: number;
  /**
   * 雪花的受到的空气密度系数
   */
  rho: number;
  /**
   * 雪花的受到的重力加速度
   */
  ag: number;
  /**
   * 位图类，传入这个值将不自动创建PIXI图形，使用位图代替雪花
   */
  texture?: PIXI.Texture;
  /**
   * 创建函数，传入自定义的创建函数
   */
  createFunction?: () => void | undefined;
}

/**
 * 雪花类
 */
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
