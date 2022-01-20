import * as PIXI from "pixi.js";
import GraphicsSonw from "./GraphicsSonw";
export interface SnowflakeOptions {
    app: PIXI.Application;
    color?: number;
    size?: number;
    x?: number;
    y?: number;
    cd?: number;
    mass?: number;
}
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
    constructor(options: SnowflakeOptions);
    circle(): void;
}
