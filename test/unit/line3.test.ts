import { Vector3 } from "../../src";
import { Line3 } from "../../src/unit/Line3";

test('constructor', () => {
    const l1 = new Line3();
    expect(l1.start.equals(new Vector3(0, 0, 0))).toEqual(true);
    expect(l1.end.equals(new Vector3(0, 0, 0))).toEqual(true);

    const start = new Vector3(1, 1, 1);
    const end = new Vector3(10, 10, 10);
    const l2 = new Line3(start, end);
    expect(l2.start).not.toBe(start);
    expect(l2.end).not.toBe(end);
    expect(l2.start.equals(start)).toEqual(true);
    expect(l2.end.equals(end)).toEqual(true);
});

test('set', () => {
    const l1 = new Line3();

    const start = new Vector3(1, 1, 1);
    const end = new Vector3(10, 10, 10);
    l1.set(start, end);

    expect(l1.start).not.toBe(start);
    expect(l1.end).not.toBe(end);
    expect(l1.start.equals(start)).toEqual(true);
    expect(l1.end.equals(end)).toEqual(true);

    expect(() => l1.set(new Vector3(1, 1, 1), new Vector3(1, 1, 1))).toThrow(Error);
});

test('set start', () => {
    const l1 = new Line3();

    const start = new Vector3(1, 1, 1);
    l1.setStart(start);

    expect(l1.start).not.toBe(start);
    expect(l1.start.equals(start)).toEqual(true);

    expect(() => l1.setStart(new Vector3(0, 0, 0))).toThrow(Error);
});

test('set end', () => {
    const l1 = new Line3();

    const end = new Vector3(10, 10, 10);
    l1.setEnd(end);

    expect(l1.end).not.toBe(end);
    expect(l1.end.equals(end)).toEqual(true);

    expect(() => l1.setEnd(new Vector3(0, 0, 0))).toThrow(Error);
});

test('length lengthSq', () => {
    const l1 = new Line3(new Vector3(-10, 0, 0), new Vector3(10, 0, 10));
    expect(l1.length).toEqual(Math.sqrt(500));
    expect(l1.lengthSq).toEqual(500);
});

test('direction', () => {
    const l1 = new Line3(new Vector3(-10, 0, 0), new Vector3(10, 0, 0));
    expect(l1.direction.equals(new Vector3(1, 0, 0))).toEqual(true);

    const l2 = new Line3(new Vector3(0, 10, 0), new Vector3(0, -10, 0));
    expect(l2.direction.equals(new Vector3(0, -1, 0))).toEqual(true);
});

test('center', () => {
    const l1 = new Line3(new Vector3(-10, 0, 10), new Vector3(10, 0, 10));
    expect(l1.center.equals(new Vector3(0, 0, 10))).toEqual(true);

    const l2 = new Line3(new Vector3(0, 10, 10), new Vector3(0, -20, -20));
    expect(l2.center.equals(new Vector3(0, -5, -5))).toEqual(true);
});

test('translate', () => {
    const l1 = new Line3(new Vector3(-10, 0, 0), new Vector3(10, 0, 0));
    const l2 = l1.translate(new Vector3(10, 10, 10));
    expect(l2.start.equals(new Vector3(0, 10, 10))).toEqual(true);
    expect(l2.end.equals(new Vector3(20, 10, 10))).toEqual(true);
});


test('isPointOn Line/Segment', () => {
    const l1 = new Line3(new Vector3(-10, 0, 10), new Vector3(10, 0, 10));
    expect(l1.isPointOnLine(new Vector3(-20, 0, 10))).toEqual(true);
    expect(l1.isPointOnSegment(new Vector3(-20, 0, 10))).toEqual(false);
});

test('getProjectedPoint', () => {
    const l1 = new Line3(new Vector3(-10, 0, 10), new Vector3(10, 0, 10));
    const point = new Vector3(-20, 10, 0);
    const point2 = new Vector3(20, 10, 0);
    expect(l1.getProjectedPoint(point)).toEqual(new Vector3(-20, 0, 10));
    expect(l1.getProjectedPoint(point, true)).toEqual(undefined);
    expect(l1.getProjectedPoint(point, true, true)).toEqual(new Vector3(-10, 0, 10));
    expect(l1.getProjectedPoint(point2)).toEqual(new Vector3(20, 0, 10));
    expect(l1.getProjectedPoint(point2, true)).toEqual(undefined);
    expect(l1.getProjectedPoint(point2, true, true)).toEqual(new Vector3(10, 0, 10));
    expect(l1.getProjectedPoint(new Vector3(0, 0, 0), true)).toEqual(new Vector3(0, 0, 10));
});

test('getDistance', () => {
    const l1 = new Line3(new Vector3(-10, 0, 10), new Vector3(10, 0, 10));
    const point = new Vector3(-20, 10, 0);
    expect(l1.getDistance(point)).toEqual(Math.sqrt(200));
    expect(l1.getDistance(point, true)).toEqual(Math.sqrt(300))
});

test('isParallel', () => {
    const l1 = new Line3(new Vector3(-10, 0, 20), new Vector3(10, 0, 20));
    const l2 = new Line3(new Vector3(-10, 10, 5), new Vector3(10, 10, 5));
    expect(l1.isParallel(l2)).toEqual(true);
})

test('isOrthogonal', () => {
    const l1 = new Line3(new Vector3(-10, 0, 0), new Vector3(10, 0, 0));
    const l2 = new Line3(new Vector3(0, 10, 0), new Vector3(0, -10, 0));
    const l3 = new Line3(new Vector3(0, 0, -10), new Vector3(0, 0, 10));
    expect(l1.isOrthogonal(l2)).toEqual(true);
    expect(l1.isOrthogonal(l3)).toEqual(true);
});

test('getAlpha', () => {
    const l1 = new Line3(new Vector3(-10, 0, 0), new Vector3(10, 0, 0));
    expect(l1.getAlpha(new Vector3(0, 0, 0))).toEqual(0.5);
    expect(l1.getAlpha(new Vector3(-20, 0, 0))).toEqual(-0.5);
    expect(l1.getAlpha(new Vector3(20, 0, 0))).toEqual(1.5);
    expect(l1.getAlpha(new Vector3(0, 0, 0), true)).toEqual(0.5);
    expect(l1.getAlpha(new Vector3(-20, 0, 0), true)).toEqual(0);
    expect(l1.getAlpha(new Vector3(20, 0, 0), true)).toEqual(1);
});

test('interpolate', () => {
    const l1 = new Line3(new Vector3(-10, 0, 0), new Vector3(10, 0, 0));
    expect(l1.interpolate(0.5).equals(new Vector3(0, 0, 0))).toEqual(true);
    expect(l1.interpolate(0.2).equals(new Vector3(-6, 0, 0))).toEqual(true);
});