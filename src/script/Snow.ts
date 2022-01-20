import * as PIXI from "pixi.js";
import { mixins, probability, randomNum } from "../utils";
import Particle from "./graphics/Particle";
import GraphicsSonwPool from "./graphics/GraphicsSonwPool";
import Snowflake from "./graphics/Snowflake";
import GraphicsSonw from "./graphics/GraphicsSonw";
import { PHYSICAL, WINDS } from "../config";
import Wind, { WindField } from "./nature/Wind";

interface SnowPixi {
  app: PIXI.Application;
}

interface WindOptions {
  enable: boolean;
  winds: WindField[];
}

export interface SnowOptions {
  /**
   * 创建下雪动画的DOM容器
   */
  view: HTMLElement;
  /**
   * 在一屏中雪花的最大粒子数量
   */
  snowflakeNum?: number;
  /**
   * 雪花对象池冗余
   */
  redundancy?: number;

  /**
   * 空气密度
   */
  rho?: number;
  /**
   * 重力加速度
   */
  ag?: number;
  /**
   * 雪花大小随机最大最小取值
   */
  snowflakeSize?: [number, number];
  /**
   * 雪花阻力系数随机最大最小取值
   */
  snowCoeDrag?: [number, number];

  /**
   * 雪花质量随机最大最小取值
   */
  snowflakeMass?: [number, number];

  /**
   * 开启风力作用
   */
  windEffect?: WindOptions;
}

export default class Snow {
  pixi: SnowPixi;
  /**
   * 画布宽度
   */
  width: number;
  /**
   * 画布高度
   */
  height: number;
  /**
   * 创建下雪动画的DOM容器
   */
  view: HTMLElement;
  /**
   * 雪花对象池
   */
  graphicsSonwPool: GraphicsSonwPool;
  /**
   * 在一屏中雪花的最大粒子数量
   */
  snowflakeNum: number;
  /**
   * 雪花对象池冗余
   */
  redundancy = 0;
  /**
   * 屏幕中渲染的雪花保存在这里
   */
  snowflakes = new Set<GraphicsSonw>();
  /**
   * 空气密度
   */
  rho = 0;
  /**
   * 重力加速度
   */
  ag = 0;

  /**
   * 雪花大小随机最大最小取值
   */
  snowflakeSize: [number, number];
  /**
   * 雪花阻力系数随机最大最小取值
   */
  snowCoeDrag: [number, number];
  /**
   * 雪花质量随机最大最小取值
   */
  snowflakeMass: [number, number];
  /**
   * 风力
   */
  wind: Wind | undefined;
  /**
   * 不受风力影响的雪花百分比
   */
  windInvaSnowPerc = 0.2;
  switchWindTime = [4000, 2000];
  /**
   * 开启风力作用
   */
  windEffect: WindOptions | undefined;

  modules = new Set<[() => void, boolean]>();

  constructor(options: SnowOptions) {
    const {
      view,
      snowflakeNum,
      redundancy,
      rho,
      ag,
      snowflakeSize,
      snowCoeDrag,
      snowflakeMass,
      windEffect,
    } = mixins(
      {
        view: document.body,
        snowflakeNum: 200,
        createSnowMaxDelay: 2000,
        redundancy: 50,
        rho: PHYSICAL.RHO,
        ag: PHYSICAL.AG,
        snowflakeSize: [2, 1],
        snowCoeDrag: [4, 2],
        snowflakeMass: [0.0005, 0.0002],
        windEffect: {
          enable: true,
          winds: WINDS,
        },
      },
      options
    );
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
    this.snowflakeNum = snowflakeNum!;
    this.redundancy = redundancy!;
    this.rho = rho!;
    this.ag = ag!;
    this.snowflakeSize = snowflakeSize!;
    this.snowCoeDrag = snowCoeDrag!;
    this.snowflakeMass = snowflakeMass!;
    this.windEffect = windEffect;
    this.graphicsSonwPool = new GraphicsSonwPool(
      () => this.newSnowflake(),
      this.snowflakeNum + this.redundancy
    );
    this.view.appendChild(this.pixi.app.view);
    this.pixi.app.ticker.add((dt) => this.tickerCreateSnowflake(dt));
    this.registerModules();
    this.enableModules();
  }

  registerModules() {
    this.registerModule(this.initWindEffect, this.windEffect!.enable);
  }

  registerModule(fn: () => void, enable: boolean): () => void {
    this.modules.add([fn, enable]);
    return fn;
  }
  enableModules() {
    this.modules.forEach(([fn, bool]) => {
      if (bool) fn.call(this);
    });
  }

  initWindEffect() {
    this.wind = new Wind({ height: this.height, winds: WINDS });
    this.switchWind();
    this.pixi.app.ticker.add((dt) => this.hairDryer(dt));
  }

  newSnowflake() {
    const snowflake = new Snowflake({
      app: this.pixi.app,
      size: randomNum(this.snowflakeSize[0], this.snowflakeSize[1], 2),
      cd: randomNum(this.snowCoeDrag[0], this.snowCoeDrag[1], 2),
      mass: randomNum(this.snowflakeMass[0], this.snowflakeMass[1], 4),
      rho: this.rho,
      ag: this.ag,
    });
    snowflake.windEffect = probability(this.windInvaSnowPerc);
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
    particle.XF = 0;
    particle.start();
    this.pixi.app.stage.addChild(particle);
  }

  tickerCreateSnowflake(dt: number) {
    if (this.snowflakes.size < this.snowflakeNum) {
      this.createSnowflake();
    }
  }

  hairDryer(dt: number) {
    this.snowflakes.forEach((sonw) => {
      const { xf } = this.wind!.getCurrentWindForce(sonw.y);
      sonw.hairDryer(xf);
    });
  }

  switchWind() {
    const timeout = randomNum(this.switchWindTime[0], this.switchWindTime[1]);
    setTimeout(() => {
      this.wind!.nextWindField();
      this.switchWind();
    }, timeout);
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
