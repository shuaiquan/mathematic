import { IVec2 } from "./interface";
import { ZERO, ONE, MAX, MIN, TWO_PI, SIX_DECIMAL_TOLERANCE } from '../../const';
import { Matrix3 } from "../matrix3";
import { Utils } from "../../utils";

const NumberUtil = Utils.Number;

/**
 * Class representing a vector containing 2 coordinates
 */
class Vector2 {
    /**
     * Vector2 (0, 0)
     */
    static readonly ZERO = new Vector2(ZERO, ZERO);

    /**
     * Vector2 (1, 1)
     */
    static readonly ONE = new Vector2(ONE, ONE);

    /**
     * Vector2 (Infinity, Infinity)
     */
    static readonly MAX = new Vector2(MAX, MAX);

    /**
     * Vector2 (-Infinity, -Infinity)
     */
    static readonly MIN = new Vector2(MIN, MIN);

    /**
     * The positive direction of the X-Axis (X轴正方向)
     */
    static X_DIRECTION = new Vector2(ONE, ZERO);

    /**
     * The positive direction of the Y-Axis (Y轴正方向)
     */
    static Y_DIRECTION = new Vector2(ZERO, ONE);

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
     * @param point An Object that contains the values x and y
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
     * @returns The current vector2
     */
    set(x?: number, y?: number): Vector2;
    /**
     * Sets values of the current vector
     * @param point A Object that contains the values x and y
     * @returns The current vector2
     */
    set(point: Partial<IVec2>): Vector2;
    set() {
        if (typeof arguments[0] === 'number' || typeof arguments[1] === 'number') {
            this.x = arguments[0] === undefined ? this.x : arguments[0];
            this.y = arguments[1] === undefined ? this.y : arguments[1];
        } else if (typeof arguments[0] === 'object') {
            const { x, y } = arguments[0];
            this.x = x === undefined ? this.x : x;
            this.y = y === undefined ? this.y : y;
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
     * Computes the angle in radians with respect to the horizontal left axis
     * 
     * Radians in range [ 0, 2 * PI ), counterclockwise (逆时针为正)
     */
    get angle() {
        // Math.atan2 value range: 
        // [0, 180] -> [0, PI]
        // (180, 360) -> (-PI, 0)
        const radian = Math.atan2(this.y, this.x);
        return radian < 0 ? radian + TWO_PI : radian;
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
     * Apply matrix3 to the current vector
     * @param matrix a Matrix3
     * @returns A new Vector2
     */
    applyMatrix3(matrix: Matrix3) {
        const [
            m11, m12, m13,
            m21, m22, m23,
        ] = matrix.toArray();
        const { x, y } = this;

        const vx = m11 * x + m12 * y + m13;
        const vy = m21 * x + m22 * y + m23;
        return new Vector2(vx, vy);
    }

    /**
     * Inverse the current vector
     * @returns A new Vector2
     */
    inverse() {
        const x = this.x === 0 ? 0 : -this.x;
        const y = this.y === 0 ? 0 : -this.y;
        return new Vector2(x, y);
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
    isParallel(v: Vector2, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        return NumberUtil.isEqual(this.cross(v), 0, tolerance);
    }

    /**
     * Determines whether the current vector and v are orthogonal
     */
    isOrthogonal(v: Vector2, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        return NumberUtil.isEqual(this.dot(v), 0, tolerance);
    }
}

export { IVec2, Vector2 };
