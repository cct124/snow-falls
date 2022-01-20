import GraphicsSonw from "./GraphicsSonw";

export default class GraphicsSonwPool {
  graphicsSonw: GraphicsSonw[] = [];
  graphicsSonwNum = 0;
  createParticle: () => GraphicsSonw;

  constructor(createParticle: () => GraphicsSonw, graphicsSonwNum: number) {
    this.graphicsSonwNum = graphicsSonwNum;
    this.createParticle = createParticle;
    this.fill();
  }

  fill() {
    for (let i = 0; i < this.graphicsSonwNum; i++) {
      this.add(this.createParticle());
    }
  }

  get() {
    return this.graphicsSonw.shift();
  }

  add(graphicsSonw: GraphicsSonw) {
    if (this.graphicsSonw.length >= this.graphicsSonwNum) return undefined;
    this.graphicsSonw.push(graphicsSonw);
    return graphicsSonw;
  }
}
