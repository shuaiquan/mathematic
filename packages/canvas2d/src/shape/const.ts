import { LineCap, LineJoin, StyleOption } from "./type";

export const DEFAULT_STYLE_OPTION: StyleOption = {
    fillColor: '#000',
    fillAlpha: 1,
    lineColor: '#000',
    lineAlpha: 1,
    lineWidth: 1,
    lineCap: LineCap.Butt,
    lineJoin: LineJoin.Miter,
    miterLimit: 10,
    lineDash: [],
    lineDashOffset: 0,
}