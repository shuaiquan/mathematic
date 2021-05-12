const TOLERANCE = 1E-5

class NumberUtil {
    static isEqual(v1: number, v2: number, tolerance = TOLERANCE) {
        return Math.abs(v1 - v2) < tolerance;
    }
}

export {
    NumberUtil
};
