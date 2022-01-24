import Module from "../modules/module";
import Snow from "../Snow";
import Polygon from "./Polygon";
export interface BordersOptions {
    polygons: {
        points: [number, number][];
        snowMaxNum: number;
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
