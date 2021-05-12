import { IVec3 } from './interface';
import { ZERO, ONE, MIN, MAX } from '../const';

const VALUE = 0;

/**
 * Class representing a vector containing 3 coordinates
 */
class Vector3 {
    /**
     * Vector3 (0, 0, 0)
     */
    static ZERO = new Vector3(ZERO, ZERO, ZERO);

    /**
     * Vector3 (1, 1, 1)
     */
    static ONE = new Vector3(ONE, ONE, ONE);

    /**
     * Vector3 (Infinity, Infinity, Infinity)
     */
    static MAX = new Vector3(MAX, MAX, MAX);

    /**
     * Vector3 (-Infinity, -Infinity, -Infinity)
     */
    static MIN = new Vector3(MIN, MIN, MIN);

    static lerpVectors(v: Vector3, w: Vector3, alpha: number = 1) {
        return v.clone().lerp(w, alpha);
    }

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
     * The Z value of the current vector
     * @default 0
     */
    z: number = ZERO;

    /**
     * @param x x value
     * @param y y value
     * @param z z value
     */
    constructor(x?: number, y?: number, z?: number);
    /**
     * @param point An object that contains the values x, y and z
     */
    constructor(point?: Partial<IVec3>);
    constructor() {
        const [p1, p2, p3] = arguments;
        this.set(p1, p2, p3);
    }

    /**
     * Sets values of the current vector
     * @param x x value
     * @param y y value
     * @param z z value
     * @returns The current vector3
     */
    set(x?: number, y?: number, z?: number): Vector3;
    /**
     * Sets values of the current vector
     * @param point An object that contains the values x, y and z
     * @returns The current vector3
     */
    set(point: Partial<IVec3>): Vector3;
    set() {
        if (typeof arguments[0] === 'number' || typeof arguments[1] === 'number' || typeof arguments[2] === 'number') {
            this.x = arguments[0] === undefined ? this.x : arguments[0];
            this.y = arguments[1] === undefined ? this.y : arguments[1];
            this.z = arguments[2] === undefined ? this.z : arguments[2];
        } else if (typeof arguments[0] === 'object') {
            const { x, y, z } = arguments[0];
            this.x = x === undefined ? this.x : x;
            this.y = y === undefined ? this.y : y;
            this.z = z === undefined ? this.z : z;
        }
        return this;
    }

    /**
     * Sets the x value of the current vector
     * @returns The current Vector3
     */
    setX(x: number) {
        this.x = x;
        return this;
    }

    /**
     * Sets the y value of the current vector
     * @returns The current Vector3
     */
    setY(y: number) {
        this.y = y;
        return this;
    }

    /**
     * Sets the z value of the current vector
     * @returns The current Vector3
     */
    setZ(z: number) {
        this.z = z;
        return this;
    }

    /**
     * Copies v to this vector
     */
    copy(v: Vector3) {
        return this.set(v);
    }

    /**
     * Clones this vector to a new vector
     */
    clone() {
        return new Vector3(this);
    }

    /**
     * Computes length of this vector.
     */
    get length() {
        return Math.sqrt(this.lengthSq);
    }

    /**
     * Computes squared length of this vector.
     */
    get lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /**
     * Adds v with the current vector
     * @param {(number|IVec3)} value a scalar or a Vector3
     * @returns A new Vector3
     */
    add(value: number): Vector3;
    add(vector: Partial<IVec3>): Vector3;
    add() {
        const value = arguments[0];
        const { x, y, z } = this;
        if (typeof value === 'number') {
            return new Vector3(x + value, y + value, z + value);
        } else if (typeof value === 'object') {
            const vx = value.x || ZERO;
            const vy = value.y || ZERO;
            const vz = value.z || ZERO;
            return new Vector3(x + vx, y + vy, z + vz);
        }
        return this.clone();
    }

    /**
     * Subtracts v from the current vector
     * @param {(number|IVec3)} value a scalar or a Vector3
     * @returns A new Vector3
     */
    sub(value: number): Vector3;
    sub(vector: Partial<IVec3>): Vector3;
    sub() {
        const value = arguments[0];
        const { x, y, z } = this;
        if (typeof value === 'number') {
            return new Vector3(x - value, y - value, z - value);
        } else if (typeof value === 'object') {
            const vx = value.x || ZERO;
            const vy = value.y || ZERO;
            const vz = value.z || ZERO;
            return new Vector3(x - vx, y - vy, z - vz);
        }
        return this.clone();
    }

    /**
     * Multiplies the current vector by v.
     * @param {(number|IVec3)} value a scalar or a Vector3
     * @returns A new Vector3
     */
    multiply(value: number): Vector3;
    multiply(vector: Partial<IVec3>): Vector3;
    multiply() {
        const value = arguments[0];
        const { x, y, z } = this;
        if (typeof value === 'number') {
            return new Vector3(x * value, y * value, z * value);
        } else if (typeof value === 'object') {
            const vx = value.x || ONE;
            const vy = value.y || ONE;
            const vz = value.z || ONE;
            return new Vector3(x * vx, y * vy, z * vz);
        }
        return this.clone();
    }

    /**
     * Divides the current vector by v.
     * @param {(number|IVec3)} value a scalar or a Vector3
     * @returns A new Vector3
     */
    divide(value: number): Vector3;
    divide(vector: Partial<IVec3>): Vector3;
    divide() {
        const value = arguments[0];
        const { x, y, z } = this;
        if (typeof value === 'number') {
            return new Vector3(x / value, y / value, z / value);
        } else if (typeof value === 'object') {
            const vx = value.x || ONE;
            const vy = value.y || ONE;
            const vz = value.z || ONE;
            return new Vector3(x / vx, y / vy, z / vz);
        }
        return this.clone();
    }

    /**
     * Inverse the current vector
     * @returns A new Vector3
     */
    inverse() {
        const { x, y, z } = this;
        return new Vector3(-x, -y, -z);
    }

    /**
     * Normalizes this vector.
     * @returns A new Vector3
     */
    normalize() {
        return this.clone().divide(this.length || 1);
    }

    /**
     * Linearly interpolates between this vector and v
     * @param v v vector to interpolate towards.
     * @param alpha alpha interpolation factor in the closed interval [0, 1].
     * @returns A new Vector3
     */
    lerp(v: Vector3, alpha: number = 1) {
        const x = this.x + (v.x - this.x) * alpha;
        const y = this.y + (v.y - this.y) * alpha;
        const z = this.z + (v.z - this.z) * alpha;
        return new Vector3(x, y, z);
    }

    /**
     * Computes dot product of this vector and v
     */
    dot(v: Vector3) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    /**
     * Computes cross product of this vector and v
     * 
     * @returns {Vector3} new Vector
     */
    cross(v: Vector3) {
        return new Vector3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x,
        );
    }

    /**
     * Determines whether this vector and v are equal
     */
    equals(v: Vector3) {
        // todo tolerance
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }

    /**
     * Determines  whether this vector and v are parallel
     */
    isParallel(v: Vector3) {
        const d1 = this.normalize();
        const d2 = v.normalize();
        return d1.equals(d2) || d1.equals(d2.inverse());
    }

    /**
     * Determines whether this vector and v are vertical
     */
    isVertical(v: Vector3) {
        return this.dot(v) === 0;
    }
}

export { IVec3, Vector3 };
