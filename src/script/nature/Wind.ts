import { mixins, randomNum } from "../../utils";

export type WindField = [number, number][];

export interface WindOptions {
  height: number;
  winds: WindField[];
}

export default class Wind {
  height;
  winds;
  windField = 0;

  constructor(options: WindOptions) {
    const { height, winds } = mixins({}, options);
    this.height = height;
    this.winds = winds;
  }

  nextWindField() {
    this.windField =
      this.windField === this.winds.length - 1 ? 0 : this.windField + 1;
  }

  getCurrentWindForce(y: number) {
    let index = Math.ceil((y / this.height) * 10);
    index = index > 9 ? 9 : index;
    const [max, min] = this.winds[this.windField][index];
    const xf = randomNum(max, min, 4);
    return { xf };
  }
}
