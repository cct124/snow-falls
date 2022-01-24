import GraphicsSonw from "./GraphicsSonw";

export default class GraphicsSonwPool {
  graphicsSonw: GraphicsSonw[] = [];
  graphicsSonwNum = 0;
  createParticle: (id: number) => GraphicsSonw;
  count = 0;

  constructor(
    createParticle: (id: number) => GraphicsSonw,
    graphicsSonwNum: number
  ) {
    this.graphicsSonwNum = graphicsSonwNum;
    this.createParticle = createParticle;
    this.fill();
  }

  fill() {
    for (let i = 0; i < this.graphicsSonwNum; i++) {
      this.count++;
      this.add(this.createParticle(i));
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
