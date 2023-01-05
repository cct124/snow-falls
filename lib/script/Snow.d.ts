import * as PIXI from "pixi.js";
import GraphicsSonwPool from "./graphics/GraphicsSonwPool";
import Snowflake from "./graphics/Snowflake";
import GraphicsSonw from "./graphics/GraphicsSonw";
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
    /**
     * 功能模块扩展
     */
    modules?: Module[];
    /**
     * 舞台背景色，默认透明
     */
    backgroundColor?: number;
    /**
     * 图形随机旋转，在自动生成的圆形图形中没有意义
     */
    graphicsRotation?: [number, number];
    /**
     * 图形随机透明度变化
     */
    alpha?: [number, number];
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
    redundancy: number;
    /**
     * 屏幕中渲染雪花的集合
     */
    snowflakes: Set<GraphicsSonw>;
    /**
     * 空气密度
     */
    rho: number;
    /**
     * 重力加速度
     */
    ag: number;
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
    windSnowPerc: number;
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
    graphicsSonwPoolMax: number;
    backgroundColor: number | undefined;
    graphicsRotation: [number, number];
    alpha: [number, number];
    constructor(options: SnowOptions);
    /**
     * 载入模块
     */
    insertModules(): void;
    loadTexture(loader: PIXI.Loader): void;
    newSnowflake(id: number, texture?: PIXI.Texture): Snowflake;
    createSnowflake(particle: GraphicsSonw): void;
    tickerCreateSnowflake(dt: number): void;
    gentleRender(): void;
    maxRender(): void;
    test(): void;
}
export {};
