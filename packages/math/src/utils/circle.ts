import { PI, TWO_PI } from "../const";
import { Matrix3 } from "../unit/matrix3";
import { Vector2 } from "../unit/vector2";

class CircleUtil {
    /**
     * 获取点在圆上的角度（水平向右为 0）
     * 
     * @param center 圆心
     * @param point 目标点
     * @param isClockwise 圆周是否顺时针（默认：false）
     * 
     * @returns 目标角度（弧度制 radian）
     */
    static getAngleByPoint(center: Vector2, point: Vector2, isClockwise: boolean = false) {
        const angle = point.sub(center).angle;
        return isClockwise ? TWO_PI - angle : angle;
    }

    /**
     * 获取角度对应圆周上的点（水平向右为 0）
     * 
     * @param center 圆心
     * @param radius 半径
     * @param radian 目标角度 （）
     * @param isClockwise 圆周是否顺时针（默认：false）
     * 
     * @returns 目标点
     */
    static getPointByAngle(center: Vector2, radius: number, radian: number, isClockwise: boolean = false) {
        const angle = isClockwise ? TWO_PI - (radian % TWO_PI) : (radian % TWO_PI);
        const rotate = (new Matrix3()).fromRotate(angle);
        return center.add(Vector2.X_DIRECTION.applyMatrix3(rotate).multiply(radius));
    }
}

export { CircleUtil };
