import { IVec2, Vector2 } from "@s7n/math";
import { BaseShape } from "./BaseShape";
import { StyleOption } from "./style";

class Line extends BaseShape {
    /**
     * 线段的起点
     */
    private start: Vector2 = new Vector2(0, 0);

    /**
     * 线段的终点
     */
    private end: Vector2 = new Vector2(0, 0);

    constructor(start: Vector2, end: Vector2, styleOption?: StyleOption) {
        super(styleOption);
        this.start = start.clone();
        this.end = end.clone();
    }

    /**
     * 设置线段的起点
     */
    setStart(start: Partial<IVec2>) {
        const x = start.x !== undefined ? start.x : this.start.x;
        const y = start.y !== undefined ? start.y : this.start.y;
        this.start = new Vector2(x, y);
        return this;
    }

    /**
     * 获取线段的起点
     */
    getStart() {
        return this.start.clone();
    }

    /**
     * 设置线段的终点
     */
    setEnd(end: Partial<IVec2>) {
        const x = end.x !== undefined ? end.x : this.end.x;
        const y = end.y !== undefined ? end.y : this.end.y;
        this.end = new Vector2(x, y);
        return this;
    }

    /**
     * 获取线段的终点
     */
    getEnd() {
        return this.end.clone();
    }

    getPath() {
        const { start, end } = this;
        const path = new Path2D();
        path.moveTo(start.x, start.y);
        path.lineTo(end.x, end.y);
        return path;
    }
}

export { Line };