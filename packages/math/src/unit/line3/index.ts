import { SIX_DECIMAL_TOLERANCE, ZERO } from "../../const";
import { Vector3 } from "../vector3";

/**
 * 表示三维世界的一条线
 * 
 * Class representing a line in Three-dimensional coordinate system
 */
class Line3 {
    /**
     * 线的起点
     * 
     * Starting point of line or segment
     */
    start: Vector3 = new Vector3(ZERO, ZERO);

    /**
     * 线的终点
     * 
     * Ending point of line or segment
     */
    end: Vector3 = new Vector3(ZERO, ZERO);

    constructor();
    /**
     * @param start Starting point of line or segment
     * @param end Ending point of line or segment
     */
    constructor(start: Vector3, end: Vector3);
    constructor() {
        const [p1, p2] = arguments;
        if (p1 && p2) {
            this.set(p1, p2);
        }
    }

    /**
     * 设置起点和终点
     * 
     * Sets the start and the end of this line
     * @param start Starting point of line or segment
     * @param end Ending point of line or segment
     * @returns 当前实例 (This line)
     */
    set(start: Vector3, end: Vector3) {
        if (start.equals(end)) {
            // 两个点的坐标一致，无法构成一条直线
            throw new Error(`The start point (${start.x}, ${start.y}, ${start.z}) and the end point (${end.x}, ${end.y} , ${end.z}) are the same and cannot from a line)`)
        }
        this.start = start.clone();
        this.end = end.clone();
        return this;
    }

    /**
     * 设置起点
     * 
     * Sets the start of this line
     * @param point Starting point of line or segment
     * @returns 当前实例 (This line)
     */
    setStart(point: Vector3) {
        if (point.equals(this.end)) {
            // 两个点的坐标一致，无法构成一条直线
            throw new Error(`The point (${point.x}, ${point.y}, ${point.z}) and the end point (${this.end.x}, ${this.end.y} , ${this.end.z}) are the same and cannot from a line)`)
        }
        this.start = point.clone();
        return this;
    }

    /**
     * 设置终点
     * 
     * Sets the end of this line
     * @param point Ending point of line or segment
     * @returns 当前实例 (This line)
     */
    setEnd(point: Vector3) {
        if (point.equals(this.start)) {
            // 两个点的坐标一致，无法构成一条直线
            throw new Error(`The point (${point.x}, ${point.y}, ${point.z}) and the start point (${this.start.x}, ${this.start.y} , ${this.start.z}) are the same and cannot from a line)`)
        }
        this.end = point.clone();
        return this;
    }

    /**
     * 线段的长度
     * 
     * Gets the length of the current line
     */
    get length() {
        return this.end.sub(this.start).length;
    }

    /**
     * 线段长度的平方
     * 
     * Gets the squared length of the current line
     */
    get lengthSq() {
        return this.end.sub(this.start).lengthSq;
    }

    /**
     * 线的方向 （起点 -> 终点）
     * 
     * Gets the direction of the current line (start -> end)
     */
    get direction() {
        return this.end.sub(this.start).normalize();
    }

    /**
     * 线段的中点
     * 
     * Gets the center point of the current line.
     */
    get center() {
        return this.interpolate(0.5);
    }

    /**
     * 平移线
     * 
     * Translate the current line
     * @param v The vector the translation
     * @returns A new Line
     */
    translate(v: Vector3) {
        const { start, end } = this;
        return new Line3(start.add(v), end.add(v));
    }

    /**
     * 获取点在线上的投影点
     * 
     * Gets the projected point of the point onto the current line
     * @param point target point 目标点
     * @param isSegment Whether to treat the current line as a segment 是否线段
     * @param useSegmentEnd When the projection point is beyond the line segment, 
     * use the end of the line segment as the projection point (当投影点超出线段时，是否使用线段端点作为投影点)
     */
    getProjectedPoint(point: Vector3, isSegment: boolean = false, useSegmentEnd: boolean = false) {
        // todo
    }

    /**
     * 获取点到线的距离
     * 
     * Gets the distance from the point to the current line
     * @param point target point
     * @param isSegment Whether to treat the current line as a segment
     * @returns 
     */
    getDistance(point: Vector3, isSegment: boolean = false) {
        // todo
    }

    /**
     * 点是否在直线上
     * 
     * Determines if the point is on the line
     */
    isPointOnLine(point: Vector3, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        // todo
    }

    /**
     * 点是否在线段上
     * 
     * Determine if the point is on the segment
     */
    isPointOnSegment(point: Vector3, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        // todo
    }

    /**
     * 和 line 是否平行
     * 
     * Determine whether the current line and line area parallel
     */
    isParallel(line: Line3) {
        return this.direction.isParallel(line.direction);
    }

    /**
     * 和 line 是否正交垂直
     * 
     * Determine whether the current line and line area orthogonal
     */
    isOrthogonal(line: Line3) {
        return this.direction.isOrthogonal(line.direction);
    }

    /**
     * TODO 
     * 和平面相交的接口
     */

    /**
     * 根据线性比例计算线上的一点
     * 
     * Gets linear interpolation between start and end of this line
     * @param alpha [0, 1]
     */
    interpolate(alpha: number) {
        return this.start.add(this.direction.multiply(this.length * alpha));
    }
}

export { Line3 };
