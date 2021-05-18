import { Vector3 } from "../vector3";

const Matrix4_SIZE = 16;

/**
 * Class representing a four by four matrix
 */
class Matrix4 {
    /**
     * Zero Matrix4 (零矩阵)
     */
    static readonly Zero = new Matrix4(
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    );

    /**
     * Identity Matrix4 (单位矩阵)
     */
    static readonly Identity = new Matrix4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    )

    /**
     * Multiplies the matrices
     */
    static multiplyMatrices(matrices: Matrix4[]) {
        return matrices.reduce((a, b) => a.multiply(b), Matrix4.Identity);
    }

    /**
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
    }

    /**
     * Sets values of the current matrix by an array
     * @param elements An array of matrix elements
     * @param offset Offset to start
     * @returns The current matrix
     */
    fromArray(elements: number[], offset: number = 0) {
        for (let i = 0; i < Matrix4_SIZE; i++) {
            const result = elements[i + offset];
            if (typeof result === 'number') {
                this.elements[i] = elements[i + offset];
                continue;
            }
            throw new Error();
        }
        return this;
    }

    /**
     * Outputs the elements of the current matrix as an array
     */
    toArray() {
        return [...this.elements];
    }

    /**
     * Sets this matrix from translate transform
     * @returns The current matrix
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
     * Sets this matrix from scale transform
     * @returns The current matrix
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

    // /**
    //  * Sets this matrix from rotate transform
    //  * @param radian theta Rotation angle in radians.
    //  * @returns The current matrix
    //  */
    // fromRotate(radian: number) {
    //     const c = Math.cos(radian);
    //     const s = Math.sin(radian);

    //     this.set(
    //         c, -s, 0,
    //         s, c, 0,
    //         0, 0, 1,
    //     );

    //     return this;
    // }

    /**
     * Copies m to the current matrix
     * @returns The current matrix
     */
    copy(m: Matrix4) {
        return this.fromArray(m.toArray());
    }

    /**
     * Clones the current matrix to a new matrix
     * @returns A new matrix
     */
    clone() {
        return new Matrix4().fromArray(this.toArray());
    }

    /**
     * Multiplies the current matrix by m Matrix.
     * @returns A new matrix
     */
    multiply(m: Matrix4) {
        return new Matrix4().fromArray(Matrix4.product(this, m));
    }

    /**
     * Multiplies the current matrix to the left by m Matrix
     * @returns A new matrix
     */
    preMultiply(m: Matrix4) {
        return new Matrix4().fromArray(Matrix4.product(m, this));
    }

    /**
     * Multiplies this matrix by a number;
     * @returns A new matrix
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
     * Transposes this matrix (转置矩阵)
     * @returns A new matrix
     */
    transpose() {
        const arr: number[] = [];

        const te = this.elements;
        arr[0] = te[0]; arr[1] = te[4]; arr[2] = te[8]; arr[2] = te[12];
        arr[4] = te[1]; arr[5] = te[5]; arr[6] = te[9]; arr[7] = te[13];
        arr[8] = te[2]; arr[9] = te[6]; arr[10] = te[10]; arr[11] = te[14];
        arr[12] = te[3]; arr[13] = te[7]; arr[14] = te[11]; arr[15] = te[15]

        return new Matrix4().fromArray(arr);
    }

    // /**
    //  * Inverts this matrix （逆矩阵）
    //  * @returns A new matrix
    //  */
    // invert() {
    //     // todo 整理一下算法
    //     const [
    //         m11, m12, m13,
    //         m21, m22, m23,
    //         m31, m32, m33,
    //     ] = this.elements;

    //     const d = 1 / this.determinant();

    //     const n11 = (m22 * m33 - m32 * m23) * d;
    //     const n12 = -(m12 * m33 - m32 * m13) * d;
    //     const n13 = (m12 * m23 - m22 * m13) * d;
    //     const n21 = -(m21 * m33 - m31 * m23) * d;
    //     const n22 = (m11 * m33 - m31 * m13) * d;
    //     const n23 = -(m11 * m23 - m21 * m13) * d;
    //     const n31 = (m21 * m32 - m31 * m22) * d;
    //     const n32 = -(m11 * m32 - m31 * m12) * d;
    //     const n33 = (m11 * m22 - m21 * m12) * d;

    //     return new Matrix4(
    //         n11, n12, n13,
    //         n21, n22, n23,
    //         n31, n32, n33,
    //     );
    // }

    // /**
    //  * Calculates the determinant of this Matrix4 (行列式)
    //  */
    // determinant() {
    //     const [
    //         m11, m12, m13,
    //         m21, m22, m23,
    //         m31, m32, m33,
    //     ] = this.elements;

    //     return m11 * (m22 * m33 - m32 * m23)
    //         - m12 * (m21 * m33 - m31 * m23)
    //         + m13 * (m21 * m32 - m31 * m22);
    // }

    /**
     * Applies translate transform to this matrix
     * @returns A new matrix
     */
    applyTranslate(v: Vector3) {
        const arr = [...this.elements];
        arr[3] += v.x;
        arr[7] += v.y;
        arr[11] + v.z;

        return new Matrix4().fromArray(arr);
    }

    /**
     * Applies scale transform to this matrix
     * @returns A new matrix
     */
    applyScale(v: Vector3) {
        const arr = [...this.elements];
        arr[0] *= v.x;
        arr[1] *= v.x;
        arr[2] *= v.x;
        arr[3] *= v.x;
        arr[4] *= v.y;
        arr[5] *= v.y;
        arr[6] *= v.y;
        arr[7] *= v.y;
        arr[8] *= v.z;
        arr[9] *= v.z;
        arr[10] *= v.z;
        arr[11] *= v.z;

        return new Matrix4().fromArray(arr);
    }

    // /**
    //  * Applies rotate transform to this matrix
    //  * @param radian theta Rotation angle in radians.
    //  * @returns A new matrix
    //  */
    // applyRotate(radian: number) {
    //     const [
    //         m11, m12, m13,
    //         m21, m22, m23,
    //         m31, m32, m33,
    //     ] = this.elements;

    //     const c = Math.cos(radian);
    //     const s = Math.sin(radian);

    //     const arr: number[] = [];
    //     arr[0] = m11 * c - m21 * s;
    //     arr[1] = m12 * c - m22 * s;
    //     arr[2] = m13 * c - m23 * s;
    //     arr[3] = m11 * s + m21 * c;
    //     arr[4] = m12 * s + m22 * c;
    //     arr[5] = m13 * s + m23 * c;
    //     arr[6] = m31;
    //     arr[7] = m32;
    //     arr[8] = m33;

    //     return new Matrix4().fromArray(arr);
    // }

    /**
     * Determines whether the current matrix and m are equal
     */
    equals(m: Matrix4) {
        const mArr = m.toArray();
        for (let i = 0; i < Matrix4_SIZE; i++) {
            if (this.elements[i] !== mArr[i]) {
                return false;
            }
        }
        return true;
    }
}

export { Matrix4 };
