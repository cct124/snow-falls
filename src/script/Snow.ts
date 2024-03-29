import * as PIXI from "pixi.js";
import { mixins, randomNum } from "../utils";
import GraphicsSonwPool from "./graphics/GraphicsSonwPool";
import Snowflake from "./graphics/Snowflake";
import GraphicsSonw, { graphicsSonwChannel } from "./graphics/GraphicsSonw";
import { PHYSICAL, WINDS } from "../config";
import Wind from "./physics/Wind";
import Module from "./modules/module";

interface SnowPixi {
  app: PIXI.Application;
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
   * 开启最大渲染，开启最大渲染时设置delayedCreation时间将失效
   */
  maxRenderSnow?: boolean;
  /**
   * 雪花纹理路径
   */
  snowflakeTextureSrc?: string;
  /**
   * 多个位图，将平均填充对象池，如传入`4`张图片路径，对象池数量为`200`，则每个位图生成的数量为`200/4`
   */
  snowflakeTextureSrcs?: string[];
  /**
   * 图形创建处理函数，可替换原有的图形创建函数以自定义雪花图形
   */
  graphicsCreateFunction?: () => void | undefined;

  /**
   * 功能模块扩展
   */
  modules?: Module[];

  /**
   * 舞台背景色，默认透明
   */
  backgroundColor?: number;

  /**
   * 图形随机旋转，在自动生成的圆形图形中没有意义，弧度值
   */
  graphicsRotation?: [number, number];
  /**
   * 图形随机旋转，在自动生成的圆形图形中没有意义，角度值
   */
  graphicsAngle?: [number, number];
  /**
   * 图形随机透明度变化
   */
  alpha?: [number, number];

  /**
   * 延迟创建雪花时间范围
   */
  delayedCreation?: [number, number];
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
   * 屏幕中渲染雪花的集合
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
  /**
   * 多个位图，将平均填充对象池，如传入`4`张图片路径，对象池数量为`200`，则每个位图生成的数量为`200/4`
   */
  snowflakeTextureSrcs?: string[];

  loader: PIXI.Loader | undefined;
  /**
   * 图形创建处理函数，可替换原有的图形创建函数以自定义雪花图形
   */
  graphicsCreateFunction?: (this: Snowflake) => void | undefined;
  /**
   * 对象池最大对象数量
   */
  graphicsSonwPoolMax = 0;

  backgroundColor: number | undefined;

  graphicsRotation: [number, number];

  alpha: [number, number];

  graphicsAngle: [number, number];

  delayedCreation: [number, number];

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
      snowflakeTextureSrc,
      modules,
      backgroundColor,
      graphicsRotation,
      alpha,
      snowflakeTextureSrcs,
      graphicsAngle,
      delayedCreation,
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
        switchWindTime: [4000, 2000],
        graphicsRotation: [0, 0],
        graphicsAngle: [0, 0],
        alpha: [1, 1],
        delayedCreation: [0, 0],
        modules: [],
      },
      options
    );
    this.view = view!;
    this.width = this.view.offsetWidth;
    this.height = this.view.offsetHeight;
    this.backgroundColor = backgroundColor;
    this.pixi = {
      app: new PIXI.Application({
        width: this.width,
        height: this.height,
        transparent: !this.backgroundColor,
        backgroundColor: this.backgroundColor,
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
    this.snowflakeTextureSrc = snowflakeTextureSrc;
    this.snowflakeTextureSrcs = snowflakeTextureSrcs;
    this.graphicsCreateFunction = graphicsCreateFunction;
    this.graphicsSonwPoolMax = this.snowflakeNum + this.redundancy;
    this.graphicsRotation = graphicsRotation!;
    this.graphicsAngle = graphicsAngle!;
    this.alpha = alpha!;
    this.delayedCreation = delayedCreation!;
    //导入模块
    this.modules = new Set(modules);

    if (this.snowflakeTextureSrc) {
      this.loader = new PIXI.Loader();
      this.loader.onComplete.add((loader) => {
        this.loadTexture(loader);
        this.insertModules();
      });
      this.loader.add("snow", this.snowflakeTextureSrc);
      this.loader.load();
    } else if (
      this.snowflakeTextureSrcs &&
      this.snowflakeTextureSrcs.length > 0
    ) {
      this.loader = new PIXI.Loader();
      this.loader.onComplete.add((loader) => {
        this.loadTextures(loader);
        this.insertModules();
      });

      for (const [i, src] of this.snowflakeTextureSrcs.entries()) {
        this.loader.add(i.toString(), src);
      }
      this.loader.load();
    } else {
      this.graphicsSonwPool = new GraphicsSonwPool(
        (id: number) => this.newSnowflake(id),
        this.graphicsSonwPoolMax,
        this.delayedCreation,
        this.maxRenderSnow
      );
      this.view.appendChild(this.pixi.app.view);
      this.pixi.app.ticker.add((dt) => this.tickerCreateSnowflake(dt));
      this.insertModules();
    }
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
      this.graphicsSonwPoolMax,
      this.delayedCreation,
      this.maxRenderSnow
    );
    this.view.appendChild(this.pixi.app.view);
    this.pixi.app.ticker.add((dt) => this.tickerCreateSnowflake(dt));
  }

  loadTextures(loader: PIXI.Loader) {
    this.graphicsSonwPool = new GraphicsSonwPool(
      (id: number) => {
        const i = randomNum(this.snowflakeTextureSrcs!.length - 1, 0);
        return this.newSnowflake(id, loader.resources[i].texture);
      },
      this.graphicsSonwPoolMax,
      this.delayedCreation,
      this.maxRenderSnow
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
      rotation: randomNum(this.graphicsRotation[0], this.graphicsRotation[1]),
      angle: randomNum(this.graphicsAngle[0], this.graphicsAngle[1]),
      alpha: randomNum(this.alpha[0], this.alpha[1], 2),
      rho: this.rho,
      ag: this.ag,
      texture: texture,
      createFunction: this.graphicsCreateFunction,
    });
    // snowflake.windEffect = probability(this.windSnowPerc);
    snowflake.on(graphicsSonwChannel.stop, ({ target }) => {
      this.pixi.app.stage.removeChild(target);
      this.snowflakes.delete(target);
      this.graphicsSonwPool!.add(target);
    });
    return snowflake;
  }

  createSnowflake(particle: GraphicsSonw) {
    const x = randomNum(this.width, 0);
    particle.reset();
    particle.mx(x);
    particle.my(-particle.height);
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
      if (this.graphicsSonwPool) {
        const particle = this.graphicsSonwPool.get();
        if (particle) {
          this.snowflakes.add(particle);
          this.createSnowflake(particle);
        }
      }
    }
  }

  maxRender() {
    while (this.snowflakes.size < this.snowflakeNum) {
      if (this.graphicsSonwPool) {
        const particle = this.graphicsSonwPool.get();
        if (particle) {
          this.snowflakes.add(particle);
          this.createSnowflake(particle);
        }
      }
    }
  }
}
