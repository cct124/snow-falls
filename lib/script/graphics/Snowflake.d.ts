import * as PIXI from "pixi.js";
import GraphicsSonw from "./GraphicsSonw";
export interface SnowflakeOptions {
    id: number;
    app: PIXI.Application;
    color?: number;
    size: number;
    x?: number;
    y?: number;
    cd: number;
    mass: number;
    rho: number;
    ag: number;
    texture?: PIXI.Texture;
    createFunction?: () => void | undefined;
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
    texture?: PIXI.Texture;
    createFunction?: () => void | undefined;
    constructor(options: SnowflakeOptions);
    bitmap(texture: PIXI.Texture): void;
    circle(graphics: PIXI.Graphics): void;
}
