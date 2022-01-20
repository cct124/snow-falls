import * as PIXI from "pixi.js";
import { PHYSICAL } from "../../config";
import { mixins } from "../../utils";
import Event from "./Event";
import Particle from "./Particle";

export interface GraphicsSonwOptions {
  app: PIXI.Application;
  radius: number;
  mass: number;
  cd: number;
  rho: number;
  ag: number;
}

export default class GraphicsSonw extends Particle {
  app: PIXI.Application;
  frameRate = 1 / 60;
  /**
   * x方向的速度
   */
  vx = 0;
  /**
   * y方向的速度
   */
  vy = 0;

  /**
   * 球的半径
   */
  radius: number;
  /**
   * 质量kg
   */
  mass: number;
  /**
   * 正面面积投影
   */
  A: number;

  /**
   * 阻力系数
   */
  cd: number;

  /**
   * 空气密度
   */
  rho: number;

  /**
   * 重力加速度
   */
  ag: number;

  /**
   * 水平作用于雪花上的力
   */
  XF = 0;
  /**
   * 垂直作用于雪花上的力
   */
  YF = 0;

  stops: Event<GraphicsSonw>;
  /**
   * 动画开始
   */
  animation = false;

  windEffect = true;

  constructor(options: GraphicsSonwOptions) {
    super();

    this.app = options.app;
    this.radius = options.radius;
    this.mass = options.mass;
    this.cd = options.cd;
    this.rho = options.rho;
    this.ag = options.ag;
    this.A = (Math.PI * this.radius * this.radius) / 10000;
    this.app.ticker.add((dt) => this.update(dt));
    this.stops = new Event<GraphicsSonw>();
  }

  update(dt: number) {
    if (this.animation) {
      const offset = this.offset();
      this.mx(offset.x);
      this.my(offset.y);
      if (
        this.y > this.app.view.offsetHeight + this.radius ||
        this.x < 0 ||
        this.x > this.app.view.offsetWidth
      ) {
        this.stop();
      }
    }
  }

  start() {
    this.animation = true;
  }

  stop() {
    this.animation = false;
    this.stops.run(this);
  }

  hairDryer(xf = 0, yf = 0) {
    if (!this.windEffect) return;
    this.XF = xf;
    this.YF = yf;
  }

  /**
   * 计算位移
   * @returns
   */
  offset() {
    let Fx =
      -0.5 *
      this.cd *
      this.A *
      this.rho *
      Math.pow(this.vx, 2) *
      (this.vx / Math.abs(this.vx));
    let Fy =
      -0.5 *
      this.cd *
      this.A *
      this.rho *
      Math.pow(this.vy, 2) *
      (this.vy / Math.abs(this.vy));

    Fx = isNaN(Fx) ? 0 : Fx;
    Fy = isNaN(Fy) ? 0 : Fy;

    const ax = (Fx + this.XF) / this.mass;
    const ay = this.ag + (Fy + this.YF) / this.mass;

    this.vx += ax * this.frameRate;
    this.vy += ay * this.frameRate;

    return {
      x: this.x + this.vx * this.frameRate * 100,
      y: this.y + this.vy * this.frameRate * 100,
    };
  }
}
