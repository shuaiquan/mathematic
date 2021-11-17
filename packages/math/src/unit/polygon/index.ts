import { SIX_DECIMAL_TOLERANCE } from "../../const";
import { Line2 } from "../line2";
import { Vector2 } from "../vector2";

/**
 * 表示二维的一个多边形
 */
class Polygon {
    points: Vector2[] = [];

    constructor(points: Vector2[] = []) {
        this.points = [...points];
    }

    setPath(points: Vector2[]) {
        this.points = [...points];
    }

    addPoint(point: Vector2 | Vector2[]) {
        const points = Array.isArray(point) ? point : [point];
        points.forEach(p => this.points.push(p));
        return this;
    }

    // getEdges() {

    // }

    // TODO 获取各种中心点

    isPointInsidePolygon(point: Vector2, includeEdge: boolean = true, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        const { x, y } = point;

        let inSide: boolean = false;

        const length = this.points.length;
        for (let i = 0, j = i + 1; i < length; i++, j++) {
            const pi = this.points[i];
            const pj = this.points[j];

            const isOnEdge = (new Line2(pi, pj)).isPointOnSegment(point, tolerance);
            if (!includeEdge && isOnEdge) {
                // 如果目标不包含在边上，且就在边上，那认为不在多边形内
                return false;
            }

            const { x: xi, y: yi } = pi;
            const { x: xj, y: yj } = pj;
            const intersected = ((yi > y) !== (yj > y)) && (xi + (y - yi) / (yj - yi) * (xj - xi) < x);
            if (intersected) {
                inSide = !inSide;
            }
        }

        return inSide;
    }

    isPointOnEdge(point: Vector2, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        const length = this.points.length - 1;
        return this.points.some((pi, i) => {
            const j = i === length ? 0 : i + 1;
            const pj = this.points[j];
            return (new Line2(pi, pj)).isPointOnSegment(point, tolerance);
        });
    }
}

export { Polygon };