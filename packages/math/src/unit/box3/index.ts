import { ZERO } from "../../const";
import { Utils } from "../../utils";
import { Vector3 } from "../vector3";
import { PointInfo } from "./interface";

/**
 * 表示一个三维平面中的 AABB 盒子
 * 
 *    +---------+
 *   /|        /|
 *  / |       / |
 * +---------+  |
 * |  +------|--+
 * | /       | /
 * |/        |/
 * +---------+
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
        const { minX, minY, minZ, maxX, maxY, maxZ } = points.reduce((box: PointInfo, point: Vector3) => {
            let { minX, minY, minZ, maxX, maxY, maxZ } = box;
            const { x, y, z } = point;
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
            if (z < minZ) {
                minZ = z;
            } else if (z > maxZ) {
                maxZ = z;
            }
            return box;
        }, { minX: Infinity, minY: Infinity, minZ: Infinity, maxX: -Infinity, maxY: -Infinity, maxZ: -Infinity });

        return new Box3(new Vector3(minX, minY, minZ), new Vector3(maxX, maxY, maxZ));
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
        const halfSize = size.divide(2);
        const min = center.sub(halfSize);
        const max = center.add(halfSize);
        return new Box3(min, max);
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
        this.min = min;
    }

    /**
     * 设置 Box3 的最大顶点
     * @param max Vector3
     */
    setMax(max: Vector3) {
        this.max = max;
    }

    /**
     * Box3 的 8 个顶点
     * 
     * 如果坐标系方向如下：
     * 
     *  Y   Z
     *  |  /
     *  | /
     *  |/
     *  +---------- X
     * 
     * 则顶点顺序如下：
     *  
     *    7---------6
     *   /|        /|
     *  / |       / |
     * 3---------2  |
     * |  4------|--5
     * | /       | /
     * |/        |/
     * 0---------1
     */
    get points() {
        const { x: minX, y: minY, z: minZ } = this.min;
        const { x: maxX, y: maxY, z: maxZ } = this.max;
        return [
            new Vector3(minX, minY, minZ),
            new Vector3(maxX, minY, minZ),
            new Vector3(maxX, maxY, minZ),
            new Vector3(minX, maxY, minZ),
            new Vector3(minX, minY, maxZ),
            new Vector3(maxX, minY, maxZ),
            new Vector3(maxX, maxY, maxZ),
            new Vector3(minX, maxY, maxZ),
        ];
    }

    /**
     * Box3 的尺寸
     */
    get size() {
        return this.max.sub(this.min);
    }

    /**
     * Box3 的中心点
     */
    get center() {
        return Utils.Vector3.interpolate(this.min, this.max, 0.5);
    }

    /**
     * 检查当前 Box3 是否合法
     */
    checkValid() {
        return this.max.x > this.min.x && this.max.y > this.min.y && this.max.z > this.min.z;
    }
}

export { Box3 };
