import { Matrix3, Vector2 } from "../../src"

test('constructor + equals', () => {
    const m1 = new Matrix3();
    expect(m1.equals(Matrix3.Identity)).toEqual(true);

    const m2 = new Matrix3(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    );
    const elements = m2.toArray();

    expect(elements[0]).toEqual(1);
    expect(elements[1]).toEqual(2);
    expect(elements[2]).toEqual(3);
    expect(elements[3]).toEqual(4);
    expect(elements[4]).toEqual(5);
    expect(elements[5]).toEqual(6);
    expect(elements[6]).toEqual(7);
    expect(elements[7]).toEqual(8);
    expect(elements[8]).toEqual(9);
});

test('set', () => {
    const m1 = new Matrix3().set(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    );
    const elements = m1.toArray();

    expect(elements[0]).toEqual(1);
    expect(elements[1]).toEqual(2);
    expect(elements[2]).toEqual(3);
    expect(elements[3]).toEqual(4);
    expect(elements[4]).toEqual(5);
    expect(elements[5]).toEqual(6);
    expect(elements[6]).toEqual(7);
    expect(elements[7]).toEqual(8);
    expect(elements[8]).toEqual(9);
});

test('fromArray', () => {
    const m1 = new Matrix3().fromArray([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
    ]);
    const m2 = new Matrix3(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    );

    expect(m1.equals(m2)).toEqual(true);
});

test('fromTranslate', () => {
    const m1 = new Matrix3().fromTranslate(new Vector2(10, -10));
    const elements = m1.toArray();

    expect(elements[2]).toEqual(10);
    expect(elements[5]).toEqual(-10);
});

test('fromScale', () => {
    const m1 = new Matrix3().fromScale(new Vector2(2, -2));
    const elements = m1.toArray();

    expect(elements[0]).toEqual(2);
    expect(elements[4]).toEqual(-2);
});

test('fromRotate', () => {
    const radian = Math.PI / 4;
    const m1 = new Matrix3().fromRotate(radian);

    const c = Math.cos(radian);
    const s = Math.sin(radian);

    const elements = m1.toArray();
    expect(elements[0]).toBeCloseTo(c, 6);
    expect(elements[1]).toBeCloseTo(-s, 6);
    expect(elements[3]).toBeCloseTo(s, 6);
    expect(elements[4]).toBeCloseTo(c, 6);
});

test('copy', () => {
    const m1 = new Matrix3(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    );
    const m2 = new Matrix3().copy(m1);
    expect(m1.equals(m2)).toEqual(true);
});


test('clone', () => {
    const m1 = new Matrix3(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    );
    const m2 = m1.clone();
    expect(m1).not.toBe(m2);
    expect(m1.equals(m2)).toEqual(true);
});

test('multiply', () => {
    const m1 = new Matrix3(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    );
    const m2 = new Matrix3(
        9, 8, 7,
        6, 5, 4,
        3, 2, 1
    );
    const m = m1.multiply(m2);
    expect(m).not.toBe(m1);
    expect(m.equals(new Matrix3(
        30, 24, 18,
        84, 69, 54,
        138, 114, 90
    ))).toEqual(true);
});

test('preMultiply', () => {
    const m1 = new Matrix3(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    );
    const m2 = new Matrix3(
        9, 8, 7,
        6, 5, 4,
        3, 2, 1
    );
    const m = m1.preMultiply(m2);
    expect(m).not.toBe(m1);
    expect(m.equals(new Matrix3(
        90, 114, 138,
        54, 69, 84,
        18, 24, 30
    ))).toEqual(true);
});

test('preMultiply', () => {
    const m1 = new Matrix3(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    );
    const m = m1.multiplyScalar(2);
    expect(m).not.toBe(m1);
    expect(m.equals(new Matrix3(
        2, 4, 6,
        8, 10, 12,
        14, 16, 18
    ))).toEqual(true);
});

test('transpose', () => {
    const m1 = new Matrix3(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    );
    const m = m1.transpose();
    expect(m).not.toBe(m1);
    expect(m.equals(new Matrix3(
        1, 4, 7,
        2, 5, 8,
        3, 6, 9
    ))).toEqual(true);
});

test('invert', () => {
    const m1 = new Matrix3(
        1, 2, 1,
        2, 1, 2,
        1, 1, 2
    );
    const m = m1.invert();
    expect(m).not.toBe(m1);

    const elements = m.toArray();
    expect(elements[0]).toBeCloseTo(0, 6);
    expect(elements[1]).toBeCloseTo(1, 6);
    expect(elements[2]).toBeCloseTo(-1, 6);
    expect(elements[3]).toBeCloseTo(2 / 3, 6);
    expect(elements[4]).toBeCloseTo(-1 / 3, 6);
    expect(elements[5]).toBeCloseTo(0, 6);
    expect(elements[6]).toBeCloseTo(-1 / 3, 6);
    expect(elements[7]).toBeCloseTo(-1 / 3, 6);
    expect(elements[8]).toBeCloseTo(1, 6);

    const m2 = new Matrix3(
        1, 0, 1,
        2, 1, 0,
        -1, 2, 1
    );
    const n = m2.invert();
    expect(n).not.toBe(m2);

    const ele = n.toArray();
    expect(ele[0]).toBeCloseTo(1 / 6, 6);
    expect(ele[1]).toBeCloseTo(1 / 3, 6);
    expect(ele[2]).toBeCloseTo(-1 / 6, 6);
    expect(ele[3]).toBeCloseTo(-1 / 3, 6);
    expect(ele[4]).toBeCloseTo(1 / 3, 6);
    expect(ele[5]).toBeCloseTo(1 / 3, 6);
    expect(ele[6]).toBeCloseTo(5 / 6, 6);
    expect(ele[7]).toBeCloseTo(-1 / 3, 6);
    expect(ele[8]).toBeCloseTo(1 / 6, 6);
});

test('determinant', () => {
    const m1 = new Matrix3(
        1, 2, 1,
        2, 1, 2,
        1, 1, 2
    );
    expect(m1.determinant()).toEqual(-3);

    const m2 = new Matrix3(
        1, 0, 1,
        2, 1, 0,
        -1, 2, 1
    );
    expect(m2.determinant()).toEqual(6);
});

test('applyTranslate', () => {
    const m1 = new Matrix3(
        1, 2, 1,
        2, 1, 2,
        1, 1, 2
    );
    const m = m1.applyTranslate(new Vector2(2, 1))
    expect(m).not.toBe(m1);

    const m2 = new Matrix3().fromTranslate(new Vector2(2, 1));
    // applyTranslate 相当于左乘一个平移矩阵
    expect(m.equals(m1.preMultiply(m2))).toEqual(true);
});

test('applyScale', () => {
    const m1 = new Matrix3(
        1, 2, 1,
        2, 1, 2,
        1, 1, 2
    );
    const m = m1.applyScale(new Vector2(2, 0.5))
    expect(m).not.toBe(m1);

    const m2 = new Matrix3().fromScale(new Vector2(2, 0.5));
    // applyScale 相当于左乘一个缩放矩阵
    expect(m.equals(m1.preMultiply(m2))).toEqual(true);
});

test('applyRotate', () => {
    const m1 = new Matrix3(
        1, 2, 1,
        2, 1, 2,
        1, 1, 2
    );
    const m = m1.applyRotate(Math.PI);
    expect(m).not.toBe(m1);

    const m2 = new Matrix3().fromRotate(Math.PI);
    // applyRotate 相当于左乘一个旋转矩阵
    expect(m.equals(m1.preMultiply(m2))).toEqual(true);
});

test('equals', () => {
    const m1 = new Matrix3(
        1, 2, 1,
        2, 1, 2,
        1, 1, 2
    );
    const m2 = new Matrix3(
        1, 2, 1,
        2, 1, 2,
        1, 1, 2
    );
    expect(m1.equals(m2)).toEqual(true);
});
