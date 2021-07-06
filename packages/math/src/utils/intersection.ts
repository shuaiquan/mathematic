import { SIX_DECIMAL_TOLERANCE } from "../const";
import { Circle } from "../unit/circle";
import { Line2 } from "../unit/line2";
import { Vector2Util } from "./vector2";

class Intersection {
    /**
     * 判断直线是否和圆相交
     * 
     * @param line 直线
     * @param circle 圆
     * @param tolerance 误差
     */
    static isLineIntersectCircle(line: Line2, circle: Circle, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        const length = line.getDistance(circle.center);
        return length <= circle.radius + tolerance;
    }

    /**
     * 判断直线是否和圆（不含圆周）相交
     * 
     * @param line 直线
     * @param circle 圆
     * @param tolerance 误差
     */
    static isLineIntersectCircleWithoutBorder(line: Line2, circle: Circle, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        const length = line.getDistance(circle.center);
        return length < circle.radius + tolerance;
    }

    /**
     * 判断线段是否和圆相交
     * 
     * @param segment 线段
     * @param circle 圆
     * @param tolerance 误差
     */
    static isSegmentIntersectCircle(segment: Line2, circle: Circle, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        const length = segment.getDistance(circle.center, true);
        return length <= circle.radius + tolerance;
    }

    /**
     * 判断线段是否和圆（不含圆周）相交
     * 
     * @param segment 线段
     * @param circle 圆
     * @param tolerance 误差
     */
    static isSegmentIntersectCircleWithoutBorder(segment: Line2, circle: Circle, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        const length = segment.getDistance(circle.center, true);
        return length < circle.radius + tolerance;
    }

    /**
     * 判断圆和圆是否相交
     * @param c1 圆1
     * @param c2 圆2
     * @param includeTangent 是否包含相切（默认：true）
     * @param tolerance 误差
     */
    static isCircleIntersectCircle(c1: Circle, c2: Circle, includeTangent: boolean = true, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        const distance = Vector2Util.distance(c1.center, c2.center);
        return includeTangent ? distance <= c1.radius + c2.radius + tolerance : distance < c1.radius + c2.radius + tolerance;
    }
}

export { Intersection };
