import { ZERO } from "../../const";
import { Utils } from "../../utils";
import { Vector2 } from "../vector2";
import { Vector3 } from "../vector3";
import { PointInfo } from "./interface";

/**
 * 表示一个二维平面中的 AABB 盒子
 * 
 *  +---------+
 *  |         |
 *  |         |
 *  |         |
 *  +---------+
 * 
 * Class representing a bounding box in Two-dimensional coordinate system
 */
class Box2 {
    /**
     * 计算包围所有点的最小 Box2
     * 
     * Calculate the smallest Box2 surrounding all points
     * 
     * @param points 目标点
     * @returns A Box2
     */
    static createByPoints(points: Vector2[]) {
        if (points.length < 3) {
            throw new Error();
        }

        const { minX, minY, maxX, maxY } = points.reduce((box: PointInfo, point: Vector2) => {
            let { minX, minY, maxX, maxY } = box;
            const { x, y } = point;
            if (x < minX) {
                minX = x;
            } else if (x > maxX) {
                maxX = x;
            }
            if (y < minY) {
                minY = y;
            } else if (y > maxY) {
                maxY = y;
            }
            return box;
        }, { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });

        return new Box2(new Vector2(minX, minY), new Vector2(maxX, maxY));
    }

    /**
     * 根据几何信息计算一个 Box2
     * 
     * Calculate the Box2 base on geometric information
     * 
     * @param center 中心点
     * @param size 尺寸
     * @returns 
     */
    static createByGeometry(center: Vector2, size: Vector2) {
        const halfSize = size.divide(2);
        const min = center.sub(halfSize);
        const max = center.add(halfSize);
        return new Box2(min, max);
    }

    /**
     * Box2 的最小顶点（左下角）
     */
    min: Vector2 = new Vector2(ZERO, ZERO);

    /**
     * Box2 的最大顶点（右上角）
     */
    max: Vector2 = new Vector2(ZERO, ZERO);

    constructor();
    /**
     * @param min Box2 的最小顶点（左下角）
     * @param max Box2 的最大顶点（右上角）
     */
    constructor(min: Vector2, max: Vector2);
    constructor() {
        const [min, max] = arguments;
        if (min && max) {
            this.min = min.clone();
            this.max = max.clone();
        }
    }

    /**
     * 设置 Box2 的最小顶点
     * @param min Vector2
     */
    setMin(min: Vector2) {
        this.min = min;
    }

    /**
     * 设置 Box2 的最大顶点
     * @param max Vector2
     */
    setMax(max: Vector2) {
        this.max = max;
    }

    /**
     * Box2 的 4 个顶点
     * 
     * 当前坐标系为，X向左为正，Y向上为正时，其4个顶点相对位置如下：
     * 
     *  3---------2
     *  |         |
     *  |         |
     *  |         |
     *  0---------1
     */
    get points() {
        const { x: minX, y: minY } = this.min;
        const { x: maxX, y: maxY } = this.max;
        return [
            new Vector2(minX, minY),
            new Vector2(maxX, minY),
            new Vector2(maxX, maxY),
            new Vector2(minX, maxY),
        ];
    }

    /**
     * Box2 的尺寸
     */
    get size() {
        return this.max.sub(this.min);
    }

    /**
     * Box2 的中心点
     */
    get center() {
        return Utils.Vector2.interpolate(this.min, this.max, 0.5);
    }

    /**
     * 检查当前 Box2 是否合法
     */
    checkValid() {
        return this.max.x > this.min.x && this.max.y > this.min.y;
    }
}

export { Box2 };
