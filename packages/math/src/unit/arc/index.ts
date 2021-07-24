import { SIX_DECIMAL_TOLERANCE, TWO_PI, ZERO } from "../../const";
import { Utils } from "../../utils";
import { Line2 } from "../line2";
import { Vector2 } from "../vector2";

const CLOCKWISE = false;

/**
 * 表示二维世界的圆弧
 * 
 * Class representing an arc in Two-dimensional coordinate system
 */
class Arc {
    /**
     * 通过圆弧上不同的三个点构造一个圆弧
     * 
     * @param startPoint 起点
     * @param arcPoint 弧上任意点（不为 startPoint/endPoint）
     * @param endPoint 终点
     */
    static createByThreePoint(startPoint: Vector2, arcPoint: Vector2, endPoint: Vector2, isClockwise: boolean = CLOCKWISE) {
        const l1 = new Line2(startPoint, arcPoint);
        const l2 = new Line2(arcPoint, endPoint);
        const diameter1 = Utils.Line2.calcPerpendicularThroughPoint(l1, l1.center);
        const diameter2 = Utils.Line2.calcPerpendicularThroughPoint(l2, l2.center);
        const center = Utils.Line2.lineIntersectLine(diameter1, diameter2);
        if (!center) {
            throw new Error('The points can not from an arc');
        }
        return Arc.createByBoundaryPoint(center, startPoint, endPoint, isClockwise);
    }

    /**
     * 通过边界点构造一个圆弧
     * 
     * Construct an arc through boundary points
     * 
     * @param center 圆心
     * @param startPoint 圆弧起点
     * @param endPoint 圆弧终点
     * @param isClockwise 是否逆时针（默认：true）
     * 
     * @returns 圆弧
     */
    static createByBoundaryPoint(center: Vector2, startPoint: Vector2, endPoint: Vector2, isClockwise: boolean = CLOCKWISE) {
        const startRadian = Utils.Circle.getAngleByPoint(center, startPoint, isClockwise);
        const endRadian = Utils.Circle.getAngleByPoint(center, endPoint, isClockwise);
        const radius = Utils.Vector2.distance(startPoint, center);
        return new Arc(center, radius, startRadian, endRadian, isClockwise);
    }

    /**
     * 圆心
     * 
     * @default Vector2(0, 0)
     */
    center: Vector2 = new Vector2(ZERO, ZERO);

    /**
     * 半径
     * 
     * @default 0
     */
    radius: number = ZERO;

    /**
     * 起始角（弧度制）
     * 
     * @default 0
     */
    startRadian: number = ZERO;

    /**
     * 终止角（弧度制）
     * 
     * @default 0
     */
    endRadian: number = ZERO;

    /**
     * 是否顺时针（默认：false）
     * 
     * @default false
     */
    isClockwise: boolean = CLOCKWISE;

    /**
     * @param center 圆心
     * @param radius 半径
     * @param startRadian 起始角
     * @param endRadian 终止角
     * @param isClockwise 是否是逆时针
     */
    constructor(center?: Vector2, radius?: number, startRadian?: number, endRadian?: number, isClockwise: boolean = CLOCKWISE) {
        this.center = center || this.center;
        this.radius = radius || this.radius;
        this.startRadian = startRadian || this.startRadian;
        this.endRadian = endRadian || this.endRadian;
        this.isClockwise = isClockwise;
    }

    /**
     * 设置圆弧圆心
     * @param center 圆心坐标
     * @returns 当前圆弧
     */
    setCenter(center: Vector2) {
        this.center.set(center);
        return this;
    }

    /**
     * 设置圆弧半径
     * @param radius 半径
     * @returns 当前圆弧
     */
    setRadius(radius: number) {
        this.radius = radius;
        return this;
    }

    /**
     * 设置圆弧的起始角
     * @param radian 起始角的角度
     * @returns 当前圆弧
     */
    setStartRadian(radian: number) {
        this.startRadian = radian;
        return this;
    }

    /**
     * 设置圆弧的终止角
     * @param radian 终止角的角度
     * @returns 当前圆弧
     */
    setEndRadian(radian: number) {
        this.endRadian = radian;
        return this;
    }

    /**
     * 设置圆弧的方向（是否顺时针）
     * @param value 是否顺时针
     * @returns 当前圆弧
     */
    setClockwise(value: boolean) {
        this.isClockwise = value;
        return this;
    }

    /**
     * 复制当前圆弧
     * 
     * Clones this arc to a new arc
     * 
     * @returns 新的圆弧（A new Arc）
     */
    clone() {
        const { center, radius, startRadian: startRadian, endRadian: endRadian, isClockwise } = this;
        return new Arc(center.clone(), radius, startRadian, endRadian, isClockwise);
    }

    /**
     * 平移圆弧
     * @param v 平移向量
     * @returns 新的圆弧对象
     */
    translate(v: Vector2) {
        // todo 诸如 line circle arc 等 translate 接口，应该都以平移自身的需求，所以这个接口设计成支持改变自身/返回新值 两种选择
        const { center, radius, startRadian, endRadian, isClockwise } = this;
        return new Arc(center.add(v), radius, startRadian, endRadian, isClockwise);
    }

    /**
     * 绕圆心旋转圆弧
     * @param radian 旋转角度（正方向为圆弧方向）
     * @returns 新的圆弧对象
     */
    rotate(radian: number) {
        // todo 需求同 translate
        // todo radian 方向设计再考虑一下
        const { center, radius, startRadian, endRadian, isClockwise } = this;
        return new Arc(center.clone(), radius, startRadian + radian, endRadian + radian, isClockwise);
    }

    /**
     * 均分圆弧的弧度
     * 
     * The radian of an evenly divided arc
     */
    get midRadian() {
        // todo 处理到 0 ~ 2PI
        return this.startRadian + this.radian / 2;
    }

    /**
     * 圆弧弧周上的中点
     * 
     * The midpoint of the arc
     */
    get midPoint() {
        const { center, radius, midRadian, isClockwise } = this;
        return Utils.Circle.getPointByAngle(center, radius, midRadian, isClockwise);
    }

    /**
     * 圆弧的开口弧度
     * 
     * The radian of the arc
     */
    get radian() {
        // todo 这里似乎并不能保证 diff 在 0 ～ 2PI 内
        const diffRadian = this.endRadian - this.startRadian;
        return diffRadian < 0 ? TWO_PI + diffRadian : diffRadian;
    }

    /**
     * 圆弧起点
     * 
     * The starting point of the arc
     */
    get startPoint() {
        const { center, radius, startRadian, isClockwise } = this;
        return Utils.Circle.getPointByAngle(center, radius, startRadian, isClockwise);
    }

    /**
     * 圆弧终点
     * 
     * The ending point of the arc
     */
    get endPoint() {
        const { center, radius, endRadian, isClockwise } = this;
        return Utils.Circle.getPointByAngle(center, radius, endRadian, isClockwise);
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
        const { center, radius, isClockwise } = this;
        const distance = Utils.Vector2.distance(point, center);
        const isInRange = includeBorder ? distance <= radius + distanceTol : distance < radius;
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
        const { startRadian, endRadian } = this;
        if (endRadian >= startRadian) {
            return angle >= startRadian - tolerance && angle <= endRadian + tolerance;
        }
        return angle >= startRadian - tolerance || angle <= endRadian + tolerance;
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
            const step = this.radian / (length - 1);
            for (let i = 0; i < length; i++) {
                const angle = this.startRadian + step * i;
                points.push(Utils.Circle.getPointByAngle(this.center, this.radius, angle, this.isClockwise));
            }
        }
        return points;
    }
}

export { Arc };