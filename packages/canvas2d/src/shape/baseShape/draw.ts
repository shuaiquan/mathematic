import { BaseShape } from "./shape";

abstract class BaseDraw {
    protected static readyStyle(shape: BaseShape, ctx: CanvasRenderingContext2D) {
        const { fillColor, fillAlpha, lineColor, lineAlpha, lineCap, lineJoin, lineWidth, lineDash, lineDashOffset } = shape.getStyleOption();

        // TODO fillColor lineColor 对透明度的处理

        ctx.globalAlpha = fillAlpha;
        ctx.fillStyle = fillColor;

        ctx.strokeStyle = lineColor;
        ctx.lineCap = lineCap;
        ctx.lineJoin = lineJoin;
        ctx.lineWidth = lineWidth;

        // if (lineDash.length > 0) {
        //     ctx
        // }
    }
}

export { BaseDraw };