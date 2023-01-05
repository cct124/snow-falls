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
export declare type WindField = [number, number][];
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
    height: number;
    winds: WindField[];
    windField: number;
    switchWindTime: [number, number];
    windSnowPerc: number | undefined;
    constructor(options: WindOptions);
    nextWindField(): void;
    getCurrentWindForce(y: number): {
        xf: number;
    };
    hairDryer(dt: number, snow: Snow): void;
    switchWind(): void;
    insert(snow: Snow): this;
}
