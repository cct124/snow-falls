import * as PIXI from "pixi.js";
import Particle from "./Particle";
export interface GraphicsSonwOptions {
    app: PIXI.Application;
    radius: number;
    mass: number;
    cd: number;
    rho: number;
    ag: number;
    id: number;
}
export declare enum graphicsSonwChannel {
    stop = "stop",
    melt = "melt"
}
export interface GraphicsSonwEvent {
    event: graphicsSonwChannel;
    target: GraphicsSonw;
}
export default class GraphicsSonw extends Particle<graphicsSonwChannel, GraphicsSonwEvent> {
    app: PIXI.Application;
    frameRate: number;
    /**
     * x方向的速度
     */
    vx: number;
    /**
     * y方向的速度
     */
    vy: number;
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
    XF: number;
    /**
     * 垂直作用于雪花上的力
     */
    YF: number;
    /**
     * 动画开始
     */
    animation: boolean;
    /**
     * 开启融化效果，一个透明度逐渐为0的动画效果
     */
    melt: boolean;
    constructor(options: GraphicsSonwOptions);
    update(dt: number): void;
    reset(): void;
    start(): void;
    stop(): void;
    setForce(xf?: number, yf?: number): void;
    /**
     * 计算位移
     * @returns
     */
    offset(): {
        x: number;
        y: number;
    };
}
