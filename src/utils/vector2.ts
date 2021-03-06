import { Vector2 } from "../unit/vector2";

class Vector2Util {
    /**
     * 获取垂直于目标向量的左向量
     * 
     * Get the left vector2 perpendicular to the vec
     * @param vec the target vector2
     */
    static getLeftDirection(vec: Vector2) {
        // equals to - vec.applyMatrix3(new Matrix3().fromRotate(Math.PI / 2));
        const { x, y } = vec;
        return new Vector2(-y, x);
    }

    /**
     * 获取垂直于目标向量的右向量
     * 
     * Get the right vector2 perpendicular to the vec
     * @param vec the target vector2
     */
    static getRightDirection(vec: Vector2) {
        // equals to - vec.applyMatrix3(new Matrix3().fromRotate(Math.PI * 3 / 2));
        const { x, y } = vec;
        return new Vector2(y, -x);
    }

    /**
     * 计算向量(v2 -> v1) 和向量(v3 -> v1) 的叉积
     * 
     * Computes cross product of (v2 -> v1) and (v3 -> v1)
     */
    static cross3(v1: Vector2, v2: Vector2, v3: Vector2) {
        const v12 = v2.sub(v1);
        const v13 = v3.sub(v1);
        return v12.cross(v13);
    }

    /**
     * 计算向量(v2 -> v1) 和向量(v3 -> v1) 的点积
     * 
     * Computes dot product of (v2 -> v1) and (v3 -> v1)
     */
    static dot3(v1: Vector2, v2: Vector2, v3: Vector2) {
        const v12 = v2.sub(v1);
        const v13 = v3.sub(v1);
        return v12.dot(v13);
    }

    /**
     * 获取两点间的距离
     * 
     * Computed the distance from v1 to v2
     */
    static distance(v1: Vector2, v2: Vector2) {
        return v2.sub(v1).length;
    }

    /**
     * 计算 v1 -> v2 的方向向量
     * 
     * Computed the direction from v1 to v2
     * 
     * @param v1 Vector2
     * @param v2 Vector2
     */
    static direction(v1: Vector2, v2: Vector2) {
        return v2.sub(v1).normalize();
    }

    /**
     * 计算（v1, v2）的中点
     * 
     * Computed the center of v1 and v2
     * 
     * @param v1 Vector2
     * @param v2 Vector2
     */
    static center(v1: Vector2, v2: Vector2) {
        return this.interpolate(v1, v2, 0.5);
    }

    /**
     * 计算 v1 到 v2 的线性插值
     * 
     * Calculate the linear interpolation of v1 to v2
     * 
     * @param v1 Vector2
     * @param v2 Vector2
     * @param alpha 线性插值的百分比
     */
    static interpolate(v1: Vector2, v2: Vector2, alpha: number) {
        const direction = v2.sub(v1);
        return v1.add(direction.normalize().multiply(direction.length * alpha));
    }
}

export { Vector2Util };