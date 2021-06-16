import { Line2, LineSide } from "../unit/line2";
import { Vector2 } from "../unit/vector2";

class Line2Util {
    /**
     * Determine whether lines L1 and L2 intersect (判断：直线 l1 和直线 l2 是否相交)
     * @param line1 straight line1
     * @param line2 straight line2
     * @returns 
     */
    static isLineIntersectLine(line1: Line2, line2: Line2) {
        return !line1.isParallel(line2);
    }

    /**
     * Determine whether the straight line and the line segment intersect (判断：直线 line 和线段 segment 是否相交)
     * @param line straight line
     * @param segment segment line
     * @returns 
     */
    static isLineIntersectSegment(line: Line2, segment: Line2) {
        if (line.isParallel(segment)) {
            return false;
        }
        // 判断 segment 的端点是否在直线的两侧，或在直线上
        const startSide = line.getSide(segment.start);
        const endSide = line.getSide(segment.end);
        return (startSide === LineSide.On || endSide === LineSide.On) || startSide !== endSide;
    }

    /**
     * Determine whether the line segments intersect (判断：线段 segment1 和线段 segment2 是否相交)
     * @param segment1 line segment1
     * @param segment2 line segment2
     */
    static isSegmentIntersectSegment(segment1: Line2, segment2: Line2) {
        // 判断：每条线段都分别跨越了另一条线段所在直线，即两个端点分别在该直线两侧
        const startSide1 = segment2.getSide(segment1.start);
        const endSide1 = segment2.getSide(segment1.end);
        const startSide2 = segment1.getSide(segment2.start);
        const endSide2 = segment1.getSide(segment2.end);
        if (startSide1 === LineSide.On && segment2.isPointOnSegment(segment1.start) ||
            endSide1 === LineSide.On && segment2.isPointOnSegment(segment1.end) ||
            startSide2 === LineSide.On && segment1.isPointOnSegment(segment2.start) ||
            endSide2 === LineSide.On && segment1.isPointOnSegment(segment2.end)) {
            return true;
        }
        return startSide1 !== endSide1 && startSide2 !== endSide2;
    }

    /**
     * Calculate the intersection of line1 and line2
     * @param line1 straight line
     * @param line2 straight line
     */
    static lineIntersectLine(line1: Line2, line2: Line2) {
        // { x0, y0 } { x1, y1 } 是 line1 上的两个点
        const { x: x0, y: y0 } = line1.start;
        const { x: x1, y: y1 } = line1.end;
        // { x2, y2 } { x3, y3 } 是 line2 上的两个点
        const { x: x2, y: y2 } = line2.start;
        const { x: x3, y: y3 } = line2.end;

        /**
         * 计算直线一般式
         * Ax + By + C = 0
         * 
         * 配置一：
         * A = y2 - y1;
         * B = x1 - x2;
         * C = x2 * y1 - x1 * y2;
         * 
         * 配置二：
         * A = y1 - y2;
         * B = x2 - x1;
         * C = x1 * y2 - x2 * y1
         */
        const a1 = y1 - y0;
        const b1 = x0 - x1;
        const c1 = x1 * y0 - x0 * y1;
        const a2 = y3 - y2;
        const b2 = x2 - x3;
        const c2 = x3 * y2 - x2 * y3;

        // A1 * B2 = B1 * A2 则两直线平行，详见：https://baike.baidu.com/item/%E4%B8%80%E8%88%AC%E5%BC%8F
        const result = a1 * b2 - a2 * b1;
        if (result === 0) {
            // 两直线平行
            return undefined;
        }

        const x = (b1 * c2 - b2 * c1) / result;
        const y = (a2 * c1 - a1 * c2) / result;
        return new Vector2(x, y);
    }

    /**
     * Calculate the intersection of line and segment
     * @param line straight line
     * @param segment segment line
     */
    static lineIntersectSegment(line: Line2, segment: Line2) {
        const point = this.lineIntersectLine(line, segment);
        if (point) {
            if (segment.isPointOnSegment(point)) {
                return point;
            }
        }
    }

    /**
     * Calculate the intersection of segment1 and segment2
     * @param segment1 segment line
     * @param segment2 segment line
     */
    static segmentIntersectSegment(segment1: Line2, segment2: Line2) {
        const point = this.lineIntersectLine(segment1, segment2);
        if (point) {
            if (segment1.isPointOnSegment(point) && segment2.isPointOnSegment(point)) {
                return point;
            }
        }
    }
}

export { Line2Util };