import * as PIXI from "pixi.js";
import Event from "./Event";
import Particle from "./Particle";
export interface GraphicsSonwOptions {
    app: PIXI.Application;
    radius: number;
    mass?: number;
    cd?: number;
}
export default class GraphicsSonw extends Particle {
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
     * 水平作用于雪花上的力
     */
    XF: number;
    /**
     * 垂直作用于雪花上的力
     */
    YF: number;
    stops: Event<GraphicsSonw>;
    /**
     * 动画开始
     */
    animation: boolean;
    constructor(options: GraphicsSonwOptions);
    update(dt: number): void;
    start(): void;
    stop(): void;
    /**
     * 计算位移
     * @returns
     */
    offset(): {
        x: number;
        y: number;
    };
}
