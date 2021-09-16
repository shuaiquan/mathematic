import { Vector2 } from "@s7n/math";
import { BaseShape } from "../baseShape";

class Circle extends BaseShape {
    private center: Vector2 = new Vector2();

    private radius: number = 0;

    constructor(center: Vector2, radius: number) {
        super();
        this.center = center.clone();
        this.radius = radius;
    }

    setCenter(center: Vector2) {
        this.center = center.clone();
    }

    getCenter() {
        return this.center;
    }

    setRadius(radius: number) {
        this.radius = radius;
    }

    getRadius() {
        return this.radius;
    }
}

export { Circle };