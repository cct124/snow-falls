import * as PIXI from "pixi.js";
import { mixins, probability, randomNum } from "../utils";
import Particle from "./graphics/Particle";
import GraphicsSonwPool from "./graphics/GraphicsSonwPool";
import Snowflake from "./graphics/Snowflake";
import GraphicsSonw from "./graphics/GraphicsSonw";
import { PHYSICAL, WINDS } from "../config";
import Wind, { WindField } from "./nature/Wind";
import Module from "./modules/module";

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
  view?: HTMLElement;
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
   * 开启最大渲染
   */
  maxRenderSnow?: boolean;
  /**
   * 最大渲染延迟
   */
  maxRenderSnowDelay?: [number, number];
  /**
   * 雪花纹理路径
   */
  snowflakeTextureSrc?: string;

  /**
   * 图形创建处理函数，可替换原有的图形创建函数以自定义雪花图形
   */
  graphicsCreateFunction?: () => void | undefined;

  modules?: Module[];
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
  graphicsSonwPool: GraphicsSonwPool | undefined;
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
   * 受风力影响的雪花百分比
   */
  windSnowPerc = 0.2;
  /**
   * 最大渲染延迟
   */
  maxRenderSnowDelay: [number, number];
  /**
   * 载入的模块
   */
  modules: Set<Module>;
  /**
   * 开启最大渲染
   */
  maxRenderSnow: boolean;
  /**
   * 位图路径
   */
  snowflakeTextureSrc?: string;

  loader: PIXI.Loader | undefined;
  /**
   * 图形创建处理函数，可替换原有的图形创建函数以自定义雪花图形
   */
  graphicsCreateFunction?: () => void | undefined;
  /**
   * 对象池最大对象数量
   */
  graphicsSonwPoolMax = 0;

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
      maxRenderSnow,
      maxRenderSnowDelay,
      snowflakeTextureSrc,
      modules,
      graphicsCreateFunction,
    } = mixins(
      {
        view: document.body,
        snowflakeNum: 200,
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
        maxRenderSnow: false,
        maxRenderSnowDelay: [4000, 1000],
        switchWindTime: [4000, 2000],
        modules: [],
      },
      options
    );
    this.view = view!;
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
    this.maxRenderSnow = maxRenderSnow!;
    this.maxRenderSnowDelay = maxRenderSnowDelay!;
    this.snowflakeTextureSrc = snowflakeTextureSrc;
    this.graphicsCreateFunction = graphicsCreateFunction;
    this.graphicsSonwPoolMax = this.snowflakeNum + this.redundancy;
    //导入模块
    this.modules = new Set(modules);

    if (this.snowflakeTextureSrc) {
      this.loader = new PIXI.Loader();
      this.loader.onComplete.add((loader) => {
        this.loadTexture(loader);
      });
      this.loader.add("snow", this.snowflakeTextureSrc);
      this.loader.load();
    } else {
      this.graphicsSonwPool = new GraphicsSonwPool(
        (id: number) => this.newSnowflake(id),
        this.graphicsSonwPoolMax
      );
      this.view.appendChild(this.pixi.app.view);
      this.pixi.app.ticker.add((dt) => this.tickerCreateSnowflake(dt));
    }

    this.insertModules();
  }

  /**
   * 载入模块
   */
  insertModules() {
    this.modules.forEach((module) => {
      module.insert(this);
    });
  }

  loadTexture(loader: PIXI.Loader) {
    this.graphicsSonwPool = new GraphicsSonwPool(
      (id: number) => this.newSnowflake(id, loader.resources["snow"].texture),
      this.graphicsSonwPoolMax
    );
    this.view.appendChild(this.pixi.app.view);
    this.pixi.app.ticker.add((dt) => this.tickerCreateSnowflake(dt));
  }

  newSnowflake(id: number, texture?: PIXI.Texture) {
    const snowflake = new Snowflake({
      id: id,
      app: this.pixi.app,
      size: randomNum(this.snowflakeSize[0], this.snowflakeSize[1], 2),
      cd: randomNum(this.snowCoeDrag[0], this.snowCoeDrag[1], 2),
      mass: randomNum(this.snowflakeMass[0], this.snowflakeMass[1], 4),
      rho: this.rho,
      ag: this.ag,
      texture: texture,
      createFunction: this.graphicsCreateFunction,
    });
    // snowflake.windEffect = probability(this.windSnowPerc);
    snowflake.stops.add((particle) => {
      this.pixi.app.stage.removeChild(particle);
      this.snowflakes.delete(particle);
      this.graphicsSonwPool!.add(particle);
    });
    return snowflake;
  }

  createSnowflake(particle: GraphicsSonw) {
    const x = randomNum(this.width, 0);
    particle.mx(x);
    particle.my(0);
    particle.XF = 0;
    particle.start();
    this.pixi.app.stage.addChild(particle);
  }

  tickerCreateSnowflake(dt: number) {
    if (this.maxRenderSnow) {
      this.maxRender();
    } else {
      this.gentleRender();
    }
  }

  gentleRender() {
    if (this.snowflakes.size < this.snowflakeNum) {
      const particle = this.graphicsSonwPool!.get()!;
      this.snowflakes.add(particle);
      this.createSnowflake(particle);
    }
  }

  maxRender() {
    while (this.snowflakes.size < this.snowflakeNum) {
      const particle = this.graphicsSonwPool!.get()!;
      this.snowflakes.add(particle);
      if (particle.y > 0) {
        this.createSnowflake(particle);
      } else {
        setTimeout(() => {
          this.createSnowflake(particle);
        }, randomNum(this.maxRenderSnowDelay[0], this.maxRenderSnowDelay[1]));
      }
    }
  }

  // hairDryer(dt: number) {
  //   this.snowflakes.forEach((sonw) => {
  //     const { xf } = this.wind!.getCurrentWindForce(sonw.y);
  //     sonw.hairDryer(xf);
  //   });
  // }

  // switchWind() {
  //   const timeout = randomNum(this.switchWindTime[0], this.switchWindTime[1]);
  //   setTimeout(() => {
  //     this.wind!.nextWindField();
  //     this.switchWind();
  //   }, timeout);
  // }

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
