import { Vector3 } from "../unit/vector3";

class Vector3Util {
    /**
     * 计算向量(v2 -> v1) 和向量(v3 -> v1) 的叉积
     * 
     * Computes cross product of (v2 -> v1) and (v3 -> v1)
     */
    static cross3(v1: Vector3, v2: Vector3, v3: Vector3) {
        const v12 = v2.sub(v1);
        const v13 = v3.sub(v1);
        return v12.cross(v13);
    }

    /**
     * 计算向量(v2 -> v1) 和向量(v3 -> v1) 的点积
     * 
     * Computes dot product of (v2 -> v1) and (v3 -> v1)
     */
    static dot3(v1: Vector3, v2: Vector3, v3: Vector3) {
        const v12 = v2.sub(v1);
        const v13 = v3.sub(v1);
        return v12.dot(v13);
    }

    /**
     * 获取两点间的距离
     * 
     * Computed the distance from v1 to v2
     */
    static distance(v1: Vector3, v2: Vector3) {
        return v2.sub(v1).length;
    }

    /**
     * 计算 v1 到 v2 的线性插值
     * 
     * Calculate the linear interpolation of v1 to v2
     * 
     * @param v1 Vector3
     * @param v2 Vector3
     * @param alpha 线性插值的百分比
     */
    static interpolate(v1: Vector3, v2: Vector3, alpha: number) {
        const direction = v2.sub(v1);
        return v1.add(direction.normalize().multiply(direction.length * alpha));
    }
}

export { Vector3Util };
