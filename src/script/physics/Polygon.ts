import GraphicsSonw from "../graphics/GraphicsSonw";

export default class Polygon {
  points: [number, number][];
  snow: GraphicsSonw[] = [];
  snowMaxNum: number;

  constructor(points: [number, number][], snowMaxNum = 50) {
    this.points = points;
    this.snowMaxNum = snowMaxNum;
    console.log(this.snowMaxNum);
  }

  add(graphics: GraphicsSonw): boolean {
    if (this.snow.length < this.snowMaxNum) {
      this.snow.push(graphics);
      return true;
    } else {
      return false;
    }
  }

  inside(point: [number, number]) {
    if (this.points.length > 2) {
      return this.polygon(point, this.points);
    } else {
      return this.line(this.points[0], this.points[1], point);
    }
  }

  /**
   * 检测一个点是否在多边形内部
   * @param point
   * @param ps
   * @returns
   */
  polygon(point: [number, number], points: [number, number][]) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

    const x = point[0],
      y = point[1];

    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const xi = points[i][0],
        yi = points[i][1];
      const xj = points[j][0],
        yj = points[j][1];

      var intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  }

  /**
   * 线段碰撞检测
   * @param l1
   * @param l2
   * @param p
   * @returns
   */
  line(l1: [number, number], l2: [number, number], p: [number, number]) {
    // get distance from the point to the two ends of the line
    const d1 = this.dist(p, l1);
    const d2 = this.dist(p, l2);

    // get the length of the line
    const lineLen = this.dist(l1, l2);

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    const buffer = 0.1; // higher # = less accurate

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
      return true;
    }
    return false;
  }

  dist(t1: [number, number], t2: [number, number]) {
    const a = t1[0] - t2[0];
    const b = t1[1] - t2[1];
    return Math.sqrt(a * a + b * b);
  }
}
