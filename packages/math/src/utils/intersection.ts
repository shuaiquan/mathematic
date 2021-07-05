import { SIX_DECIMAL_TOLERANCE } from "../const";
import { Circle } from "../unit/circle";
import { Line2 } from "../unit/line2";

class Intersection {
    /**
     * 判断直线是否和圆相交
     * 
     * @param line 直线
     * @param circle 圆
     * @param tolerance 误差
     */
    static isLineIntersectCircle(line: Line2, circle: Circle, tolerance: Number = SIX_DECIMAL_TOLERANCE) {
        // todo
    }

    /**
     * 判断直线是否和圆（不含圆周）相交
     * 
     * @param line 直线
     * @param circle 圆
     * @param tolerance 误差
     */
    static isLineIntersectCircleWithoutBorder(line: Line2, circle: Circle, tolerance: Number = SIX_DECIMAL_TOLERANCE) {
        // todo
    }

    /**
     * 判断线段是否和圆相交
     * 
     * @param segment 线段
     * @param circle 圆
     * @param tolerance 误差
     */
    static isSegmentIntersectCircle(segment: Line2, circle: Circle, tolerance: Number = SIX_DECIMAL_TOLERANCE) {
        // todo
    }

    /**
     * 判断线段是否和圆（不含圆周）相交
     * 
     * @param segment 线段
     * @param circle 圆
     * @param tolerance 误差
     */
    static isSegmentIntersectCircleWithoutBorder(segment: Line2, circle: Circle, tolerance: Number = SIX_DECIMAL_TOLERANCE) {
        // todo
    }

    /**
     * 判断圆和圆是否相交
     * @param c1 圆1
     * @param c2 圆2
     * @param includeTangent 是否包含相切（默认：true）
     * @param tolerance 误差
     */
    static isCircleIntersectCircle(c1: Circle, c2: Circle, includeTangent: boolean = true, tolerance: Number = SIX_DECIMAL_TOLERANCE) {
        // todo
    }
}

export { Intersection };
