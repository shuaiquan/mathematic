import { Line2, LineSide } from "../unit/line2";

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
        return (startSide1 === LineSide.On || endSide1 === LineSide.On || startSide2 === LineSide.On || endSide2 === LineSide.On) ||
            (startSide1 !== endSide1 && startSide2 !== endSide1);
    }

    static lineIntersectLine(l1: Line2, l2: Line2) {
        // todo 直线和直线相交
    }

    static lineIntersectSegment(line: Line2, segment: Line2) {
        // todo 直线和线段相交
    }

    static segmentIntersectSegment(s1: Line2, s2: Line2) {
        // todo 线段和线段相交
    }
}

export { Line2Util };