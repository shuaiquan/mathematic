import { Vector2 } from "../../src";
import { PI } from "../../src/const";
import { Line2, LineSide } from "../../src/unit/line2";

test('constructor', () => {
    const l1 = new Line2();
    expect(l1.start.equals(new Vector2(0, 0))).toEqual(true);
    expect(l1.end.equals(new Vector2(0, 0))).toEqual(true);

    const start = new Vector2(1, 1);
    const end = new Vector2(10, 10);
    const l2 = new Line2(start, end);
    expect(l2.start).not.toBe(start);
    expect(l2.end).not.toBe(end);
    expect(l2.start.equals(start)).toEqual(true);
    expect(l2.end.equals(end)).toEqual(true);
});

test('set', () => {
    const l1 = new Line2();

    const start = new Vector2(1, 1);
    const end = new Vector2(10, 10);
    l1.set(start, end);

    expect(l1.start).not.toBe(start);
    expect(l1.end).not.toBe(end);
    expect(l1.start.equals(start)).toEqual(true);
    expect(l1.end.equals(end)).toEqual(true);

    expect(() => l1.set(new Vector2(1, 1), new Vector2(1, 1))).toThrow(Error);
});

test('set start', () => {
    const l1 = new Line2();

    const start = new Vector2(1, 1);
    l1.setStart(start);

    expect(l1.start).not.toBe(start);
    expect(l1.start.equals(start)).toEqual(true);

    expect(() => l1.setStart(new Vector2(0, 0))).toThrow(Error);
});

test('set end', () => {
    const l1 = new Line2();

    const end = new Vector2(10, 10);
    l1.setEnd(end);

    expect(l1.end).not.toBe(end);
    expect(l1.end.equals(end)).toEqual(true);

    expect(() => l1.setEnd(new Vector2(0, 0))).toThrow(Error);
});

test('length lengthSq', () => {
    const l1 = new Line2(new Vector2(-10, 0), new Vector2(10, 0));
    expect(l1.length).toEqual(20);
    expect(l1.lengthSq).toEqual(400);

    const l2 = new Line2(new Vector2(0, 10), new Vector2(0, -10));
    expect(l2.length).toEqual(20);
    expect(l2.lengthSq).toEqual(400);
});

test('direction', () => {
    const l1 = new Line2(new Vector2(-10, 0), new Vector2(10, 0));
    expect(l1.direction.equals(new Vector2(1, 0))).toEqual(true);

    const l2 = new Line2(new Vector2(0, 10), new Vector2(0, -10));
    expect(l2.direction.equals(new Vector2(0, -1))).toEqual(true);
});

test('angle', () => {
    const l1 = new Line2(new Vector2(-10, 0), new Vector2(10, 0));
    expect(l1.angle).toEqual(0);

    const l2 = new Line2(new Vector2(0, 10), new Vector2(0, -10));
    expect(l2.angle).toEqual(PI * 3 / 2);
});

test('center', () => {
    const l1 = new Line2(new Vector2(-10, 0), new Vector2(10, 0));
    expect(l1.center.equals(new Vector2(0, 0))).toEqual(true);

    const l2 = new Line2(new Vector2(0, 10), new Vector2(0, -20));
    expect(l2.center.equals(new Vector2(0, -5))).toEqual(true);
});

test('left&right direction', () => {
    const l1 = new Line2(new Vector2(-10, 0), new Vector2(10, 0));
    expect(l1.leftDirection.equals(new Vector2(0, 1))).toEqual(true);
    expect(l1.rightDirection.equals(new Vector2(0, -1))).toEqual(true);
});

test('translate', () => {
    const l1 = new Line2(new Vector2(-10, 0), new Vector2(10, 0));
    const l2 = l1.translate(new Vector2(10, 10));
    expect(l2.start.equals(new Vector2(0, 10))).toEqual(true);
    expect(l2.end.equals(new Vector2(20, 10))).toEqual(true);
});

test('getSide', () => {
    const l1 = new Line2(new Vector2(-10, 0), new Vector2(10, 0));
    expect(l1.getSide(new Vector2(0, 1))).toEqual(LineSide.Left);
    expect(l1.getSide(new Vector2(0, -1))).toEqual(LineSide.Right);
    expect(l1.getSide(new Vector2(0, 0))).toEqual(LineSide.On);
});

test('isPointOn Line/Segment', () => {
    const l1 = new Line2(new Vector2(-10, 0), new Vector2(10, 0));
    expect(l1.isPointOnLine(new Vector2(-20, 0))).toEqual(true);
    expect(l1.isPointOnSegment(new Vector2(-20, 0))).toEqual(false);
});

test('getProjectedPoint', () => {
    const l1 = new Line2(new Vector2(-10, 0), new Vector2(10, 0));
    const point = new Vector2(-20, 10);
    const point2 = new Vector2(20, 5);
    expect(l1.getProjectedPoint(point)).toEqual(new Vector2(-20, 0));
    expect(l1.getProjectedPoint(point, true)).toEqual(undefined);
    expect(l1.getProjectedPoint(point, true, true)).toEqual(new Vector2(-10, 0));
    expect(l1.getProjectedPoint(point2)).toEqual(new Vector2(20, 0));
    expect(l1.getProjectedPoint(point2, true)).toEqual(undefined);
    expect(l1.getProjectedPoint(point2, true, true)).toEqual(new Vector2(10, 0));
});

test('getDistance', () => {
    const l1 = new Line2(new Vector2(-10, 0), new Vector2(10, 0));
    const point = new Vector2(-20, 10);
    expect(l1.getDistance(point)).toEqual(10);
    expect(l1.getDistance(point, true)).toEqual(Math.sqrt(200))
});

test('isParallel', () => {
    const l1 = new Line2(new Vector2(-10, 0), new Vector2(10, 0));
    const l2 = new Line2(new Vector2(-10, 10), new Vector2(10, 10));
    expect(l1.isParallel(l2)).toEqual(true);
})

test('isOrthogonal', () => {
    const l1 = new Line2(new Vector2(-10, 0), new Vector2(10, 0));
    const l2 = new Line2(new Vector2(0, 10), new Vector2(0, -10));
    expect(l1.isOrthogonal(l2)).toEqual(true);
});

test('isHorizontal isVertical', () => {
    const l1 = new Line2(new Vector2(-10, 0), new Vector2(10, 0));
    const l2 = new Line2(new Vector2(0, 10), new Vector2(0, -10));
    expect(l1.isHorizontal()).toEqual(true);
    expect(l1.isVertical()).toEqual(false);
    expect(l2.isHorizontal()).toEqual(false);
    expect(l2.isVertical()).toEqual(true);
});

test('getAlpha', () => {
    const l1 = new Line2(new Vector2(-10, 0), new Vector2(10, 0));
    expect(l1.getAlpha(new Vector2(0, 0))).toEqual(0.5);
    expect(l1.getAlpha(new Vector2(-20, 0))).toEqual(-0.5);
    expect(l1.getAlpha(new Vector2(20, 0))).toEqual(1.5);
    expect(l1.getAlpha(new Vector2(-20, 0), true)).toEqual(0);
    expect(l1.getAlpha(new Vector2(0, 0), true)).toEqual(0.5);
    expect(l1.getAlpha(new Vector2(20, 0), true)).toEqual(1);
});

test('interpolate', () => {
    const l1 = new Line2(new Vector2(-10, 0), new Vector2(10, 0));
    expect(l1.interpolate(0.5).equals(new Vector2(0, 0))).toEqual(true);
    expect(l1.interpolate(0.2).equals(new Vector2(-6, 0))).toEqual(true);
});