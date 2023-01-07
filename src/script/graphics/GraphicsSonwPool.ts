import { probability, randomNum, timeout } from "../../utils";
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
  /**
   * 延迟创建雪花时间范围
   */
  delayedCreation: [number, number];
  /**
   * 是否开启最大渲染
   */
  maxRenderSnow: boolean;

  constructor(
    createParticle: (id: number) => GraphicsSonw,
    graphicsSonwNum: number,
    delayedCreation: [number, number],
    maxRenderSnow: boolean
  ) {
    this.graphicsSonwNum = graphicsSonwNum;
    this.delayedCreation = delayedCreation;
    this.maxRenderSnow = maxRenderSnow;
    this.createParticle = createParticle;
    this.fill();
  }

  fill() {
    // 开启最大渲染时立即填充满对象池
    if (this.maxRenderSnow) {
      for (let i = 0; i < this.graphicsSonwNum; i++) {
        this.count++;
        this.add(this.createParticle(i));
      }
    } else {
      timeout(() => {
        this.add(this.createParticle(this.count));
        this.count++;
        if (this.graphicsSonwNum >= this.count) {
          this.fill();
        }
      }, randomNum(this.delayedCreation[0], this.delayedCreation[1]));
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
