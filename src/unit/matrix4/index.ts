import { Vector3 } from "../vector3";

const MATRIX4_SIZE = 16;

/**
 * 表示一个 4 x 4 的矩阵
 * Class representing a four by four matrix
 */
class Matrix4 {
    /**
     * 零矩阵
     * 
     * Zero Matrix4
     */
    static readonly Zero = new Matrix4(
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    );

    /**
     * 单位矩阵
     * 
     * Identity Matrix4
     */
    static readonly Identity = new Matrix4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    )

    /**
     * 依次将每个矩阵乘起来
     * 
     * Multiplies the matrices
     */
    static multiplyMatrices(matrices: Matrix4[]) {
        return matrices.reduce((a, b) => a.multiply(b), Matrix4.Identity);
    }

    /**
     * 依次将每个矩阵左乘起来
     * 
     * Multiplies the matrices to the left
     */
    static preMultiplyMatrices(matrices: Matrix4[]) {
        return matrices.reduce((a, b) => a.preMultiply(b), Matrix4.Identity);
    }

    /**
     * @returns the array result ma x mb
     */
    private static product(a: Matrix4, b: Matrix4) {
        const [
            a11, a12, a13, a14,
            a21, a22, a23, a24,
            a31, a32, a33, a34,
            a41, a42, a43, a44,
        ] = a.elements;
        const [
            b11, b12, b13, b14,
            b21, b22, b23, b24,
            b31, b32, b33, b34,
            b41, b42, b43, b44,
        ] = b.elements;

        const m11 = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        const m12 = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        const m13 = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        const m14 = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
        const m21 = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        const m22 = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        const m23 = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        const m24 = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
        const m31 = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        const m32 = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        const m33 = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        const m34 = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
        const m41 = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        const m42 = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        const m43 = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        const m44 = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        return [
            m11, m12, m13, m14,
            m21, m22, m23, m24,
            m31, m32, m33, m34,
            m41, m42, m43, m44,
        ];
    }

    /**
     * Elements of the matrix
     */
    private elements: number[] = [];

    /**
     * The Matrix4 entries are in the following order:
     * 
     *  m11  m12  m13 m14
     * 
     *  m21  m22  m23 m24
     * 
     *  m31  m32  m33 m34
     * 
     *  m41  m42  m43 m44
     * 
     *  @default Identity Matrix
     */
    constructor(
        m11: number = 1, m12: number = 0, m13: number = 0, m14: number = 0,
        m21: number = 0, m22: number = 1, m23: number = 0, m24: number = 0,
        m31: number = 0, m32: number = 0, m33: number = 1, m34: number = 0,
        m41: number = 0, m42: number = 0, m43: number = 0, m44: number = 1,
    ) {
        this.elements = [
            m11, m12, m13, m14,
            m21, m22, m23, m24,
            m31, m32, m33, m34,
            m41, m42, m43, m44,
        ];
    }

    /**
     * 设置矩阵的值
     * 
     * The Matrix4 entries are in the following order:
     * 
     *  m11  m12  m13 m14
     * 
     *  m21  m22  m23 m24
     * 
     *  m31  m32  m33 m34
     * 
     *  m41  m42  m43 m44
     */
    set(m11: number, m12: number, m13: number, m14: number,
        m21: number, m22: number, m23: number, m24: number,
        m31: number, m32: number, m33: number, m34: number,
        m41: number, m42: number, m43: number, m44: number,
    ) {
        this.elements = [
            m11, m12, m13, m14,
            m21, m22, m23, m24,
            m31, m32, m33, m34,
            m41, m42, m43, m44,
        ];
        return this;
    }

    /**
     * 将数组设置为矩阵的值
     * 
     * Sets values of the current matrix by an array
     * @param elements An array of matrix elements
     * @param offset Offset to start
     * @returns 当前矩阵 this matrix
     */
    fromArray(elements: number[], offset: number = 0) {
        // elements 中不足 16 位的将保持原值
        const length = elements.length - offset < MATRIX4_SIZE ? elements.length - offset : MATRIX4_SIZE;
        for (let i = 0; i < length; i++) {
            const result = elements[i + offset];
            if (typeof result === 'number') {
                this.elements[i] = elements[i + offset];
            }
        }
        return this;
    }

    /**
     * 将矩阵的值转换成数组输出
     * 
     * Outputs the elements of the current matrix as an array
     */
    toArray() {
        return [...this.elements];
    }

    /**
     * 根据平移变换设置矩阵的值
     * 
     * Sets this matrix from translate transform
     * @returns 当前矩阵 this matrix
     */
    fromTranslate(v: Vector3) {
        this.set(
            1, 0, 0, v.x,
            0, 1, 0, v.y,
            0, 0, 1, v.z,
            0, 0, 0, 1,
        );

        return this;
    }

    /**
     * 根据缩放变换设置矩阵的值
     * 
     * Sets this matrix from scale transform
     * @returns 当前矩阵 this matrix
     */
    fromScale(v: Vector3) {
        const { x, y, z } = v;
        this.set(
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1,
        );

        return this;
    }

    /**
     * 根据绕 X 轴的旋转变换设置矩阵的值
     * 
     * Sets this matrix from rotate transform about X-axis
     * @param radian theta Rotation angle in radians.
     * @returns 当前矩阵 this matrix
     */
    fromRotateX(radian: number) {
        const c = Math.cos(radian);
        const s = Math.sin(radian);

        return this.set(
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        );
    }

    /**
     * 根据绕 Y 轴的旋转变换设置矩阵的值
     * 
     * Sets this matrix from rotate transform about Y-axis
     * @param radian theta Rotation angle in radians.
     * @returns 当前矩阵 this matrix
     */
    fromRotateY(radian: number) {
        const c = Math.cos(radian);
        const s = Math.sin(radian);

        return this.set(
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        );
    }

    /**
     * 根据绕 Z 轴的旋转变换设置矩阵的值
     * 
     * Sets this matrix from rotate transform about Z-axis
     * @param radian theta Rotation angle in radians.
     * @returns 当前矩阵 this matrix
     */
    fromRotateZ(radian: number) {
        const c = Math.cos(radian);
        const s = Math.sin(radian);

        return this.set(
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }

    /**
     * 将矩阵 m 的值拷贝给当前矩阵
     * 
     * Copies m to the current matrix
     * @returns 当前矩阵 this matrix
     */
    copy(m: Matrix4) {
        return this.fromArray(m.toArray());
    }

    /**
     * 复制当前矩阵
     * 
     * Clones the current matrix to a new matrix
     * @returns 新的矩阵 (A new matrix)
     */
    clone() {
        return new Matrix4().fromArray(this.toArray());
    }

    /**
     * 乘矩阵 m
     * 
     * Multiplies the current matrix by m Matrix.
     * @returns 新的矩阵 (A new matrix)
     */
    multiply(m: Matrix4) {
        return new Matrix4().fromArray(Matrix4.product(this, m));
    }

    /**
     * 左乘矩阵 m
     * 
     * Multiplies the current matrix to the left by m Matrix
     * @returns 新的矩阵 (A new matrix)
     */
    preMultiply(m: Matrix4) {
        return new Matrix4().fromArray(Matrix4.product(m, this));
    }

    /**
     * 乘一个标量
     * 
     * Multiplies this matrix by a number;
     * @returns 新的矩阵 (A new matrix)
     */
    multiplyScalar(v: number) {
        const arr: number[] = [];

        const te = this.elements;
        arr[0] = te[0] * v; arr[1] = te[1] * v; arr[2] = te[2] * v; arr[3] = te[3] * v;
        arr[4] = te[4] * v; arr[5] = te[5] * v; arr[6] = te[6] * v; arr[7] = te[7] * v;
        arr[8] = te[8] * v; arr[9] = te[9] * v; arr[10] = te[10] * v; arr[11] = te[11] * v;
        arr[12] = te[12] * v; arr[13] = te[13] * v; arr[14] = te[14] * v; arr[15] = te[15] * v;

        return new Matrix4().fromArray(arr);
    }

    /**
     * 转置矩阵
     * 
     * Transposes this matrix
     * @returns 新的矩阵 (A new matrix)
     */
    transpose() {
        const arr: number[] = [];

        const te = this.elements;
        arr[0] = te[0]; arr[1] = te[4]; arr[2] = te[8]; arr[3] = te[12];
        arr[4] = te[1]; arr[5] = te[5]; arr[6] = te[9]; arr[7] = te[13];
        arr[8] = te[2]; arr[9] = te[6]; arr[10] = te[10]; arr[11] = te[14];
        arr[12] = te[3]; arr[13] = te[7]; arr[14] = te[11]; arr[15] = te[15]

        return new Matrix4().fromArray(arr);
    }

    /**
     * 计算逆矩阵
     * 
     * Inverts this matrix
     * @returns 新的矩阵 (A new matrix)
     */
    invert() {
        const determinant = this.determinant();
        if (determinant === 0) {
            throw new Error("The matrix determinant is zero");
        }

        const [
            m11, m12, m13, m14,
            m21, m22, m23, m24,
            m31, m32, m33, m34,
            m41, m42, m43, m44,
        ] = this.elements;

        const d = 1 / determinant;

        /**
         * determinant for
         * m22, m23, m24,
         * m32, m33, m34,
         * m42, m43, m44,
         */
        const n11 = m22 * (m33 * m44 - m34 * m43) - m23 * (m32 * m44 - m34 * m42) + m24 * (m32 * m43 - m33 * m42);

        /**
         * determinant for
         * m21, m23, m24,
         * m31, m33, m34,
         * m41, m43, m44,
         */
        const n12 = m21 * (m33 * m44 - m34 * m43) - m23 * (m31 * m44 - m34 * m41) + m24 * (m31 * m43 - m33 * m41);

        /**
         * determinant for
         * m21, m22, m24,
         * m31, m32, m34,
         * m41, m42, m44,
         */
        const n13 = m21 * (m32 * m44 - m34 * m42) - m22 * (m31 * m44 - m34 * m41) + m24 * (m31 * m42 - m32 * m41);

        /**
         * determinant for
         * m21, m22, m23,
         * m31, m32, m33,
         * m41, m42, m43
         */
        const n14 = m21 * (m32 * m43 - m33 * m42) - m22 * (m31 * m43 - m33 * m41) + m23 * (m31 * m42 - m32 * m41);

        /**
         * determinant for
         * m12, m13, m14,
         * m32, m33, m34,
         * m42, m43, m44,
         */
        const n21 = m12 * (m33 * m44 - m34 * m43) - m13 * (m32 * m44 - m34 * m42) + m14 * (m32 * m43 - m33 * m42);

        /**
         * determinant for
         * m11, m13, m14,
         * m31, m33, m34,
         * m41, m43, m44,
         */
        const n22 = m11 * (m33 * m44 - m34 * m43) - m13 * (m31 * m44 - m34 * m41) + m14 * (m31 * m43 - m33 * m41);

        /**
         * determinant for
         * m11, m12, m14,
         * m31, m32, m34,
         * m41, m42, m44,
         */
        const n23 = m11 * (m32 * m44 - m34 * m42) - m12 * (m31 * m44 - m34 * m41) + m14 * (m31 * m42 - m32 * m41);

        /**
         * determinant for
         * m11, m12, m13,
         * m31, m32, m33,
         * m41, m42, m43,
         */
        const n24 = m11 * (m32 * m43 - m33 * m42) - m12 * (m31 * m43 - m33 * m41) + m13 * (m31 * m42 - m32 * m41);

        /**
         * determinant for
         * m12, m13, m14,
         * m22, m23, m24,
         * m42, m43, m44,
         */
        const n31 = m12 * (m23 * m44 - m24 * m43) - m13 * (m22 * m44 - m24 * m42) + m14 * (m22 * m43 - m23 * m42);

        /**
         * determinant for
         * m11, m13, m14,
         * m21, m23, m24,
         * m41, m43, m44,
         */
        const n32 = m11 * (m23 * m44 - m24 * m43) - m13 * (m21 * m44 - m24 * m41) + m14 * (m21 * m43 - m23 * m41);

        /**
         * determinant for
         * m11, m12, m14,
         * m21, m22, m24,
         * m41, m42, m44,
         */
        const n33 = m11 * (m22 * m44 - m24 * m42) - m12 * (m21 * m44 - m24 * m41) + m14 * (m21 * m42 - m22 * m41);

        /**
         * determinant for
         * m11, m12, m13,
         * m21, m22, m23,
         * m41, m42, m43,
         */
        const n34 = m11 * m11 * (m22 * m43 - m23 * m42) - m12 * (m21 * m43 - m23 * m41) + m13 * (m21 * m42 - m22 * m41);

        /**
         * determinant for
         * m12, m13, m14,
         * m22, m23, m24,
         * m32, m33, m34,
         */
        const n41 = m12 * (m23 * m34 - m24 * m33) - m13 * (m22 * m34 - m24 * m32) + m14 * (m22 * m33 - m23 * m32);

        /**
         * determinant for
         * m11, m13, m14,
         * m21, m23, m24,
         * m31, m33, m34,
         */
        const n42 = m11 * (m23 * m34 - m24 * m33) - m13 * (m21 * m34 - m24 * m31) + m14 * (m21 * m33 - m23 * m31);

        /**
         * determinant for
         * m11, m12, m14,
         * m21, m22, m24,
         * m31, m32, m34,
         */
        const n43 = m11 * (m22 * m34 - m24 * m32) - m12 * (m21 * m34 - m24 * m31) + m14 * (m21 * m32 - m22 * m31);

        /**
         * determinant for
         * m11, m12, m13,
         * m21, m22, m23,
         * m31, m32, m33,
         */
        const n44 = m11 * (m22 * m33 - m23 * m32) - m12 * (m21 * m33 - m23 * m31) + m13 * (m21 * m32 - m22 * m31);


        return new Matrix4(
            n11, -n12, n13, -n14,
            -n21, n22, -n23, n24,
            n31, -n32, n33, -n34,
            -n41, n42, -n43, n44
        ).transpose().multiplyScalar(d);
    }

    /**
     * 计算行列式
     * 
     * Calculates the determinant of this Matrix4 (行列式)
     */
    determinant() {
        const [
            m11, m12, m13, m14,
            m21, m22, m23, m24,
            m31, m32, m33, m34,
            m41, m42, m43, m44,
        ] = this.elements;

        /**
         * determinant for 
         *  m22, m23, m24,
         *  m32, m33, m34,
         *  m42, m43, m44
         */
        const n11 = m22 * (m33 * m44 - m34 * m43) - m23 * (m32 * m44 - m34 * m42) + m24 * (m32 * m43 - m33 * m42);

        /**
         * determinant for 
         * m21, m23, m24,
         * m31, m33, m34,
         * m41, m43, m44
         */
        const n12 = m21 * (m33 * m44 - m34 * m43) - m23 * (m31 * m44 - m34 * m41) + m24 * (m31 * m43 - m33 * m41);

        /**
         * determinant for
         * m21, m22, m24,
         * m31, m32, m34,
         * m41, m42, m44
         */
        const n13 = m21 * (m32 * m44 - m34 * m42) - m22 * (m31 * m44 - m34 * m41) + m24 * (m31 * m42 - m32 * m41);

        /**
         * determinant for
         * m21, m22, m23,
         * m31, m32, m33,
         * m41, m42, m43
         */
        const n14 = m21 * (m32 * m43 - m33 * m42) - m22 * (m31 * m43 - m33 * m41) + m23 * (m31 * m42 - m32 * m41);

        return m11 * n11 - m12 * n12 + m13 * n13 - m14 * n14;
    }

    /**
     * 计算在当前矩阵的基础上叠加平移变化后的矩阵
     * 
     * Applies translate transform to this matrix
     * @returns 新的矩阵 (A new matrix)
     */
    applyTranslate(v: Vector3) {
        const [
            m11, m12, m13, m14,
            m21, m22, m23, m24,
            m31, m32, m33, m34,
            m41, m42, m43, m44,
        ] = this.elements;
        const { x, y, z } = v;

        const arr: number[] = [];
        arr[0] = m11 + m41 * x;
        arr[1] = m12 + m42 * x;
        arr[2] = m13 + m43 * x;
        arr[3] = m14 + m44 * x;
        arr[4] = m21 + m41 * y;
        arr[5] = m22 + m42 * y;
        arr[6] = m23 + m43 * y;
        arr[7] = m24 + m44 * y;
        arr[8] = m31 + m41 * z;
        arr[9] = m32 + m42 * z;
        arr[10] = m33 + m43 * z;
        arr[11] = m34 + m44 * z;
        arr[12] = m41;
        arr[13] = m42;
        arr[14] = m43;
        arr[15] = m44;

        return new Matrix4().fromArray(arr);
    }

    /**
     * 计算在当前矩阵的基础上叠加缩放变化后的矩阵
     * 
     * Applies scale transform to this matrix
     * @returns 新的矩阵 (A new matrix)
     */
    applyScale(v: Vector3) {
        const { x, y, z } = v;
        const arr = [...this.elements];

        arr[0] *= x;
        arr[1] *= x;
        arr[2] *= x;
        arr[3] *= x;
        arr[4] *= y;
        arr[5] *= y;
        arr[6] *= y;
        arr[7] *= y;
        arr[8] *= z;
        arr[9] *= z;
        arr[10] *= z;
        arr[11] *= z;

        return new Matrix4().fromArray(arr);
    }

    /**
     * 计算在当前矩阵的基础上叠加绕 X 轴旋转变化后的矩阵
     * 
     * Applies rotate transform about X-axis to this matrix
     * @param radian theta Rotation angle in radians.
     * @returns 新的矩阵 (A new matrix)
     */
    applyRotateX(radian: number) {
        return this.preMultiply(new Matrix4().fromRotateX(radian));
    }

    /**
     * 计算在当前矩阵的基础上叠加绕 Y 轴旋转变化后的矩阵
     * 
     * Applies rotate transform about Y-axis to this matrix
     * @param radian theta Rotation angle in radians.
     * @returns 新的矩阵 (A new matrix)
     */
    applyRotateY(radian: number) {
        return this.preMultiply(new Matrix4().fromRotateY(radian));
    }

    /**
     * 计算在当前矩阵的基础上叠加绕 Z 轴旋转变化后的矩阵
     * 
     * Applies rotate transform about Z-axis to this matrix
     * @param radian theta Rotation angle in radians.
     * @returns 新的矩阵 (A new matrix)
     */
    applyRotateZ(radian: number) {
        return this.preMultiply(new Matrix4().fromRotateZ(radian));
    }

    /**
     * 判断矩阵是否相等
     * 
     * Determines whether the current matrix and m are equal
     */
    equals(m: Matrix4) {
        const mArr = m.toArray();
        for (let i = 0; i < MATRIX4_SIZE; i++) {
            if (this.elements[i] !== mArr[i]) {
                return false;
            }
        }
        return true;
    }
}

export { Matrix4 };
