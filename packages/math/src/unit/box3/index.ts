import { ZERO } from "../../const";
import { Vector3 } from "../vector3";

/**
 * 表示一饿三维平面中的 AABB 盒子
 * 
 * Class representing a bounding box in Three-dimensional coordinate system
 */
class Box3 {
    /**
     * 计算包围所有点的最小 Box3
     * 
     * Calculate the smallest Box3 surrounding all points
     * 
     * @param points 目标点
     * @returns A Box3
     */
    static createByPoints(points: Vector3[]) {
        // TODO
    }

    /**
     * 根据几何信息计算一个 Box3
     * 
     * Calculate the Box3 base on geometric information
     * 
     * @param center 中心点
     * @param size 尺寸
     * @returns A Box3
     */
    static createByGeometry(center: Vector3, size: Vector3) {
        // TODO
    }

    /**
     * Box3 的最小顶点
     */
    min: Vector3 = new Vector3(ZERO, ZERO);

    /**
     * Box3 的最大顶点
     */
    max: Vector3 = new Vector3(ZERO, ZERO);

    constructor();
    /**
     * @param min Box3 的最大顶点
     * @param max Box3 的最大顶点
     */
    constructor(min: Vector3, max: Vector3);
    constructor() {
        const [min, max] = arguments;
        if (min && max) {
            this.min = min.clone();
            this.max = max.clone();
        }
    }

    /**
     * 设置 Box3 的最小顶点
     * @param min Vector3
     */
    setMin(min: Vector3) {

    }

    /**
     * 设置 Box3 的最大顶点
     * @param max Vector3
     */
    setMax(max: Vector3) {

    }

    /**
     * Box3 的 8 个顶点
     */
    get points() {
        // TODO
        return new Vector3();
    }

    /**
     * Box3 的尺寸
     */
    get size() {
        // TODO
        return new Vector3();
    }

    /**
     * Box3 的中心点
     */
    get center() {
        // TODO
        return new Vector3()
    }

    /**
     * 检查当前 Box3 是否合法
     */
    checkValid() {
        return this.max.x > this.min.x && this.max.y > this.min.y && this.max.z > this.min.z;
    }
}

export { Box3 };
