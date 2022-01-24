import { mixins } from "../../utils";
import Module from "../modules/module";
import Snow from "../Snow";
import Polygon from "./Polygon";
import * as PIXI from "pixi.js";
import { graphicsSonwChannel } from "../graphics/GraphicsSonw";

export interface BordersOptions {
  polygons: {
    points: [number, number][];
    snowMaxNum?: number;
  }[];
  showPolygon?: boolean;
}

export default class Borders extends Module {
  /**
   * 边界集合
   */
  polygons = new Set<Polygon>();

  showPolygon: boolean;

  constructor(options: BordersOptions) {
    super();
    const { polygons, showPolygon } = mixins({ showPolygon: true }, options);
    for (const points of polygons) {
      this.polygons.add(new Polygon(points.points, points.snowMaxNum));
    }
    this.showPolygon = showPolygon!;
  }

  insert(snow: Snow): this {
    // this.polygons.forEach((polygon) => this.drawPolygon(polygon, snow));
    snow.pixi.app.ticker.add((dt: number) => {
      this.ticker(dt, snow);
    });
    return this;
  }

  ticker(dt: number, snow: Snow) {
    snow.snowflakes.forEach((graphics) => {
      if (graphics.melt) return;
      this.polygons.forEach((polygon) => {
        if (polygon.inside([graphics.x, graphics.y])) {
          if (polygon.add(graphics)) {
            graphics.animation = false;
            snow.snowflakes.delete(graphics);
          } else {
            graphics.animation = false;
            graphics.melt = true;
            const del = graphics.on(graphicsSonwChannel.melt, () => {
              del();
              graphics.melt = false;
              snow.snowflakes.delete(graphics);
              // if (snow.graphicsSonwPool) snow.graphicsSonwPool.add(graphics);
            });
            snow.graphicsSonwPool!.create();
          }
        }
      });
    });
  }

  melts() {
    console.log("melts");
  }

  drawPolygon(polygon: Polygon, snow: Snow) {
    const points = polygon.points.map(([x, y]) => new PIXI.Point(x, y));
    if (points.length > 2) {
      const graphics = new PIXI.Graphics();
      graphics.beginFill(0xff79c6);
      graphics.drawPolygon(points);
      snow.pixi.app.stage.addChild(graphics);
    } else {
      const line = new PIXI.Graphics();
      line.lineStyle(1, 0xff79c6, 1);
      line.moveTo(points[0].x, points[0].y);
      line.lineTo(points[1].x, points[1].y);
      snow.pixi.app.stage.addChild(line);
    }
  }
}
