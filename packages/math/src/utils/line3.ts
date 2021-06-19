import { Line3 } from "../unit/line3";
import { Vector3 } from "../unit/vector3";

class Line3Util {
    /**
     * 直线 line 是否和 X轴 平行
     * 
     * Determines the line is parallel to X-Axis
     */
    isParallelToXAxis(line: Line3) {
        return line.direction.isParallel(Vector3.X_DIRECTION);
    }

    /**
     * 直线 line 是否和 Y轴 平行
     * 
     * Determines the line is parallel to Y-Axis
     */
    isParallelToYAxis(line: Line3) {
        return line.direction.isParallel(Vector3.Y_DIRECTION);
    }

    /**
     * 直线 line 是否和 Z轴 平行
     * 
     * Determines the line is parallel to Z-Axis
     */
    isParallelToZAxis(line: Line3) {
        return line.direction.isParallel(Vector3.Z_DIRECTION);
    }
}

export { Line3Util };
