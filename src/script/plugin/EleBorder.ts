import Borders, { BordersOptions } from "../physics/Borders";

export default class EleBorder extends Borders {
  className: string;
  coefficient?: (ele: HTMLElement) => number;
  constructor(className: string, coefficient?: (ele: HTMLElement) => number) {
    const eles = Array.from(
      document.querySelectorAll(`.${className}`)
    ) as HTMLElement[];
    const polygons = eles.map((ele) => {
      const options = {
        points: [
          [ele.offsetLeft, ele.offsetTop],
          [ele.offsetLeft + ele.offsetWidth, ele.offsetTop],
        ],
        snowMaxNum: ele.offsetWidth,
      };

      if (coefficient) options.snowMaxNum = coefficient(ele);
      return options;
    });

    super({
      polygons,
    } as BordersOptions);
    this.className = className;
    this.coefficient = coefficient;
  }
}
