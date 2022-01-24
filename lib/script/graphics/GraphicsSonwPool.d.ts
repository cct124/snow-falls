import GraphicsSonw from "./GraphicsSonw";
export default class GraphicsSonwPool {
    graphicsSonw: GraphicsSonw[];
    graphicsSonwNum: number;
    createParticle: (id: number) => GraphicsSonw;
    count: number;
    constructor(createParticle: (id: number) => GraphicsSonw, graphicsSonwNum: number);
    fill(): void;
    create(): void;
    get(): GraphicsSonw | undefined;
    add(graphicsSonw: GraphicsSonw): GraphicsSonw | undefined;
}
