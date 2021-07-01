import { SIX_DECIMAL_TOLERANCE, TWO_PI, ZERO } from "../../const";
import { Utils } from "../../utils";
import { Vector2 } from "../vector2";

class Circle {
    center: Vector2 = new Vector2(ZERO, ZERO);

    radius: number = ZERO;

    constructor(center: Vector2, radius: number) {
        this.center = center;
        this.radius = radius;
    }

    setCenter(center: Vector2) {
        this.center.set(center.x, center.y);
        return this;
    }

    setRadius(radius: number) {
        this.radius = radius;
        return this;
    }

    translate(v: Vector2) {
        this.center.set(v.x, v.y);
        return this;
    }

    isPointOnCircle(point: Vector2, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        return Math.abs(Utils.Vector2.distance(point, this.center) - this.radius) <= tolerance;
    }

    isPointInsideCircle(point: Vector2, includeBorder: boolean = false, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        const distance = Utils.Vector2.distance(point, this.center);
        return includeBorder ? distance <= this.radius - tolerance : distance < this.radius - tolerance;
    }

    toPoints(length: number) {
        const points: Vector2[] = [];
        if (length <= 0) {
            return points;
        }
        const step = TWO_PI / length;
        for (let i = 0; i < length; i++) {
            const angle = step * i;
            points.push(Utils.Circle.getPointByAngle(this.center, this.radius, angle));
        }
        return points;
    }
}

export { Circle };
