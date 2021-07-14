import { SIX_DECIMAL_TOLERANCE, TWO_PI, ZERO } from "../../const";
import { Utils } from "../../utils";
import { Vector2 } from "../vector2";

const CLOCKWISE = true;

// TODO 整体考虑用 radian 替换 angle

class Arc {
    /**
     * 通过三个点构造一个圆弧
     * 
     * @param startPoint 起点
     * @param arcPoint 弧上任意点（不为 startPoint/endPoint）
     * @param endPoint 终点
     */
    static createByThreePoint(startPoint: Vector2, arcPoint: Vector2, endPoint: Vector2) {
        // todo
    }

    /**
     * 通过边界点构造一个圆弧
     * 
     * @param center 圆形
     * @param startPoint 圆弧起点
     * @param endPoint 圆弧终点
     * @param isClockwise 是否逆时针（默认：true）
     */
    static createByBoundaryPoint(center: Vector2, startPoint: Vector2, endPoint: Vector2, isClockwise: boolean = CLOCKWISE) {
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
     * 起始角（弧度制）
     */
    startAngle: number = ZERO;

    /**
     * 终止角（弧度制）
     */
    endAngle: number = ZERO;

    /**
     * 是否逆时针（默认：true）
     */
    isClockwise: boolean = CLOCKWISE;

    /**
     * @param center 圆心
     * @param radius 半径
     * @param startAngle 起始角
     * @param endAngle 终止角
     * @param isClockwise 是否是逆时针
     */
    constructor(center?: Vector2, radius?: number, startAngle?: number, endAngle?: number, isClockwise: boolean = CLOCKWISE) {
        this.center = center || this.center;
        this.radius = radius || this.radius;
        this.startAngle = startAngle || this.startAngle;
        this.endAngle = endAngle || this.endAngle;
        this.isClockwise = isClockwise;
    }

    /**
     * 复制当前圆弧
     * 
     * @returns 新的圆弧（A new Arc）
     */
    clone() {
        const { center, radius, startAngle, endAngle, isClockwise } = this;
        return new Arc(center, radius, startAngle, endAngle, isClockwise);
    }

    get midRadian() {
        // todo 处理到 0 ~ 2PI
        return this.startAngle + this.angle / 2;
    }

    /**
     * 圆弧中点
     */
    get midPoint() {
        const { center, radius, midRadian, isClockwise } = this;
        return Utils.Circle.getPointByAngle(center, radius, midRadian, isClockwise);
    }

    /**
     * 圆弧角度
     */
    get angle() {
        const diffRadian = this.endAngle - this.startAngle;
        return diffRadian < 0 ? TWO_PI - diffRadian : diffRadian;
    }

    /**
     * 圆弧起点
     */
    get startPoint() {
        const { center, radius, startAngle, isClockwise } = this;
        return Utils.Circle.getPointByAngle(center, radius, startAngle, isClockwise);
    }

    /**
     * 圆弧终点
     */
    get endPoint() {
        const { center, radius, endAngle, isClockwise } = this;
        return Utils.Circle.getPointByAngle(center, radius, endAngle, isClockwise);
    }

    /**
     * 判断点是否在圆弧上
     * 
     * @param point 目标点
     */
    isPointOnArc(point: Vector2, distanceTol: number = SIX_DECIMAL_TOLERANCE, angleTol: number = SIX_DECIMAL_TOLERANCE) {
        const { center, radius, isClockwise } = this;
        if (Math.abs(Utils.Vector2.distance(point, center) - radius) <= distanceTol) {
            const angle = Utils.Circle.getAngleByPoint(center, point, isClockwise);
            return this.isAngleInsideArc(angle);
        }
        return false;
    }

    /**
     * 判断点是否在圆弧内（扇形内）
     * 
     * @param point 
     */
    isPointInsideArc(point: Vector2, includeBorder: boolean = false, distanceTol: number = SIX_DECIMAL_TOLERANCE, angleTol: number = SIX_DECIMAL_TOLERANCE) {
        const { center, radius, startAngle, endAngle, isClockwise } = this;
        const distance = Utils.Vector2.distance(point, center);
        const isInRange = includeBorder ? distance <= radius + distanceTol : distance < radius + distanceTol;
        if (isInRange) {
            const angle = Utils.Circle.getAngleByPoint(center, point, isClockwise);
            return this.isAngleInsideArc(angle);
        }
        return false;
    }

    /**
     * 判断角度是否在圆弧角度范围内
     * @param angle 
     */
    isAngleInsideArc(angle: number, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        const { startAngle, endAngle } = this;
        if (endAngle >= startAngle) {
            return angle >= startAngle - tolerance && angle <= endAngle + tolerance;
        }
        return angle >= startAngle - tolerance || angle <= endAngle + tolerance;
    }

    /**
     * 获取圆弧的散点集
     * 
     * @param length 要用多少个散点表示圆弧
     */
    toPoints(length: number) {
        const points: Vector2[] = [];
        // 至少要用 2 个点才能表示圆弧
        if (length > 1) {
            const step = this.angle / (length - 1);
            for (let i = 0; i < length; i++) {
                const angle = this.startAngle + step * i;
                points.push(Utils.Circle.getPointByAngle(this.center, this.radius, angle, this.isClockwise));
            }
        }
        return points;
    }
}

export { Arc };