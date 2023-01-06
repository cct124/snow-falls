import { WindField } from "../script/physics/Wind";
export declare const PHYSICAL: {
    /**
     * 重力加速度
     */
    AG: number;
    /**
     * 空气密度
     */
    RHO: number;
    /**
     * 雪花的物理常量
     */
    SONW: {
        /**
         * 阻力系数
         */
        CD: number;
        RE: number;
    };
};
export declare const WINDS: WindField[];
