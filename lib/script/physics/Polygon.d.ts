import GraphicsSonw from "../graphics/GraphicsSonw";
export default class Polygon {
    /**
     * 多边形点集合
     */
    points: [number, number][];
    /**
     * 在当前多边形堆积的粒子效果
     */
    snow: GraphicsSonw[];
    /**
     * 最大堆积数量
     */
    snowMaxNum: number;
    /**
     * 创建积雪多边形
     * @param points 多边形点集合
     * @param snowMaxNum 最大堆积数量
     */
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
