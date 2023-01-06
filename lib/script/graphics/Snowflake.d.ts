import * as PIXI from "pixi.js";
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
     * 图形旋转，在自动生成的圆形图形中没有意义
     */
    rotation?: number;
    /**
     * 图形透明度
     */
    alpha?: number;
    /**
     * 创建函数，传入自定义的创建函数
     */
    createFunction?: (this: Snowflake) => void | undefined;
}
/**
 * 雪花类
 */
export default class Snowflake extends GraphicsSonw {
    private graphics;
    /**
     * 图形颜色
     */
    color: number;
    /**
     * 图形大小
     */
    size: number;
    texture?: PIXI.Texture;
    alpha: number;
    createFunction?: (this: this) => void | undefined;
    constructor(options: SnowflakeOptions);
    bitmap(texture: PIXI.Texture): void;
    circle(graphics: PIXI.Graphics): void;
}
