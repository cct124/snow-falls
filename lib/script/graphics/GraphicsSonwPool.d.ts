import GraphicsSonw from "./GraphicsSonw";
export default class GraphicsSonwPool {
    graphicsSonw: GraphicsSonw[];
    graphicsSonwNum: number;
    createParticle: () => GraphicsSonw;
    constructor(createParticle: () => GraphicsSonw, graphicsSonwNum: number);
    fill(): void;
    get(): GraphicsSonw | undefined;
    add(graphicsSonw: GraphicsSonw): GraphicsSonw | undefined;
}
