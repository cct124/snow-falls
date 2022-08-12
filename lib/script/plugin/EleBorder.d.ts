import Borders from "../physics/Borders";
/**
 * 将元素的边界映射到Borders类中，开启积雪效果
 */
export default class EleBorder extends Borders {
    className: string;
    coefficient?: (ele: HTMLElement) => number;
    /**
     * 元素顶部产生积雪效果
     * @param className 开启积雪效果的css类名
     * @param coefficient 传入一个函数，返回当前元素顶部最大的积雪数量，调整这个数值以节约性能
     */
    constructor(className: string, coefficient?: (ele: HTMLElement) => number);
}
