import * as PIXI from "pixi.js";
import GraphicsSonwPool from "./graphics/GraphicsSonwPool";
import Snowflake from "./graphics/Snowflake";
import GraphicsSonw from "./graphics/GraphicsSonw";
interface SnowPixi {
    app: PIXI.Application;
}
export default class Snow {
    width: number;
    height: number;
    view: HTMLElement;
    pixi: SnowPixi;
    graphicsSonwPool: GraphicsSonwPool;
    snowflakeNum: number;
    redundancy: number;
    snowflakes: Set<GraphicsSonw>;
    constructor(view?: HTMLElement, snowflakeNum?: number);
    newSnowflake(): Snowflake;
    createSnowflake(): void;
    ticker(dt: number): void;
    test(): void;
}
export {};
