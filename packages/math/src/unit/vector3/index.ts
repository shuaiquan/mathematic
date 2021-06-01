import { IVec3 } from './interface';
import { ZERO, ONE, MIN, MAX } from '../../const';
import { Utils } from '../../utils';
import { Matrix4 } from '../matrix4';

const NumberUtil = Utils.Number;

/**
 * 表示三维的一个向量
 * 
 * Class representing a vector containing 3 coordinates
 */
class Vector3 {
    /**
     * Vector3 (0, 0, 0)
     */
    static readonly ZERO = new Vector3(ZERO, ZERO, ZERO);

    /**
     * Vector3 (1, 1, 1)
     */
    static readonly ONE = new Vector3(ONE, ONE, ONE);

    /**
     * Vector3 (Infinity, Infinity, Infinity)
     */
    static readonly MAX = new Vector3(MAX, MAX, MAX);

    /**
     * Vector3 (-Infinity, -Infinity, -Infinity)
     */
    static readonly MIN = new Vector3(MIN, MIN, MIN);

    /**
     * X轴正方向
     * 
     * The positive direction of the X-Axis
     */
    static X_DIRECTION = new Vector3(ONE, ZERO, ZERO);

    /**
     * Y轴正方向
     * 
     * The positive direction of the Y-Axis
     */
    static Y_DIRECTION = new Vector3(ZERO, ONE, ZERO);

    /**
     * Z轴正方向
     * 
     * The positive direction of the Z-Axis
     */
    static Z_DIRECTION = new Vector3(ZERO, ZERO, ONE);

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
     * 向量的 z 值
     * 
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
     * 设置向量的值
     * 
     * Sets values of the current vector
     * @param x x value
     * @param y y value
     * @param z z value
     * @returns 当前向量 (this vector3)
     */
    set(x?: number, y?: number, z?: number): Vector3;
    /**
     * 设置向量的值
     * 
     * Sets values of the current vector
     * @param point An object that contains the values x, y and z
     * @returns 当前向量 (this vector3)
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
     * 设置向量的 x 值
     * 
     * Sets the x value of the current vector
     * @returns 当前向量 (this vector3)
     */
    setX(x: number) {
        this.x = x;
        return this;
    }

    /**
     * 设置向量的 y 值
     * 
     * Sets the y value of the current vector
     * @returns 当前向量 (this vector3)
     */
    setY(y: number) {
        this.y = y;
        return this;
    }

    /**
     * 设置向量的 z 值
     * 
     * Sets the z value of the current vector
     * @returns 当前向量 (this vector3)
     */
    setZ(z: number) {
        this.z = z;
        return this;
    }

    /**
     * 将向量 v 的值拷贝给当前向量
     * 
     * Copies v to this vector
     */
    copy(v: Vector3) {
        return this.set(v);
    }

    /**
     * 复制当前向量
     * 
     * Clones this vector to a new vector
     */
    clone() {
        return new Vector3(this);
    }

    /**
     * 向量的长度
     * 
     * Computes length of this vector.
     */
    get length() {
        return Math.sqrt(this.lengthSq);
    }

    /**
     * 向量长度的平方
     * 
     * Computes squared length of this vector.
     */
    get lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /**
     * 向量加法
     * 
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
     * 向量减法
     * 
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
     * 向量乘法
     * 
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
     * 向量除法
     * 
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
     * 对当前向量应用矩阵
     * 
     * Apply matrix4 to the current vector
     * @param matrix A Matrix$
     * @returns A new Vector3
     */
    applyMatrix4(matrix: Matrix4) {
        const [
            m11, m12, m13, m14,
            m21, m22, m23, m24,
            m31, m32, m33, m34,
        ] = matrix.toArray();
        const { x, y, z } = this;

        const vx = m11 * x + m12 * y + m13 * z + m14;
        const vy = m21 * x + m22 * y + m23 * z + m24;
        const vz = m31 * x + m32 * y + m33 * z + m34;
        return new Vector3(vx, vy, vz);
    }

    /**
     * 逆向量
     * 
     * Inverse the current vector
     * @returns A new Vector3
     */
    inverse() {
        const { x, y, z } = this;
        return new Vector3(-x, -y, -z);
    }

    /**
     * 单位向量
     * 
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
     * 点乘
     * 
     * Computes dot product of this vector and v
     */
    dot(v: Vector3) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    /**
     * 叉乘
     * 
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
     * 两个向量是否相等
     * 
     * Determines whether this vector and v are equal
     */
    equals(v: Vector3) {
        // todo tolerance
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }

    /**
     * 两个向量是否平行
     * 
     * Determines  whether this vector and v are parallel
     */
    isParallel(v: Vector3) {
        const l1 = this.length;
        const l2 = v.length
        if (l1 === 0 || l2 === 0) {
            // zero vector
            return true;
        }
        // cosθ === 0
        const cos = this.dot(v) / (l1 * l2);
        return NumberUtil.isEqual(cos, 1) || NumberUtil.isEqual(cos, -1);
    }

    /**
     * 两个向量是否正交垂直
     * 
     * Determines whether this vector and v are orthogonal
     */
    isOrthogonal(v: Vector3) {
        return this.dot(v) === 0;
    }
}

export { IVec3, Vector3 };
