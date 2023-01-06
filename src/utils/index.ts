/**
 * 生成一个从 `start` 到 `end` 的递增数字数组
 * @param start
 * @param end
 * @returns
 */
export function genArr(start: number, end: number): number[] {
  return Array.from(new Array(end + 1).keys()).slice(start);
}

/**
 * 在某个数字区间内取随机数
 * @param maxNum 最大值
 * @param minNum 最小值
 * @param decimalNum 几位小数
 * @returns
 */
export function randomNum(
  maxNum: number,
  minNum: number,
  decimalNum?: number
): number {
  let max = 0,
    min = 0;
  minNum <= maxNum
    ? ((min = minNum), (max = maxNum))
    : ((min = maxNum), (max = minNum));
  switch (arguments.length) {
    case 1:
      return Math.floor(Math.random() * (max + 1));
    case 2:
      return Math.floor(Math.random() * (max - min + 1) + min);
    case 3:
      return parseFloat(
        (Math.random() * (max - min) + min).toFixed(decimalNum)
      );
    default:
      return Math.random();
  }
}

/**
 * 随机数组的排列顺序
 * @param array
 * @returns
 */
export function shuffle(array: unknown[]): unknown[] {
  const len = array.length;
  const shuffles = len * 3;
  for (let i = 0; i < shuffles; i++) {
    const wallSlice = array.pop();
    const pos = Math.floor(Math.random() * (len - 1));
    array.splice(pos, 0, wallSlice);
  }
  return array;
}

/**
 * 混合两个对象
 * @param t1
 * @param t2
 * @returns
 */
export function mixins<T>(t1: any, t2: T): T {
  return Object.assign(t1, t2);
}

/**
 * 给定一个概率将返回符合该概率的true值
 * @param p
 * @returns
 */
export function probability(p: number) {
  const pr = p * 100;
  const ran = randomNum(100, 0);
  return pr >= ran;
}

/**
 * 基于 [requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame) 实现的定时器
 * @param callback
 * @param ms
 */
export function timeout(callback: (time: number) => void, ms = 0) {
  let start: number | undefined;
  function step(timestamp: number) {
    if (start === undefined) start = timestamp;
    const elapsed = timestamp - start;
    if (elapsed < ms) {
      window.requestAnimationFrame(step);
    } else {
      return callback(elapsed);
    }
  }
  window.requestAnimationFrame(step);
}
