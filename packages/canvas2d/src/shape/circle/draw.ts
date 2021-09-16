import { Circle } from "./shape";
import { BaseDraw } from "../baseShape";

abstract class DrawCircle extends BaseDraw {
    static draw(circle: Circle, ctx: CanvasRenderingContext2D) {
        this.readyStyle(circle, ctx);
        // TODO
    }
}

export { DrawCircle };
