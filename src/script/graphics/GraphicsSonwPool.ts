import GraphicsSonw from "./GraphicsSonw";

/**
 * 粒子对象池
 */
export default class GraphicsSonwPool {
  /**
   * 对象池
   */
  graphicsSonw: GraphicsSonw[] = [];
  /**
   * 对象池最大粒子数量
   */
  graphicsSonwNum = 0;
  /**
   * 对象创建函数
   */
  createParticle: (id: number) => GraphicsSonw;
  /**
   * 计数
   */
  count = 0;

  constructor(
    createParticle: (id: number) => GraphicsSonw,
    graphicsSonwNum: number
  ) {
    this.graphicsSonwNum = graphicsSonwNum;
    this.createParticle = createParticle;
    this.fill();
  }

  fill() {
    for (let i = 0; i < this.graphicsSonwNum; i++) {
      this.count++;
      this.add(this.createParticle(i));
    }
  }

  create() {
    this.count++;
    this.add(this.createParticle(this.count));
  }

  get() {
    return this.graphicsSonw.shift();
  }

  add(graphicsSonw: GraphicsSonw) {
    if (this.graphicsSonw.length > this.graphicsSonwNum) return undefined;
    this.graphicsSonw.push(graphicsSonw);
    return graphicsSonw;
  }
}
