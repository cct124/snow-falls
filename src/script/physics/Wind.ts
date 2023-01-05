import { WINDS } from "../../config";
import { mixins, randomNum } from "../../utils";
import Module from "../modules/module";
import Snow from "../Snow";

/**
 * 风场将给定的高度分为十份，每一份为粒子在当前位置受到的x轴方向的力的随机值的最大最小取值范围
 * ## example
 * ```js
 *  [
 *   [0.001, 0.0008],
 *   [0.0008, 0.0006],
 *   [0.0006, 0.0004],
 *   [0.0004, 0.0002],
 *   [0.0002, 0],
 *   [0, 0],
 *   [0, 0],
 *   [0, 0],
 *   [0, 0],
 *   [0, 0],
 *  ],
 *```
 */
export type WindField = [number, number][];

export interface WindOptions {
  /**
   * 风力影响高度，默认采取画布高度
   */
  height?: number;
  /**
   * 定义的风场集合
   */
  winds?: WindField[];
  /**
   * 风场切换时间随机范围，最大~最小。默认：4000 ~ 2000 毫秒
   */
  switchWindTime?: [number, number];
  /**
   * 受风力影响的粒子数量，默认：0.4 百分比
   */
  windSnowPerc?: number;
}

/**
 * 风力
 */
export default class Wind extends Module {
  height;
  winds;
  windField = 0;
  switchWindTime: [number, number];
  windSnowPerc: number | undefined;

  constructor(options: WindOptions) {
    super();
    const { height, winds, switchWindTime, windSnowPerc } = mixins(
      {
        height: 0,
        winds: WINDS,
        switchWindTime: [4000, 2000],
        windSnowPerc: 0.4,
      },
      options
    );
    this.height = height!;
    this.winds = winds!;
    this.switchWindTime = switchWindTime!;
    this.windSnowPerc = windSnowPerc;
  }

  nextWindField() {
    this.windField =
      this.windField === this.winds.length - 1 ? 0 : this.windField + 1;
  }

  getCurrentWindForce(y: number) {
    let index = Math.ceil((y / this.height) * 10);
    index = index > 9 ? 9 : index;
    index = index < 0 ? 0 : index;

    const [max, min] = this.winds[this.windField][index];
    const xf = randomNum(max, min, 4);
    return { xf };
  }

  hairDryer(dt: number, snow: Snow) {
    snow.snowflakes.forEach((graphics) => {
      if (this.windSnowPerc) {
        const i = graphics.id / snow.graphicsSonwPoolMax;
        if (this.windSnowPerc <= i) return;
      }
      const { xf } = this.getCurrentWindForce(graphics.y);
      graphics.setForce(xf);
    });
  }

  switchWind() {
    const timeout = randomNum(this.switchWindTime[0], this.switchWindTime[1]);
    setTimeout(() => {
      this.nextWindField();
      this.switchWind();
    }, timeout);
  }

  insert(snow: Snow): this {
    if (this.height === 0) this.height = snow.pixi.app.view.offsetHeight;
    this.switchWind();
    snow.pixi.app.ticker.add((dt) => this.hairDryer(dt, snow));
    return this;
  }
}
