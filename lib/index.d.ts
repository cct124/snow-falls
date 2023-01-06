import Snow from "./script/Snow";
import Wind from "./script/physics/Wind";
import Borders from "./script/physics/Borders";
import EleBorder from "./script/plugin/EleBorder";
declare const _default: {
    /**
     * 雪花动画类
     */
    Snow: typeof Snow;
    /**
     * 功能扩展模块
     */
    Mod: {
        Wind: typeof Wind;
        Borders: typeof Borders;
        EleBorder: typeof EleBorder;
    };
};
export default _default;
