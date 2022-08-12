/**
 * 生成一个从 `start` 到 `end` 的递增数字数组
 * @param start
 * @param end
 * @returns
 */
export declare function genArr(start: number, end: number): number[];
/**
 * 在某个数字区间内取随机数
 * @param maxNum 最大值
 * @param minNum 最小值
 * @param decimalNum 几位小数
 * @returns
 */
export declare function randomNum(maxNum: number, minNum: number, decimalNum?: number): number;
/**
 * 随机数组的排列顺序
 * @param array
 * @returns
 */
export declare function shuffle(array: unknown[]): unknown[];
/**
 * 混合两个对象
 * @param t1
 * @param t2
 * @returns
 */
export declare function mixins<T>(t1: unknown, t2: T): T;
/**
 * 给定一个概率将返回符合该概率的true值
 * @param p
 * @returns
 */
export declare function probability(p: number): boolean;
