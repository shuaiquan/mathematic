import { Vector2 } from "../../src";

test('Vector2 constructor', () => {
    const v1 = new Vector2();

    expect(v1.x).toBe(0);
    expect(v1.y).toBe(0);

    const v2 = new Vector2(100, 100);

    expect(v2.x).toBe(100);
    expect(v2.y).toBe(100);

    const v3 = new Vector2({ x: 100 });

    expect(v3.x).toBe(100);
    expect(v3.y).toBe(0);

    const v4 = new Vector2({ y: 100 });

    expect(v4.x).toBe(0);
    expect(v4.y).toBe(100);

    const v5 = new Vector2({ x: 100, y: 100 });

    expect(v5.x).toBe(100);
    expect(v5.y).toBe(100);
});

test('Vector2 set', () => {
    const v = new Vector2();

    v.set(100);
    expect(v.x).toBe(100);
    expect(v.y).toBe(0);

    v.set(undefined, 100);
    expect(v.x).toBe(100);
    expect(v.y).toBe(100);

    v.set({ x: 10 });
    expect(v.x).toBe(10);
    expect(v.y).toBe(100);

    v.set({ y: 10 });
    expect(v.x).toBe(10);
    expect(v.y).toBe(10);

    v.setX(1);
    expect(v.x).toBe(1);
    expect(v.y).toBe(10);

    v.setY(1);
    expect(v.x).toBe(1);
    expect(v.y).toBe(1);

    v.set(0, 0);
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
});

test('Vector2 copy', () => {
    const v1 = new Vector2();
    expect(v1.copy(new Vector2(100, 100))).toBe(v1);
    expect(v1.x).toBe(100);
    expect(v1.y).toBe(100);
});

test('Vector2 clone', () => {
    const v1 = new Vector2(100, 10);
    const v2 = v1.clone();
    expect(v1).not.toBe(v2);
    expect(v2.x).toBe(v1.x);
    expect(v2.y).toBe(v1.y);
});

test('Vector2 length', () => {
    const v1 = new Vector2(10, 0);
    const v2 = new Vector2(10, 10);
    const v3 = new Vector2(0, 10);
    const v4 = new Vector2(-10, 10);
    const v5 = new Vector2(-10, 0);
    const v6 = new Vector2(-10, -10);
    const v7 = new Vector2(0, -10);
    const v8 = new Vector2(10, -10);
    expect(v1.length).toBe(10);
    expect(v2.length).toBe(Math.sqrt(2) * 10);
    expect(v3.length).toBe(10);
    expect(v4.length).toBe(Math.sqrt(2) * 10);
    expect(v5.length).toBe(10);
    expect(v6.length).toBe(Math.sqrt(2) * 10);
    expect(v7.length).toBe(10);
    expect(v8.length).toBe(Math.sqrt(2) * 10);
});

test('Vector2 lengthSq', () => {
    const v1 = new Vector2(10, 0);
    const v2 = new Vector2(10, 10);
    const v3 = new Vector2(0, 10);
    const v4 = new Vector2(-10, 10);
    const v5 = new Vector2(-10, 0);
    const v6 = new Vector2(-10, -10);
    const v7 = new Vector2(0, -10);
    const v8 = new Vector2(10, -10);
    expect(v1.lengthSq).toBe(100);
    expect(v2.lengthSq).toBe(200);
    expect(v3.lengthSq).toBe(100);
    expect(v4.lengthSq).toBe(200);
    expect(v5.lengthSq).toBe(100);
    expect(v6.lengthSq).toBe(200);
    expect(v7.lengthSq).toBe(100);
    expect(v8.lengthSq).toBe(200);
});

test('Vector2 angle', () => {
    const PI = Math.PI;
    const v1 = new Vector2(10, 0);
    const v2 = new Vector2(10, 10);
    const v3 = new Vector2(0, 10);
    const v4 = new Vector2(-10, 10);
    const v5 = new Vector2(-10, 0);
    const v6 = new Vector2(-10, -10);
    const v7 = new Vector2(0, -10);
    const v8 = new Vector2(10, -10);
    expect(v1.angle).toBe(0);
    expect(v2.angle).toBe(PI / 4);
    expect(v3.angle).toBe(PI / 2);
    expect(v4.angle).toBe(PI / 4 * 3);
    expect(v5.angle).toBe(PI);
    expect(v6.angle).toBe(PI / 4 * 5);
    expect(v7.angle).toBe(PI / 2 * 3);
    expect(v8.angle).toBe(PI / 4 * 7);
});

test('Vector2 add', () => {
    const v1 = new Vector2(1, 1);

    const v2 = v1.add(1);
    expect(v2).not.toBe(v1);
    expect(v2.x).toBe(2);
    expect(v2.y).toBe(2);

    const v3 = v1.add({ x: 1 });
    expect(v3).not.toBe(v1);
    expect(v3.x).toBe(2);
    expect(v3.y).toBe(1);

    const v4 = v1.add({ y: 1 });
    expect(v4).not.toBe(v1);
    expect(v4.x).toBe(1);
    expect(v4.y).toBe(2);

    const v5 = v1.add({ x: 1, y: 2 });
    expect(v5).not.toBe(v1);
    expect(v5.x).toBe(2);
    expect(v5.y).toBe(3);
});

test('Vector2 sub', () => {
    const v1 = new Vector2(10, 10);

    const v2 = v1.sub(1);
    expect(v2).not.toBe(v1);
    expect(v2.x).toBe(9);
    expect(v2.y).toBe(9);

    const v3 = v1.sub({ x: 1 });
    expect(v3).not.toBe(v1);
    expect(v3.x).toBe(9);
    expect(v3.y).toBe(10);

    const v4 = v1.sub({ y: 1 });
    expect(v4).not.toBe(v1);
    expect(v4.x).toBe(10);
    expect(v4.y).toBe(9);

    const v5 = v1.sub({ x: 1, y: 2 });
    expect(v5).not.toBe(v1);
    expect(v5.x).toBe(9);
    expect(v5.y).toBe(8);
});

test('Vector2 multiply', () => {
    const v1 = new Vector2(1, 2);

    const v2 = v1.multiply(2);
    expect(v2).not.toBe(v1);
    expect(v2.x).toBe(2);
    expect(v2.y).toBe(4);

    const v3 = v1.multiply({ x: 2 });
    expect(v3).not.toBe(v1);
    expect(v3.x).toBe(2);
    expect(v3.y).toBe(2);

    const v4 = v1.multiply({ y: 2 });
    expect(v4).not.toBe(v1);
    expect(v4.x).toBe(1);
    expect(v4.y).toBe(4);

    const v5 = v1.multiply({ x: 1, y: 2 });
    expect(v5).not.toBe(v1);
    expect(v5.x).toBe(1);
    expect(v5.y).toBe(4);
});

test('Vector2 divide', () => {
    const v1 = new Vector2(10, 10);

    const v2 = v1.divide(2);
    expect(v2).not.toBe(v1);
    expect(v2.x).toBe(5);
    expect(v2.y).toBe(5);

    const v3 = v1.divide({ x: 2 });
    expect(v3).not.toBe(v1);
    expect(v3.x).toBe(5);
    expect(v3.y).toBe(10);

    const v4 = v1.divide({ y: 2 });
    expect(v4).not.toBe(v1);
    expect(v4.x).toBe(10);
    expect(v4.y).toBe(5);

    const v5 = v1.divide({ x: 2, y: 5 });
    expect(v5).not.toBe(v1);
    expect(v5.x).toBe(5);
    expect(v5.y).toBe(2);
});

test('Vector2 inverse', () => {
    const v1 = new Vector2(10, 0);
    const v2 = new Vector2(10, 10);
    const v3 = new Vector2(0, 10);
    const v4 = new Vector2(-10, 10);
    const v5 = new Vector2(-10, 0);
    const v6 = new Vector2(-10, -10);
    const v7 = new Vector2(0, -10);
    const v8 = new Vector2(10, -10);
    expect(v1.inverse()).toEqual(new Vector2(-10, 0));
    expect(v2.inverse()).toEqual(new Vector2(-10, -10));
    expect(v3.inverse()).toEqual(new Vector2(0, -10));
    expect(v4.inverse()).toEqual(new Vector2(10, -10));
    expect(v5.inverse()).toEqual(new Vector2(10, 0));
    expect(v6.inverse()).toEqual(new Vector2(10, 10));
    expect(v7.inverse()).toEqual(new Vector2(0, 10));
    expect(v8.inverse()).toEqual(new Vector2(-10, 10));
});

test('Vector2 normalize', () => {
    const v1 = new Vector2(10, 0);
    const v2 = new Vector2(10, 10);
    const v3 = new Vector2(0, 10);
    const v4 = new Vector2(-10, 10);
    const v5 = new Vector2(-10, 0);
    const v6 = new Vector2(-10, -10);
    const v7 = new Vector2(0, -10);
    const v8 = new Vector2(10, -10);
    expect(v1.normalize()).toEqual(new Vector2(1, 0));
    expect(v2.normalize()).toEqual(new Vector2(1 / Math.sqrt(2), 1 / Math.sqrt(2)));
    expect(v3.normalize()).toEqual(new Vector2(0, 1));
    expect(v4.normalize()).toEqual(new Vector2(-1 / Math.sqrt(2), 1 / Math.sqrt(2)));
    expect(v5.normalize()).toEqual(new Vector2(-1, 0));
    expect(v6.normalize()).toEqual(new Vector2(-1 / Math.sqrt(2), -1 / Math.sqrt(2)));
    expect(v7.normalize()).toEqual(new Vector2(0, -1));
    expect(v8.normalize()).toEqual(new Vector2(1 / Math.sqrt(2), -1 / Math.sqrt(2)));
});

test('Vector2 lerp', () => {
    const v = new Vector2(0, 0);
    expect(v.lerp(new Vector2(100, 100), 0.3)).toEqual(new Vector2(30, 30));
    expect(v.lerp(new Vector2(100, 100), -0.3)).toEqual(new Vector2(-30, -30));
    expect(v.lerp(new Vector2(100, 100), 1.2)).toEqual(new Vector2(120, 120));
});

test('Vector2 dot', () => {
    expect((new Vector2(1, 0)).dot(new Vector2(0, 1))).toBe(0);
    expect((new Vector2(5, 10)).dot(new Vector2(3, 2))).toBe(35);
    expect((new Vector2(-2, 6)).dot(new Vector2(4, 5))).toBe(22);
});

test('Vector2 cross', () => {
    expect((new Vector2(1, 0)).cross(new Vector2(0, 1))).toBe(1);
    expect((new Vector2(5, 10)).cross(new Vector2(3, 2))).toBe(-20);
    expect((new Vector2(-2, 6)).cross(new Vector2(4, 5))).toBe(-34);
});

test('Vector2 equals', () => {
    expect((new Vector2(100, 100)).equals(new Vector2(100, 100))).toBe(true);
    expect((new Vector2(-5, 5)).equals(new Vector2(-5, 5))).toBe(true);
    expect((new Vector2(10, -1)).equals(new Vector2(9, -2))).toBe(false);
});

test('Vector2 isParallel', () => {
    expect((new Vector2(0, 100)).isParallel(new Vector2(0, 200))).toBe(true);
    expect((new Vector2(100, 0)).isParallel(new Vector2(-200, 0))).toBe(true);
    expect((new Vector2(100, 100)).isParallel(new Vector2(-10, -10))).toBe(true);
});

test('Vector2 isVertical', () => {
    expect((new Vector2(0, 100)).isVertical(new Vector2(10, 0))).toBe(true);
    expect((new Vector2(100, 100)).isVertical(new Vector2(-5, 5))).toBe(true);
    expect((new Vector2(-5, -5)).isVertical(new Vector2(20, -20))).toBe(true);
});