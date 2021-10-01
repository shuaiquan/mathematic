import { Vector2 } from "@s7n/math";
import { BaseShape } from "../baseShape";
import { StyleOption } from '../style';

class Circle extends BaseShape {
    /**
     * 圆心坐标
     */
    private center: Vector2 = new Vector2();

    /**
     * 圆半径
     */
    private radius: number = 0;

    constructor(center: Vector2, radius: number, styleOption?: StyleOption) {
        super(styleOption);
        this.center = center.clone();
        this.radius = radius;
    }

    /**
     * 设置圆心坐标
     */
    setCenter(center: Vector2) {
        this.center = center.clone();
    }

    /**
     * 获取圆心坐标
     */
    getCenter() {
        return this.center.clone();
    }

    /**
     * 设置半径
     */
    setRadius(radius: number) {
        this.radius = radius;
    }

    /**
     * 获取半径
     */
    getRadius() {
        return this.radius;
    }

    getPath() {
        const path = new Path2D();
        path.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        return path;
    }
}

export { Circle };