import Snow from "../Snow";
/**
 * 模块抽象类
 */
export default abstract class Module {
    /**
     * 模块插入函数
     * @param snow
     */
    abstract insert(snow: Snow): this;
}
