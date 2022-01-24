import Module from "../modules/module";
import Snow from "../Snow";
export declare type WindField = [number, number][];
export interface WindOptions {
    height?: number;
    winds?: WindField[];
    switchWindTime?: [number, number];
    windSnowPerc?: number;
}
export default class Wind extends Module {
    height: number;
    winds: WindField[];
    windField: number;
    switchWindTime: [number, number];
    windSnowPerc: number | undefined;
    constructor(options: WindOptions);
    nextWindField(): void;
    getCurrentWindForce(y: number): {
        xf: number;
    };
    hairDryer(dt: number, snow: Snow): void;
    switchWind(): void;
    insert(snow: Snow): this;
}
