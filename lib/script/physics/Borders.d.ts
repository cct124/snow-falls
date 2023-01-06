import Module from "../modules/module";
import Snow from "../Snow";
import Polygon from "./Polygon";
export interface BordersOptions {
    /**
     * 边界集合
     */
    polygons: {
        /**
         * 边界的第一个点和第二个点
         */
        points: [number, number][];
        /**
         * 边界的最大积雪数量
         */
        snowMaxNum?: number;
    }[];
    showPolygon?: boolean;
}
export default class Borders extends Module {
    /**
     * 边界集合
     */
    polygons: Set<Polygon>;
    showPolygon: boolean;
    constructor(options: BordersOptions);
    insert(snow: Snow): this;
    ticker(dt: number, snow: Snow): void;
    melts(): void;
    drawPolygon(polygon: Polygon, snow: Snow): void;
}
