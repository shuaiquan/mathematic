import { Matrix4 } from "."
import { Vector3 } from "../Vector3";
import "../jest";

test('constructor', () => {
    const m1 = new Matrix4();
    expect(m1.equals(Matrix4.Identity)).toEqual(true);

    const m2 = new Matrix4(
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
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
    expect(elements[9]).toEqual(10);
    expect(elements[10]).toEqual(11);
    expect(elements[11]).toEqual(12);
    expect(elements[12]).toEqual(13);
    expect(elements[13]).toEqual(14);
    expect(elements[14]).toEqual(15);
    expect(elements[15]).toEqual(16);
});

test('set', () => {
    const m1 = new Matrix4().set(
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
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
    expect(elements[9]).toEqual(10);
    expect(elements[10]).toEqual(11);
    expect(elements[11]).toEqual(12);
    expect(elements[12]).toEqual(13);
    expect(elements[13]).toEqual(14);
    expect(elements[14]).toEqual(15);
    expect(elements[15]).toEqual(16);
});

test('fromArray', () => {
    const m1 = new Matrix4().fromArray([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
    ]);
    const m2 = new Matrix4(
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
    );

    expect(m1.equals(m2)).toEqual(true);
});

test('fromTranslate', () => {
    const m1 = new Matrix4().fromTranslate(new Vector3(10, -10, 10));
    const elements = m1.toArray();

    expect(elements[3]).toEqual(10);
    expect(elements[7]).toEqual(-10);
    expect(elements[11]).toEqual(10);
});

test('fromScale', () => {
    const m1 = new Matrix4().fromScale(new Vector3(2, -2, 2));
    const elements = m1.toArray();

    expect(elements[0]).toEqual(2);
    expect(elements[5]).toEqual(-2);
    expect(elements[10]).toEqual(2);
});

test('fromRotateX', () => {
    const radian = Math.PI / 4;
    const m1 = new Matrix4().fromRotateX(radian);

    const c = Math.cos(radian);
    const s = Math.sin(radian);

    const elements = m1.toArray();
    expect(elements[5]).toEqual(c);
    expect(elements[6]).toEqual(-s);
    expect(elements[9]).toEqual(s);
    expect(elements[10]).toEqual(c);
});

test('fromRotateY', () => {
    const radian = Math.PI / 4;
    const m1 = new Matrix4().fromRotateY(radian);

    const c = Math.cos(radian);
    const s = Math.sin(radian);

    const elements = m1.toArray();
    expect(elements[0]).toEqual(c);
    expect(elements[2]).toEqual(s);
    expect(elements[8]).toEqual(-s);
    expect(elements[10]).toEqual(c);
});

test('fromRotateZ', () => {
    const radian = Math.PI / 4;
    const m1 = new Matrix4().fromRotateZ(radian);

    const c = Math.cos(radian);
    const s = Math.sin(radian);

    const elements = m1.toArray();
    expect(elements[0]).toEqual(c);
    expect(elements[1]).toEqual(-s);
    expect(elements[4]).toEqual(s);
    expect(elements[5]).toEqual(c);
});

test('copy', () => {
    const m1 = new Matrix4(
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
    );
    const m2 = new Matrix4().copy(m1);
    expect(m1.equals(m2)).toEqual(true);
});


test('clone', () => {
    const m1 = new Matrix4(
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
    );
    const m2 = m1.clone();
    expect(m1).not.toBe(m2);
    expect(m1.equals(m2)).toEqual(true);
});

test('multiply', () => {
    const m1 = new Matrix4(
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
    );
    const m2 = new Matrix4(
        16, 15, 14, 13,
        12, 11, 10, 9,
        8, 7, 6, 5,
        4, 3, 2, 1
    );
    const m = m1.multiply(m2);
    expect(m).not.toBe(m1);
    expect(m.equals(new Matrix4(
        80, 70, 60, 50,
        240, 214, 188, 162,
        400, 358, 316, 274,
        560, 502, 444, 386
    ))).toEqual(true);
});

test('preMultiply', () => {
    const m1 = new Matrix4(
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
    );
    const m2 = new Matrix4(
        16, 15, 14, 13,
        12, 11, 10, 9,
        8, 7, 6, 5,
        4, 3, 2, 1
    );
    const m = m1.preMultiply(m2);
    expect(m).not.toBe(m1);
    expect(m.equals(new Matrix4(
        386, 444, 502, 560,
        274, 316, 358, 400,
        162, 188, 214, 240,
        50, 60, 70, 80
    ))).toEqual(true);
});

test('transpose', () => {
    const m1 = new Matrix4(
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
    );
    const m = m1.transpose();
    expect(m).not.toBe(m1);
    expect(m.equals(new Matrix4(
        1, 5, 9, 13,
        2, 6, 10, 14,
        3, 7, 11, 15,
        4, 8, 12, 16
    ))).toEqual(true);
});

test('invert', () => {
    const m1 = new Matrix4(
        1, 2, 1, 2,
        2, 1, 2, 1,
        1, 2, 2, 2,
        2, 2, 2, 1
    );
    const m = m1.invert();
    expect(m).not.toBe(m1);

    const elements = m.toArray();
    expect(elements[0]).toEqual(2 / 3);
    expect(elements[1]).toEqual(2 / 3);
    expect(elements[2]).toEqual(-1);
    expect(elements[3]).toBeUnsignedZero(0);
    expect(elements[4]).toBeUnsignedZero(0);
    expect(elements[5]).toEqual(-1);
    expect(elements[6]).toBeUnsignedZero(0);
    expect(elements[7]).toEqual(-1);
    expect(elements[8]).toEqual(-1);
    expect(elements[9]).toBeUnsignedZero(0);
    expect(elements[10]).toEqual(-1);
    expect(elements[11]).toBeUnsignedZero(0);
    expect(elements[12]).toEqual(2 / 3);
    expect(elements[13]).toEqual(2 / 3);
    expect(elements[14]).toBeUnsignedZero(0);
    expect(elements[15]).toEqual(-1);

    const m2 = new Matrix4(
        1, 0, 1, -1,
        2, 1, 0, 1,
        -1, 2, 1, 1,
        1, 1, -2, 1
    );
    const n = m2.invert();
    expect(n).not.toBe(m2);

    const ele = n.toArray();
    expect(ele[0]).toEqual(1 / 6);
    expect(ele[1]).toEqual(1 / 3);
    expect(ele[2]).toEqual(-1 / 6);
    expect(ele[3]).toBeUnsignedZero(0);
    expect(ele[4]).toEqual(1 / 2);
    expect(ele[5]).toEqual(-1 / 2);
    expect(ele[6]).toEqual(1 / 2);
    expect(ele[7]).toEqual(1 / 2);
    expect(ele[8]).toBeUnsignedZero(0);
    expect(ele[9]).toEqual(1 / 2);
    expect(ele[10]).toBeUnsignedZero(0);
    expect(ele[11]).toEqual(-1 / 2);
    expect(ele[12]).toEqual(-5 / 6);
    expect(ele[13]).toEqual(1 / 6);
    expect(ele[14]).toEqual(-1 / 6);
    expect(ele[15]).toEqual(-1 / 2);
});

test('determinant', () => {
    const m1 = new Matrix4(
        1, 2, 1, 2,
        2, 1, 2, 1,
        1, 2, 2, 2,
        2, 2, 2, 1
    );
    expect(m1.determinant()).toEqual(3);
});

test('applyTranslate', () => {
    const m1 = new Matrix4(
        1, 2, 1, 2,
        2, 1, 2, 1,
        1, 2, 2, 2,
        2, 2, 2, 1
    );
    const m = m1.applyTranslate(new Vector3(2, 1, 2))
    expect(m).not.toBe(m1);

    const m2 = new Matrix4().fromTranslate(new Vector3(2, 1, 2));
    // applyTranslate 相当于左乘一个平移矩阵
    expect(m.equals(m1.preMultiply(m2))).toEqual(true);
});

test('applyScale', () => {
    const m1 = new Matrix4(
        1, 2, 1, 2,
        2, 1, 2, 1,
        1, 2, 2, 2,
        2, 2, 2, 1
    );
    const m = m1.applyScale(new Vector3(2, 0.5, 1))
    expect(m).not.toBe(m1);

    const m2 = new Matrix4().fromScale(new Vector3(2, 0.5, 1));
    // applyScale 相当于左乘一个缩放矩阵
    expect(m.equals(m1.preMultiply(m2))).toEqual(true);
});

test('equals', () => {
    const m1 = new Matrix4(
        1, 2, 1, 2,
        2, 1, 2, 1,
        1, 2, 2, 2,
        2, 2, 2, 1
    );
    const m2 = new Matrix4(
        1, 2, 1, 2,
        2, 1, 2, 1,
        1, 2, 2, 2,
        2, 2, 2, 1
    );
    expect(m1.equals(m2)).toEqual(true);
});
