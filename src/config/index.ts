import { WindField } from "../script/physics/Wind";

export const PHYSICAL = {
  /**
   * 重力加速度
   */
  AG: 9.81,
  /**
   * 空气密度
   */
  RHO: 1.22,
  /**
   * 雪花的物理常量
   */
  SONW: {
    /**
     * 阻力系数
     */
    CD: 0.47,
    RE: 0,
  },
};

export const WINDS: WindField[] = [
  [
    [0.001, 0.0008],
    [0.0008, 0.0006],
    [0.0006, 0.0004],
    [0.0004, 0.0002],
    [0.0002, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
  [
    [0, 0],
    [0.0004, 0.0002],
    [0.0006, 0.0004],
    [0.0008, 0.0006],
    [0.001, 0.0008],
    [0.0008, 0.0006],
    [0.0006, 0.0004],
    [0.0002, 0],
    [0, 0],
    [0, 0],
  ],
];
