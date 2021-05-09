import { IVec2 } from "./interface";
import { ZERO, ONE, MAX, MIN } from '../const';

/**
 * Class representing a vector containing 2 coordinates
 */
class Vector2 {
    /**
     * Vector2 (0, 0)
     */
    static ZERO = new Vector2(ZERO, ZERO);

    /**
     * Vector2 (1, 1)
     */
    static ONE = new Vector2(ONE, ONE);

    /**
     * Vector2 (Infinity, Infinity)
     */
    static MAX = new Vector2(MAX, MAX);

    /**
     * Vector2 (-Infinity, -Infinity)
     */
    static MIN = new Vector2(MIN, MIN);

    /** 
     * The X value of the current vector
     * @default 0
     */
    x: number = ZERO;

    /**
     * The Y value of the current vector
     * @default 0
     */
    y: number = ZERO;

    /**
     * @param x x value
     * @param y y value
     */
    constructor(x?: number, y?: number);
    /**
     * @param point A Object that contains the values x and y
     */
    constructor(point?: Partial<IVec2>);
    constructor() {
        const [p1, p2] = arguments;
        this.set(p1, p2);
    }

    /**
     * Sets values of the current vector
     * @param x x value
     * @param y y value
     * @returns The current value
     */
    set(x?: number, y?: number): Vector2;
    /**
     * Sets values of the current vector
     * @param point A Object that contains the values x and y
     * @returns The current value
     */
    set(point: Partial<IVec2>): Vector2;
    set() {
        if (typeof arguments[0] === 'number') {
            this.x = arguments[0] || ZERO;
            this.y = arguments[1] || ZERO;
        } else if (typeof arguments[0] === 'object') {
            this.x = arguments[0].x || ZERO;
            this.y = arguments[0].y || ZERO;
        }

        return this;
    }

    /**
     * Sets the X value of the current vector
     * @returns The current Vector2
     */
    setX(x: number) {
        this.x = x;
        return this;
    }

    /**
     * Sets the Y value of the current vector
     * @returns The current Vector2
     */
    setY(y: number) {
        this.y = y;
        return this;
    }

    /**
     * Copies v to the current vector
     * @returns The current value
     */
    copy(v: Vector2) {
        return this.set(v);
    }

    /**
     * Clones the current vector to a new vector
     * @returns A new Vector
     */
    clone() {
        return new Vector2(this);
    }

    /**
     * Get the length of the current vector.
     */
    get length() {
        return Math.sqrt(this.lengthSq);
    }

    /**
     * Get the squared length of the current vector.
     */
    get lengthSq() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * computes the angle in radians with respect to the positive x-axis
     * 
     * Radians in range [ 0, 2 * PI )
     */
    get angle() {
        // todo 检查这里的逻辑
        // step 1. computes the angle by atan in [-90, 90]
        const angle = Math.atan(this.y / this.x);
        /// step 2. maps the angle to the quadrant of the vector
        return this.x < 0 ? angle + Math.PI : angle;
    }

    /**
     * Adds v with the current vector
     * @param {(number|IVec2)} value a scalar or a vector2
     * @returns A new Vector2
     */
    add(value: number): Vector2;
    add(vector: Partial<IVec2>): Vector2;
    add() {
        const value = arguments[0];
        const { x, y } = this;
        if (typeof value === 'number') {
            return new Vector2(x + value, y + value);
        } else if (typeof value === 'object') {
            const vx = value.x || ZERO;
            const vy = value.y || ZERO;
            return new Vector2(x + vx, y + vy);
        }
        return this.clone();
    }

    /**
     * Subtracts v from the current vector
     * @param {(number|IVec2)} value a scalar or a vector2
     * @returns A new Vector2
     */
    sub(value: number): Vector2;
    sub(vector: Partial<IVec2>): Vector2;
    sub() {
        const value = arguments[0];
        const { x, y } = this;
        if (typeof value === 'number') {
            return new Vector2(x - value, y - value);
        } else if (typeof value === 'object') {
            const vx = value.x || ZERO;
            const vy = value.y || ZERO;
            return new Vector2(x - vx, y - vy);
        }
        return this.clone();
    }

    /**
     * Multiplies the current vector by v.
     * @param {(number|IVec2)} value a scalar or a vector2
     * @returns A new Vector2
     */
    multiply(value: number): Vector2;
    multiply(vector: Partial<IVec2>): Vector2;
    multiply() {
        const value = arguments[0];
        const { x, y } = this;
        if (typeof value === 'number') {
            return new Vector2(x * value, y * value);
        } else if (typeof value === 'object') {
            const vx = value.x || 1;
            const vy = value.y || 1;
            return new Vector2(x * vx, y * vy);
        }
        return this.clone();
    }

    /**
     * Divides the current vector by v.
     * @param {(number|IVec2)} value a scalar or a vector2
     * @returns A new Vector2
     */
    divide(value: number): Vector2;
    divide(vector: Partial<IVec2>): Vector2;
    divide() {
        const value = arguments[0];
        const { x, y } = this;
        if (typeof value === 'number') {
            return new Vector2(x / value, y / value);
        } else if (typeof value === 'object') {
            const vx = value.x || 1;
            const vy = value.y || 1;
            return new Vector2(x / vx, y / vy)
        }
        return this.clone();
    }

    /**
     * Inverse the current vector
     * @returns A new Vector2
     */
    inverse() {
        return new Vector2(-this.x, -this.y);
    }

    /**
     * Normalizes the current vector.
     * @returns A new Vector2
     */
    normalize() {
        return this.clone().divide(this.length || 1);
    }

    /**
     * Linearly interpolates between the current vector and v
     * @param v v vector to interpolate towards.
     * @param alpha alpha interpolation factor in the closed interval [0, 1].
     * @returns A new Vector2
     */
    lerp(v: Vector2, alpha: number = 1) {
        const x = this.x + (v.x - this.x) * alpha;
        const y = this.y + (v.y - this.y) * alpha;
        return new Vector2(x, y);
    }

    /**
     * Computes dot product of the current vector and v
     */
    dot(v: Vector2) {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * Computes cross product of the current vector and v
     * 
     * The cross product of Vector2 is just a scalar of z-axis
     */
    cross(v: Vector2) {
        return this.x * v.y - this.y * v.x;
    }

    /**
     * Determines whether the current vector and v are equal
     */
    equals(v: Vector2) {
        // todo tolerance
        return this.x === v.x && this.y === v.y;
    }

    /**
     * Determines  whether the current vector and v are parallel
     */
    isParallel(v: Vector2) {
        return this.cross(v) === 0;
    }

    /**
     * Determines whether the current vector and v are vertical
     */
    isVertical(v: Vector2) {
        return this.dot(v) === 0;
    }
}

export { IVec2, Vector2 };
