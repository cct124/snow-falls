import Observer from "../observer";
export default class Particle<T, E> extends Observer<T, E> {
    id: number;
    constructor(id: number);
    mx(x: number): void;
    my(y: number): void;
    mr(r: number): void;
}
