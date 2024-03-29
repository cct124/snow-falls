import GraphicsSonw from "./GraphicsSonw";
/**
 * 粒子对象池
 */
export default class GraphicsSonwPool {
    /**
     * 对象池
     */
    graphicsSonw: GraphicsSonw[];
    /**
     * 对象池最大粒子数量
     */
    graphicsSonwNum: number;
    /**
     * 对象创建函数
     */
    createParticle: (id: number) => GraphicsSonw;
    /**
     * 计数
     */
    count: number;
    /**
     * 延迟创建雪花时间范围
     */
    delayedCreation: [number, number];
    /**
     * 是否开启最大渲染
     */
    maxRenderSnow: boolean;
    constructor(createParticle: (id: number) => GraphicsSonw, graphicsSonwNum: number, delayedCreation: [number, number], maxRenderSnow: boolean);
    fill(): void;
    create(): void;
    get(): GraphicsSonw | undefined;
    add(graphicsSonw: GraphicsSonw): GraphicsSonw | undefined;
}
