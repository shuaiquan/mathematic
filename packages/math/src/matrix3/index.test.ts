import { Matrix3 } from "."
import { Vector2 } from "../vector2";

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
    expect(elements[0]).toEqual(c);
    expect(elements[1]).toEqual(-s);
    expect(elements[3]).toEqual(s);
    expect(elements[4]).toEqual(c);
});
