import Observer from "../observer";
/**
 * 粒子类
 */
export default class Particle<T, E> extends Observer<T, E> {
    /**
     * 粒子id
     */
    id: number;
    constructor(id: number);
    /**
     * 设置x轴位置
     * @param x
     */
    mx(x: number): void;
    /**
     * 设置y轴位置
     * @param x
     */
    my(y: number): void;
    /**
     * 设置rotation值
     * @param x
     */
    mr(r: number): void;
}
