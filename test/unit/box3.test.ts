import { Vector3, Box3 } from "../../src";

test('createByPoints', () => {
    const box = Box3.createByPoints([
        new Vector3(-10, 10, -10),
        new Vector3(10, -10, 10),
    ]);
    expect(box.min).toEqual(new Vector3(-10, -10, -10));
    expect(box.max).toEqual(new Vector3(10, 10, 10));
});

test('createByGeometry', () => {
    const box = Box3.createByGeometry(new Vector3(0, 0, 0), new Vector3(10, 10, 10));
    expect(box.min).toEqual(new Vector3(-5, -5, -5));
    expect(box.max).toEqual(new Vector3(5, 5, 5));
});

test('set', () => {
    const box = new Box3();
    box.setMin(new Vector3(-10, -10, -10));
    box.setMax(new Vector3(10, 10, 10));

    expect(box.min).toEqual(new Vector3(-10, -10, -10));
    expect(box.max).toEqual(new Vector3(10, 10, 10));
});

test('points', () => {
    const box = new Box3(new Vector3(-10, -10, -10), new Vector3(10, 10, 10));
    const points = box.points;

    expect(points[0]).toEqual(new Vector3(-10, -10, -10));
    expect(points[1]).toEqual(new Vector3(10, -10, -10));
    expect(points[2]).toEqual(new Vector3(10, 10, -10));
    expect(points[3]).toEqual(new Vector3(-10, 10, -10));
    expect(points[4]).toEqual(new Vector3(-10, -10, 10));
    expect(points[5]).toEqual(new Vector3(10, -10, 10));
    expect(points[6]).toEqual(new Vector3(10, 10, 10));
    expect(points[7]).toEqual(new Vector3(-10, 10, 10));
});

test('size', () => {
    const box = new Box3(new Vector3(-10, -10, -10), new Vector3(10, 10, 10));
    expect(box.size).toEqual(new Vector3(20, 20, 20));
});

test('center', () => {
    const box = new Box3(new Vector3(-10, -10), new Vector3(10, 10));
    expect(box.center).toEqual(new Vector3(0, 0));
});

test('checkValid', () => {
    const box = new Box3(new Vector3(-10, -10, -10), new Vector3(10, 10, 10));
    expect(box.checkValid()).toEqual(true);

    const box3 = new Box3();
    expect(box3.checkValid()).toEqual(false);
});
