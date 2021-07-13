import { ZERO } from "../../const";
import { Vector2 } from "../vector2";

const CLOCKWISE = true;

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
     * 起始角
     */
    startAngle: number = ZERO;

    /**
     * 终止角
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
    constructor(center?: Vector2, radius?: number, startAngle?: number, endAngle?: number, isClockwise?: number) {
        // todo
    }

    /**
     * 复制当前圆弧
     * 
     * @returns 新的圆弧（A new Arc）
     */
    clone() {
        // todo
    }

    /**
     * 圆弧中点
     */
    get midpoint() {
        // todo
        return new Vector2();
    }

    /**
     * 圆弧角度
     */
    get angle() {
        // todo
        return 0;
    }

    /**
     * 圆弧起点
     */
    get startPoint() {
        // todo
        return new Vector2();
    }

    /**
     * 圆弧终点
     */
    get endPoint() {
        return new Vector2();
    }

    /**
     * 判断点是否在圆弧上
     * 
     * @param point 目标点
     */
    isPointOnArc(point: Vector2) {
        // todo
    }

    /**
     * 判断点是否在圆弧内（扇形内）
     * 
     * @param point 
     */
    isPointInsideArc(point: Vector2) {
        // todo
    }

    /**
     * 判断角度是否在圆弧角度范围内
     * @param angle 
     */
    isAngleInsideArc(angle: number, isClockwise: boolean = this.isClockwise) {
        // todo
    }

    /**
     * 获取圆弧的散点集
     * 
     * @param length 要用多少个散点表示圆弧
     */
    toPoints(length: number) {
        // todo
    }
}

export { Arc };