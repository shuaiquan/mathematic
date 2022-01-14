import { Matrix4, Vector3 } from "../../src";

test('Vector3 constructor', () => {
    const v1 = new Vector3();

    expect(v1.x).toBe(0);
    expect(v1.y).toBe(0);
    expect(v1.z).toBe(0);

    const v2 = new Vector3(100, 10, 1);

    expect(v2.x).toBe(100);
    expect(v2.y).toBe(10);
    expect(v2.z).toBe(1);

    const v3 = new Vector3({ x: 100 });

    expect(v3.x).toBe(100);
    expect(v3.y).toBe(0);
    expect(v3.z).toBe(0);

    const v4 = new Vector3({ y: 100 });

    expect(v4.x).toBe(0);
    expect(v4.y).toBe(100);
    expect(v4.z).toBe(0);

    const v5 = new Vector3({ x: 100, z: 100 });

    expect(v5.x).toBe(100);
    expect(v5.y).toBe(0);
    expect(v5.z).toBe(100);
});

test('Vector3 set', () => {
    const v = new Vector3();

    v.set(100);
    expect(v.x).toBe(100);
    expect(v.y).toBe(100);
    expect(v.z).toBe(100);

    v.set({ x: 10 });
    expect(v.x).toBe(10);
    expect(v.y).toBe(100);
    expect(v.z).toBe(100);

    v.set({ y: 10 });
    expect(v.x).toBe(10);
    expect(v.y).toBe(10);
    expect(v.z).toBe(100);

    v.set({ x: 100, z: 10 });
    expect(v.x).toBe(100);
    expect(v.y).toBe(10);
    expect(v.z).toBe(10);

    v.setX(1);
    expect(v.x).toBe(1);
    expect(v.y).toBe(10);
    expect(v.z).toBe(10);

    v.setY(1);
    expect(v.x).toBe(1);
    expect(v.y).toBe(1);
    expect(v.z).toBe(10);

    v.setZ(-1);
    expect(v.x).toBe(1);
    expect(v.y).toBe(1);
    expect(v.z).toBe(-1);
});

test('Vector3 copy', () => {
    const v1 = new Vector3();
    expect(v1.copy(new Vector3(100, 10, 1))).toBe(v1);
    expect(v1.x).toBe(100);
    expect(v1.y).toBe(10);
    expect(v1.z).toBe(1)
});

test('Vector3 clone', () => {
    const v1 = new Vector3(100, 10, 1);
    const v2 = v1.clone();
    expect(v1).not.toBe(v2);
    expect(v2.x).toBe(v1.x);
    expect(v2.y).toBe(v1.y);
    expect(v2.z).toBe(v1.z);
});

test('Vector3 length', () => {
    const v1 = new Vector3(1, 1, 1);
    const v2 = new Vector3(-1, 1, -1);
    expect(v1.length).toBe(Math.sqrt(3));
    expect(v2.length).toBe(Math.sqrt(3));
});

test('Vector3 lengthSq', () => {
    const v1 = new Vector3(1, 1, 1);
    const v2 = new Vector3(-1, 1, -1);
    expect(v1.lengthSq).toBe(3);
    expect(v2.lengthSq).toBe(3);
});

test('Vector3 add', () => {
    const v1 = new Vector3(1, 1, 1);

    const v2 = v1.add(1);
    expect(v2).not.toBe(v1);
    expect(v2.x).toBe(2);
    expect(v2.y).toBe(2);
    expect(v2.z).toBe(2);

    const v3 = v1.add({ x: 1, y: 2, z: 3 });
    expect(v3).not.toBe(v1);
    expect(v3.x).toBe(2);
    expect(v3.y).toBe(3);
    expect(v3.z).toBe(4);

    expect(v1.add(undefined)).toEqual(v1);
});

test('Vector3 sub', () => {
    const v1 = new Vector3(10, 10, 10);

    const v2 = v1.sub(1);
    expect(v2).not.toBe(v1);
    expect(v2.x).toBe(9);
    expect(v2.y).toBe(9);
    expect(v2.z).toBe(9);

    const v3 = v1.sub({ x: 1, y: 2, z: 3 });
    expect(v3).not.toBe(v1);
    expect(v3.x).toBe(9);
    expect(v3.y).toBe(8);
    expect(v3.z).toBe(7);

    expect(v1.sub(undefined)).toEqual(v1);
});

test('Vector3 multiply', () => {
    const v1 = new Vector3(1, 2, 3);

    const v2 = v1.multiply(2);
    expect(v2).not.toBe(v1);
    expect(v2.x).toBe(2);
    expect(v2.y).toBe(4);
    expect(v2.z).toBe(6);

    const v3 = v1.multiply({ x: 1, y: 2, z: 3 });
    expect(v3).not.toBe(v1);
    expect(v3.x).toBe(1);
    expect(v3.y).toBe(4);
    expect(v3.z).toBe(9);

    expect(v1.multiply(undefined)).toEqual(v1);
});

test('Vector3 divide', () => {
    const v1 = new Vector3(24, 6, 4);

    const v2 = v1.divide(2);
    expect(v2).not.toBe(v1);
    expect(v2.x).toBe(12);
    expect(v2.y).toBe(3);
    expect(v2.z).toBe(2);

    const v3 = v1.divide({ x: 6, y: 3, z: 4 });
    expect(v3).not.toBe(v1);
    expect(v3.x).toBe(4);
    expect(v3.y).toBe(2);
    expect(v3.z).toBe(1);

    expect(v1.divide(undefined)).toEqual(v1);
});

test('appMatrix4', () => {
    const v = new Vector3(1, 2, 3);
    const m = new Matrix4(
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
    );
    expect(v.applyMatrix4(m)).toEqual(new Vector3(18, 46, 74));
});

test('Vector3 inverse', () => {
    const v1 = new Vector3(10, -10, 10);
    expect(v1.inverse()).toEqual(new Vector3(-10, 10, -10))
});

test('Vector3 normalize', () => {
    const v1 = new Vector3(1, 1, 1);
    const v2 = new Vector3(-2, 1, -2);
    expect(v1.normalize()).toEqual(new Vector3(1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)));
    expect(v2.normalize()).toEqual(new Vector3(-2 / 3, 1 / 3, -2 / 3));
});

test('Vector3 dot', () => {
    expect((new Vector3(1, 0, 1)).dot(new Vector3(0, 1, 0))).toBe(0);
    expect((new Vector3(1, 1, 0)).dot(new Vector3(2, 0, 1))).toBe(2);
    expect((new Vector3(-2, -1, 1)).dot(new Vector3(1, -1, -2))).toBe(-3);
});

test('Vector3 cross', () => {
    expect((new Vector3(1, 2, 3)).cross(new Vector3(-1, 3, 2))).toEqual(new Vector3(-5, -5, 5));
});

test('Vector3 equals', () => {
    expect((new Vector3(100, 100, 100)).equals(new Vector3(100, 100, 100))).toBe(true);
    expect((new Vector3(-5, 5, 1)).equals(new Vector3(-5, 5, 1))).toBe(true);
    expect((new Vector3(10, -1, 3)).equals(new Vector3(9, -2, 3))).toBe(false);
});

test('Vector3 isParallel', () => {
    expect((new Vector3(0, 100, 0)).isParallel(new Vector3(0, 200, 0))).toBe(true);
    expect((new Vector3(100, 0, 0)).isParallel(new Vector3(-200, 0, 0))).toBe(true);
    expect((new Vector3(100, 0, 100)).isParallel(new Vector3(-10, 0, -10))).toBe(true);
    expect((new Vector3(0, 0, 0)).isParallel(new Vector3(0, -10, 0))).toBe(true);
});

test('Vector3 isVertical', () => {
    expect((new Vector3(0, 1, 0)).isOrthogonal(new Vector3(1, 0, 0))).toBe(true);
    expect((new Vector3(-1, 0, 0)).isOrthogonal(new Vector3(0, 0, -1))).toBe(true);
});