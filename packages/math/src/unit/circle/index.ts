import { SIX_DECIMAL_TOLERANCE, TWO_PI, ZERO } from "../../const";
import { Utils } from "../../utils";
import { Vector2 } from "../vector2";

/**
 * 表示二维世界中的一个圆
 */
class Circle {
    /**
     * 通过不重复的三个点构造一个圆
     * 
     * @param p1 点1
     * @param p2 点2
     * @param p3 点3
     */
    static createByThreePoint(p1: Vector2, p2: Vector2, p3: Vector2) {
        // todo
    }

    /**
     * 圆心
     */
    center: Vector2 = new Vector2(ZERO, ZERO);

    /**
     * 半径
     */
    radius: number = ZERO;

    /**
     * @param center 圆心
     * @param radius 半径
     */
    constructor(center?: Vector2, radius?: number) {
        this.center = center || this.center;
        if (radius !== undefined) {
            this.radius = radius;
        }
    }

    /**
     * 设置圆心
     * @param center 圆心
     * @returns 当前 circle
     */
    setCenter(center: Vector2) {
        this.center.set(center.x, center.y);
        return this;
    }

    /**
     * 设置半径
     * @param radius 半径
     * @returns 当前 circle
     */
    setRadius(radius: number) {
        this.radius = radius;
        return this;
    }

    clone() {
        // todo
    }

    /**
     * 平移圆
     * @param v 平移向量
     * @returns 平移后的新圆
     */
    translate(v: Vector2) {
        return new Circle(this.center.add(v), this.radius);
    }

    /**
     * 点是否在圆周上
     * @param point 目标点
     * @param tolerance 误差
     */
    isPointOnCircle(point: Vector2, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        return Math.abs(Utils.Vector2.distance(point, this.center) - this.radius) <= tolerance;
    }

    /**
     * 点是否在圆内
     * @param point 目标点
     * @param includeBorder 范围是否包含圆周
     * @param tolerance 误差
     */
    isPointInsideCircle(point: Vector2, includeBorder: boolean = false, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        const distance = Utils.Vector2.distance(point, this.center);
        return includeBorder ? distance <= this.radius - tolerance : distance < this.radius - tolerance;
    }

    /**
     * 获取圆周的散点集
     * @param length 目标的散点数量
     * @returns 散点集
     */
    toPoints(length: number) {
        const points: Vector2[] = [];
        if (length <= 0) {
            return points;
        }
        const step = TWO_PI / length;
        for (let i = 0; i < length; i++) {
            const angle = step * i;
            points.push(Utils.Circle.getPointByAngle(this.center, this.radius, angle));
        }
        return points;
    }
}

export { Circle };
