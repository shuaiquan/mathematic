import { Vector2, Box2 } from "../../src";

test('createByPoints', () => {
    const box = Box2.createByPoints([
        new Vector2(-10, 10),
        new Vector2(10, -10),
    ]);
    expect(box.min).toEqual(new Vector2(-10, -10));
    expect(box.max).toEqual(new Vector2(10, 10));
});

test('createByGeometry', () => {
    const box = Box2.createByGeometry(new Vector2(0, 0), new Vector2(10, 10));
    expect(box.min).toEqual(new Vector2(-5, -5));
    expect(box.max).toEqual(new Vector2(5, 5));
});

test('set', () => {
    const box = new Box2();
    box.setMin(new Vector2(-10, -10));
    box.setMax(new Vector2(10, 10));

    expect(box.min.equals(new Vector2(-10, -10))).toEqual(true);
    expect(box.max.equals(new Vector2(10, 10))).toEqual(true);
});

test('points', () => {
    const box = new Box2(new Vector2(-10, -10), new Vector2(10, 10));
    const points = box.points;

    expect(points[0]).toEqual(new Vector2(-10, -10));
    expect(points[1]).toEqual(new Vector2(10, -10));
    expect(points[2]).toEqual(new Vector2(10, 10));
    expect(points[3]).toEqual(new Vector2(-10, 10));
});

test('size', () => {
    const box = new Box2(new Vector2(-10, -10), new Vector2(10, 10));
    expect(box.size).toEqual(new Vector2(20, 20));
});

test('center', () => {
    const box = new Box2(new Vector2(-10, -10), new Vector2(10, 10));
    expect(box.center).toEqual(new Vector2(0, 0));
});

test('checkValid', () => {
    const box = new Box2(new Vector2(-10, -10), new Vector2(10, 10));
    expect(box.checkValid()).toEqual(true);

    const box2 = new Box2();
    expect(box2.checkValid()).toEqual(false);
});
