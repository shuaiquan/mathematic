import { Circle, Utils, Vector2 } from "../../src";
import { NumberUtil } from "../../src/common/number";

describe('Test for Circle', () => {
    const center = new Vector2(0, 0);
    const radius = 10;
    let circle = new Circle();

    beforeEach(() => {
        circle = new Circle(center, radius);
    });

    test('constructor', () => {
        const c = new Circle(new Vector2(10, 10), radius);

        expect(circle.center).toEqual(center);
        expect(circle.radius).toEqual(radius);
        expect(c.center).toEqual(new Vector2(10, 10));
        expect(c.radius).toEqual(radius);
    });

    test('setCenter', () => {
        const c = new Circle();
        c.setCenter(new Vector2(10, 10));
        expect(c.center).toEqual(new Vector2(10, 10));
    });

    test('setRadius', () => {
        circle.setRadius(5);
        expect(circle.radius).toEqual(5);
    });

    test('clone', () => {
        const c = circle.clone();
        expect(c).not.toBe(circle);
        expect(c.center).not.toBe(center);
        expect(c.center).toEqual(center);
        expect(c.radius).toEqual(radius);
    });

    test('translate', () => {
        const c = circle.translate(new Vector2(5, 10));
        expect(c).not.toBe(circle);
        expect(c.center).toEqual(new Vector2(5, 10));
    });

    test('isPointOnCircle', () => {
        expect(circle.isPointOnCircle(new Vector2(10, 0))).toEqual(true);
        expect(circle.isPointOnCircle(new Vector2(-10, 0))).toEqual(true);
        expect(circle.isPointOnCircle(new Vector2(0, 10.5))).toEqual(false);
        expect(circle.isPointOnCircle(new Vector2(0, 9.5))).toEqual(false);
    });

    test('isPointInsideCircle', () => {
        expect(circle.isPointInsideCircle(new Vector2(10, 0))).toEqual(false);
        expect(circle.isPointInsideCircle(new Vector2(-10, 0), true)).toEqual(true);
        expect(circle.isPointInsideCircle(new Vector2(0, 10.5))).toEqual(false);
        expect(circle.isPointInsideCircle(new Vector2(0, 9.5))).toEqual(true);
    });

    test('toPoints', () => {
        const points = circle.toPoints(100);
        expect(points.length).toEqual(100);

        points.forEach((p) => {
            NumberUtil.isEqual(Utils.Vector2.distance(p, center), radius);
        });
    });

    test('createByThreePoint', () => {
        const p1 = new Vector2(-10, 0);
        const p2 = new Vector2(0, 10);
        const p3 = new Vector2(10, 0);

        const c = Circle.createByThreePoint(p1, p2, p3);
        const { x, y } = c.center;  // 有负号的 0
        expect(x).toBeCloseTo(0, 6);
        expect(y).toBeCloseTo(0, 6);
        expect(c.radius).toEqual(10);
    })
});