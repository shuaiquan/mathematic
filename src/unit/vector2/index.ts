import { IVec2 } from "./interface";
import { ZERO, ONE, MAX, MIN, TWO_PI, SIX_DECIMAL_TOLERANCE } from '../../const';
import { Matrix3 } from "../matrix3";
import { NumberUtil } from "../../common/number";

/**
 * 表示二维的一个向量
 * 
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
     * X轴正方向
     * 
     * The positive direction of the X-Axis
     */
    static X_DIRECTION = new Vector2(ONE, ZERO);

    /**
     * Y轴正方向
     * 
     * The positive direction of the Y-Axis
     */
    static Y_DIRECTION = new Vector2(ZERO, ONE);

    /** 
     * 向量的 x 值
     * 
     * The X value of the current vector
     * @default 0
     */
    x: number = ZERO;

    /**
     * 向量的 y 值
     * 
     * The Y value of the current vector
     * @default 0
     */
    y: number = ZERO;

    /**
     * @param x x value
     * @param y y value
     */
    constructor(x: number, y: number);
    /**
     * @param point An Object that contains the values x and y
     */
    constructor(point: Partial<IVec2>);
    constructor();
    constructor() {
        const [p1, p2] = arguments;
        if (p1 !== undefined) {
            this.set(p1, p2);
        }
    }

    /**
     * 设置向量的值
     * 
     * Sets values of this vector
     * @param x x value
     * @param y y value
     * @returns 当前向量 (this vector2)
     */
    set(x: number, y: number): Vector2;
    /**
     * 设置向量的值
     * 
     * Sets values of this vector
     * @param point A Object that contains the values x and y
     * @returns 当前向量 (this vector2)
     */
    set(point: Partial<IVec2>): Vector2;
    /**
     * 设置向量的值
     * 
     * Sets values of this vector
     * @param value 向量的 X 和 Y 值
     * @returns 当前向量 (this vector2)
     */
    set(value: number): Vector2;
    set() {
        if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
            this.x = arguments[0];
            this.y = arguments[1];
        } else if (typeof arguments[0] === 'number') {
            this.x = arguments[0];
            this.y = arguments[0];
        } else if (typeof arguments[0] === 'object') {
            const { x, y } = arguments[0];
            this.x = x === undefined ? this.x : x;
            this.y = y === undefined ? this.y : y;
        }
        return this;
    }

    /**
     * 设置向量的 x 值
     * 
     * Sets the X value of this vector
     * @returns 当前向量 (this vector2)
     */
    setX(x: number) {
        this.x = x;
        return this;
    }

    /**
     * 设置向量的 y 值
     * 
     * Sets the Y value of this vector
     * @returns 当前向量 (this vector2)
     */
    setY(y: number) {
        this.y = y;
        return this;
    }

    /**
     * 将向量 v 的值拷贝给当前向量
     * 
     * Copies v to this vector
     * @returns 当前向量 (this vector2)
     */
    copy(v: Vector2) {
        return this.set(v);
    }

    /**
     * 复制当前向量
     * 
     * Clones this vector to a new vector
     * @returns 新的向量 (A new Vector)
     */
    clone() {
        return new Vector2(this);
    }

    /**
     * 向量的长度
     * 
     * Get the length of this vector.
     */
    get length() {
        return Math.sqrt(this.lengthSq);
    }

    /**
     * 向量长度的平方
     * 
     * Get the squared length of this vector.
     */
    get lengthSq() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * 向量的角度
     * 
     * Computes the angle in radians with respect to the horizontal left axis
     * 
     * 弧度制，范围在 [ 0, 2 * PI )，逆时针为正
     * 
     * Radians in range [ 0, 2 * PI ), counterclockwise
     */
    get angle() {
        // Math.atan2 value range: 
        // [0, 180] -> [0, PI]
        // (180, 360) -> (-PI, 0)
        const radian = Math.atan2(this.y, this.x);
        return radian < 0 ? radian + TWO_PI : radian;
    }

    /**
     * 向量加法
     * 
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
     * 向量减法
     * 
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
     * 向量乘法
     * 
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
     * 向量除法
     * 
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
     * 对当前向量应用矩阵
     * 
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
     * 逆向量
     * 
     * Inverse the current vector
     * @returns A new Vector2
     */
    inverse() {
        const x = this.x === 0 ? 0 : -this.x;
        const y = this.y === 0 ? 0 : -this.y;
        return new Vector2(x, y);
    }

    /**
     * 单位向量
     * 
     * Normalizes the current vector.
     * @returns A new Vector2
     */
    normalize() {
        return this.clone().divide(this.length || 1);
    }

    /**
     * 点乘
     * 
     * Computes dot product of the current vector and v
     */
    dot(v: Vector2) {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * 叉乘
     * 
     * Computes cross product of the current vector and v
     * 
     * The cross product of Vector2 is just a scalar of z-axis
     */
    cross(v: Vector2) {
        return this.x * v.y - this.y * v.x;
    }

    /**
     * 两个向量是否相等
     * 
     * Determines whether the current vector and v are equal
     */
    equals(v: Vector2) {
        // todo tolerance
        return this.x === v.x && this.y === v.y;
    }

    /**
     * 两个向量是否平行
     * 
     * Determines  whether the current vector and v are parallel
     */
    isParallel(v: Vector2, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        return NumberUtil.isEqual(this.cross(v), 0, tolerance);
    }

    /**
     * 两个向量是否正交垂直
     * 
     * Determines whether the current vector and v are orthogonal
     */
    isOrthogonal(v: Vector2, tolerance: number = SIX_DECIMAL_TOLERANCE) {
        return NumberUtil.isEqual(this.dot(v), 0, tolerance);
    }
}

export { IVec2, Vector2 };
