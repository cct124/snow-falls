import Snow from "../Snow";

export default abstract class Module {
  /**
   * 模块插入函数
   * @param snow
   */
  abstract insert(snow: Snow): boolean;
}
