import GraphicsSonw from "../graphics/GraphicsSonw";
export default class Polygon {
    points: [number, number][];
    snow: GraphicsSonw[];
    snowMaxNum: number;
    constructor(points: [number, number][], snowMaxNum?: number);
    add(graphics: GraphicsSonw): boolean;
    inside(point: [number, number]): boolean;
    /**
     * 检测一个点是否在多边形内部
     * @param point
     * @param ps
     * @returns
     */
    polygon(point: [number, number], points: [number, number][]): boolean;
    /**
     * 线段碰撞检测
     * @param l1
     * @param l2
     * @param p
     * @returns
     */
    line(l1: [number, number], l2: [number, number], p: [number, number]): boolean;
    dist(t1: [number, number], t2: [number, number]): number;
}
