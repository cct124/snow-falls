import Observer from "../observer";

/**
 * 粒子类
 */
export default class Particle<T, E> extends Observer<T, E> {
  /**
   * 粒子id
   */
  id: number;
  constructor(id: number) {
    super();
    this.id = id;
  }

  /**
   * 设置x轴位置
   * @param x
   */
  mx(x: number) {
    this.x = x;
  }
  /**
   * 设置y轴位置
   * @param x
   */
  my(y: number) {
    this.y = y;
  }
  /**
   * 设置rotation值
   * @param x
   */
  mr(r: number) {
    this.rotation = r;
  }
}
