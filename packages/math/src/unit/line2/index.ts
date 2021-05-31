import { SIX_DECIMAL_TOLERANCE, ZERO } from "../../const";
import { Utils } from "../../utils";
import { Vector2 } from "../vector2";
import { LineSide } from "./interface";

/**
 * Class representing a line in Two-dimensional coordinate system
 */
class Line2 {
    /**
     * Starting point of line or segment
     */
    start: Vector2 = new Vector2(ZERO, ZERO);

    /**
     * Ending point of line or segment
     */
    end: Vector2 = new Vector2(ZERO, ZERO);

    constructor();
    /**
     * @param start Starting point of line or segment
     * @param end Ending point of line or segment
     */
    constructor(start: Vector2, end: Vector2);
    constructor() {
        const [p1, p2] = arguments;
        if (p1 && p2) {
            this.set(p1, p2);
        }
    }

    /**
     * Sets the start and the end of the current line
     * @param start Starting point of line or segment
     * @param end Ending point of line or segment
     * @returns The current line2
     */
    set(start: Vector2, end: Vector2) {
        if (start.equals(end)) {
            // 两个点的坐标一致，无法构成一条直线
            throw new Error(`The start point (${start.x}, ${start.y}) and the end point (${end.x}, ${end.y} are the same and cannot from a line)`)
        }
        this.start = start.clone();
        this.end = end.clone();
        return this;
    }

    /**
     * Sets the start of the current line
     * @param point Starting point of line or segment
     * @returns The current line2
     */
    setStart(point: Vector2) {
        if (point.equals(this.end)) {
            // 两个点的坐标一致，无法构成一条直线
            throw new Error(`The point (${point.x}, ${point.y}) and the end point (${this.end.x}, ${this.end.y} are the same and cannot from a line)`)
        }
        this.start = point.clone();
        return this;
    }

    /**
     * Sets the end of the current line
     * @param point Ending point of line or segment
     * @returns The current line2
     */
    setEnd(point: Vector2) {
        if (point.equals(this.start)) {
            // 两个点的坐标一致，无法构成一条直线
            throw new Error(`The point (${point.x}, ${point.y}) and the start point (${this.start.x}, ${this.start.y} are the same and cannot from a line)`)
        }
        this.end = point.clone();
        return this;
    }

    /**
     * Gets the length of the current line
     */
    get length() {
        return this.end.sub(this.start).length;
    }

    /**
     * Gets the squared length of the current line
     */
    get lengthSq() {
        return this.end.sub(this.start).lengthSq;
    }

    /**
     * Gets the direction of the current line (start -> end)
     */
    get direction() {
        return this.end.sub(this.start).normalize();
    }

    /**
     * Gets the angle of the current line's direction (start -> end)
     */
    get angle() {
        return this.direction.angle;
    }

    /**
     * Gets the center point of the current line.
     */
    get center() {
        return this.interpolate(0.5);
    }

    /**
     * Gets the direction orthogonal to the current line and pointing to the left
     */
    get leftDirection() {
        return Utils.Vector2.getLeftDirection(this.direction);
    }

    /**
     * Gets the direction orthogonal to the current line and pointing to the right
     */
    get rightDirection() {
        return Utils.Vector2.getRightDirection(this.direction);
    }

    /**
     * Translate the current line
     * @param v The vector the translation
     * @returns A new Line
     */
    translate(v: Vector2) {
        const { start, end } = this;
        return new Line2(start.add(v), end.add(v));
    }

    /**
     * Gets which side of the current line the point is on
     * @returns LineSide
     */
    getSide(point: Vector2) {
        const product = Utils.Vector2.cross3(this.start, this.end, point);
        if (product === 0) {
            return LineSide.On;
        } else if (product > 0) {
            return LineSide.Left;
        }
        return LineSide.Right;
    }

    /**
     * Determines if the point is on the line
     */
    isPointOnLine(point: Vector2, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        return this.getDistance(point) <= tolerance;
    }

    /**
     * Determine if the point is on the segment
     */
    isPointOnSegment(point: Vector2, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        return this.getDistance(point, true) <= tolerance;
    }

    /**
     * Gets the projected point of the point onto the current line
     * @param point target point
     * @param isSegment Whether to treat the current line as a segment 
     * @param useSegmentEnd When the projection point is beyond the line segment, 
     * use the end of the line segment as the projection point (当投影点超出线段时，是否使用线段端点作为投影点)
     */
    getProjectedPoint(point: Vector2, isSegment: boolean = false, useSegmentEnd: boolean = false): Vector2 | undefined {
        // 在险段上的表现可能是 undefined
        const alpha = this.getAlpha(point);
        if (isSegment) {
            if (alpha < 0) {
                return useSegmentEnd ? this.start.clone() : undefined;
            } else if (alpha > 1) {
                return useSegmentEnd ? this.end.clone() : undefined;
            }
        }
        return this.interpolate(alpha);
    }

    /**
     * Gets the distance from the point to the current line
     * @param point target point
     * @param isSegment Whether to treat the current line as a segment
     * @returns 
     */
    getDistance(point: Vector2, isSegment: boolean = false) {
        const projection = this.getProjectedPoint(point, isSegment, true);
        return Utils.Vector2.distance(point, projection);
    }

    /**
     * Determine whether the current line and line area parallel
     */
    isParallel(line: Line2) {
        return this.direction.isParallel(line.direction);
    }

    /**
     * Determine whether the current line and line area orthogonal
     */
    isOrthogonal(line: Line2) {
        return this.direction.isOrthogonal(line.direction);
    }

    /**
     * Determine whether the current line is a horizontal line (是否水平线)
     */
    isHorizontal() {
        return this.direction.equals(Vector2.X_DIRECTION) || this.direction.equals(Vector2.X_DIRECTION.inverse());
    }

    /**
     * Determine whether the current line is a vertical line (是否竖直线)
     */
    isVertical() {
        return this.direction.equals(Vector2.Y_DIRECTION) || this.direction.equals(Vector2.Y_DIRECTION.inverse());
    }

    intersect(line: Line2) {
        // todo 做到 static 方法上更合适一点，区分直线和线段
    }

    /**
     * Gets the interpolated number
     */
    getAlpha(point: Vector2, isSegment = false) {
        const alpha = Utils.Vector2.dot3(this.start, this.end, point) / this.lengthSq;
        if (isSegment) {
            if (alpha > 1) {
                return 1;
            } else if (alpha < 0) {
                return 0;
            }
        }
        return alpha;
    }

    /**
     * Gets linear interpolation between start and end of this line
     * @param alpha [0, 1]
     */
    interpolate(alpha: number) {
        return this.start.add(this.direction.multiply(this.length * alpha));
    }
}

export { Line2, LineSide };
