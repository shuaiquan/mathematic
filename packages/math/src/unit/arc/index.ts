import { ZERO } from "../../const";
import { Vector2 } from "../vector2";

class Arc {
    /**
     * 圆心
     */
    center: Vector2 = new Vector2(ZERO, ZERO);

    /**
     * 半径
     */
    radius: number = ZERO;

    /**
     * 起始角
     */
    startAngle: number = ZERO;

    /**
     * 终止角
     */
    endAngle: number = ZERO;

    /**
     * 是否逆时针（默认：true）
     */
    isClockwise: boolean = true;

    constructor() {
        // todo
    }

    clone() {
        // todo
    }

    /**
     * 圆弧中点
     */
    get midpoint() {
        // todo
        return new Vector2();
    }

    /**
     * 圆弧角度
     */
    get angle() {
        // todo
        return 0;
    }

    isPointOnArc(point: Vector2) {
        // todo
    }

    isPointInsideArc(point: Vector2) {
        // todo
    }

    toPoints(length: number) {
        // todo
    }
}

export { Arc };