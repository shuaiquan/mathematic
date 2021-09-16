export enum LineCap {
    Butt = 'butt',
    Round = 'round',
    Square = 'square'
}

export enum LineJoin {
    Round = 'round',
    Bevel = 'bevel',
    Miter = 'miter',
}

export interface StyleOption {
    /**
     * 填充颜色，相当于 canvas fillStyle
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
     */
    fillColor: string;
    /**
     * 填充的透明度
     */
    fillAlpha: number;
    /**
     * 线条边框颜色，相当于 canvas strokeStyle
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
     */
    lineColor: string;
    /**
     * 线条边框透明度
     */
    lineAlpha: number;
    /**
     * 线条宽度
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
     */
    lineWidth: number;
    /**
     * 线条端点样式
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
     */
    lineCap: LineCap;
    /**
     * 线条的连接部分样式
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
     */
    lineJoin: LineJoin;
    /**
     * 斜接限制长度
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit
     */
    miterLimit: number;
    /**
     * 虚线样式
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
     */
    lineDash: number[];
    /**
     * 虚线样式偏移
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
     */
    lineDashOffset: number;
}

export type PartialStyleOption = Partial<StyleOption>;
