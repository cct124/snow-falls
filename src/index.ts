import Snow from "./script/Snow";
import Wind from "./script/physics/Wind";
import Borders from "./script/physics/Borders";
import EleBorder from "./script/plugin/EleBorder";

export default {
  /**
   * 雪花动画类
   */
  Snow,
  /**
   * 功能扩展模块
   */
  Mod: {
    Wind,
    Borders,
    EleBorder,
  },
};
