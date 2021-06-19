import { Vector3 } from "../unit/vector3";

class Vector3Util {
    /**
     * Computes cross product of (v2 -> v1) and (v3 -> v1)
     */
    static cross3(v1: Vector3, v2: Vector3, v3: Vector3) {
        const v12 = v2.sub(v1);
        const v13 = v3.sub(v1);
        return v12.cross(v13);
    }

    /**
     * Computes dot product of (v2 -> v1) and (v3 -> v1)
     */
    static dot3(v1: Vector3, v2: Vector3, v3: Vector3) {
        const v12 = v2.sub(v1);
        const v13 = v3.sub(v1);
        return v12.dot(v13);
    }

    /**
     * Computed the distance from v1 to v2
     */
    static distance(v1: Vector3, v2: Vector3) {
        return v2.sub(v1).length;
    }
}

export { Vector3Util };
