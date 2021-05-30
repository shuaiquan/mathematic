import { Vector2 } from "../unit/vector2";

class Vector2Util {
    /**
     * Get the left vector2 perpendicular to the vec (获取垂直于目标向量的左向量)
     * @param vec the target vector2
     */
    static getLeftDirection(vec: Vector2) {
        // equals to - vec.applyMatrix3(new Matrix3().fromRotate(Math.PI / 2));
        const { x, y } = vec;
        return new Vector2(-y, x);
    }

    /**
     * Get the right vector2 perpendicular to the vec (获取垂直于目标向量的右向量)
     * @param vec the target vector2
     */
    static getRightDirection(vec: Vector2) {
        // equals to - vec.applyMatrix3(new Matrix3().fromRotate(Math.PI * 3 / 2));
        const { x, y } = vec;
        return new Vector2(y, -x);
    }
}

export { Vector2Util };