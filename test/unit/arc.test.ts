import { Arc, Utils, Vector2 } from "../../src";
import { NumberUtil } from "../../src/common/number";
import { PI } from "../../src/const";


describe('Test for Arc', () => {
    const center = new Vector2(0, 0);
    const radius = 10;
    const startAngle = PI / 4;
    const endAngle = PI / 4 * 3;
    const isClockwise = false
    let arc = new Arc(center, radius, startAngle, endAngle, isClockwise);

    beforeEach(() => {
        arc = new Arc(center, radius, startAngle, endAngle, isClockwise)
    });

    test('constructor', () => {
        expect(arc.center).toEqual(center);
        expect(arc.radius).toEqual(radius);
        expect(arc.startRadian).toEqual(startAngle);
        expect(arc.endRadian).toEqual(endAngle);
        expect(arc.isClockwise).toEqual(isClockwise);
    });

    test('set', () => {
        const a = arc.clone();
        a.setCenter(new Vector2(10, 10));
        a.setRadius(5);
        a.setStartRadian(PI / 2);
        a.setEndRadian(PI);
        a.setClockwise(true);
        expect(a.center.x).toEqual(10);
        expect(a.center.y).toEqual(10);
        expect(a.radius).toEqual(5);
        expect(a.startRadian).toEqual(PI / 2);
        expect(a.endRadian).toEqual(PI);
        expect(a.isClockwise).toEqual(true);
    })

    test('midRadian', () => {
        expect(arc.midRadian).toBeCloseTo(PI / 2);

        const a2 = new Arc(center, radius, endAngle, startAngle, false);
        expect(a2.midRadian).toBeCloseTo(PI / 2 * 3, 6);
    });

    test('midPoint', () => {
        const { x, y } = arc.midPoint;
        expect(x).toBeCloseTo(0, 6);
        expect(y).toBeCloseTo(radius, 6);

        const a2 = new Arc(center, radius, endAngle, startAngle, false);
        expect(a2.midPoint.x).toBeCloseTo(0, 6);
        expect(a2.midPoint.y).toBeCloseTo(-radius, 6);
    });

    test('radian', () => {
        expect(arc.radian).toBeCloseTo(PI / 2);

        const a2 = new Arc(center, radius, endAngle, startAngle, false);
        expect(a2.radian).toBeCloseTo(PI / 2 * 3, 6);
    });

    test('startPoint', () => {
        const { x, y } = arc.startPoint;
        expect(x).toBeCloseTo(radius * Math.cos(startAngle), 6);
        expect(y).toBeCloseTo(radius * Math.sin(startAngle), 6);
    });

    test('endPoint', () => {
        const { x, y } = arc.endPoint;
        expect(x).toBeCloseTo(radius * Math.cos(endAngle), 6);
        expect(y).toBeCloseTo(radius * Math.sin(endAngle), 6);
    });

    test('clone', () => {
        const a = arc.clone();
        expect(a).not.toBe(arc);
        expect(a.center).toEqual(center);
        expect(a.radius).toEqual(radius);
        expect(a.startRadian).toEqual(startAngle);
        expect(a.endRadian).toEqual(endAngle);
        expect(a.isClockwise).toEqual(isClockwise);
    });

    test('translate', () => {
        const a = arc.translate(new Vector2(10, 10));
        expect(a.center.x).toEqual(10);
        expect(a.center.y).toEqual(10);
    });

    test('rotate', () => {
        const a = arc.rotate(PI / 4);
        expect(a.startRadian).toEqual(PI / 2);
        expect(a.endRadian).toEqual(PI);
    });

    test('isPointOnArc', () => {
        expect(arc.isPointOnArc(new Vector2(0, 10))).toEqual(true);
        expect(arc.isPointOnArc(new Vector2(radius * Math.cos(startAngle), radius * Math.sin(startAngle)))).toEqual(true);
        expect(arc.isPointOnArc(new Vector2(radius * Math.cos(endAngle), radius * Math.sin(endAngle)))).toEqual(true);
        expect(arc.isPointOnArc(new Vector2(radius * Math.cos(startAngle - 0.1), radius * Math.sin(startAngle - 0.1)))).toEqual(false);
        expect(arc.isPointOnArc(new Vector2(radius * Math.cos(endAngle + 0.1), radius * Math.sin(endAngle + 0.1)))).toEqual(false);
    });

    test('isPointInsideArc', () => {
        expect(arc.isPointInsideArc(new Vector2(0, 9.5))).toEqual(true);
        expect(arc.isPointInsideArc(new Vector2(0, 10))).toEqual(false);
        expect(arc.isPointInsideArc(new Vector2(0, 10), true)).toEqual(true);
    });

    test('isAngleInsideArc', () => {
        expect(arc.isAngleInsideArc(PI / 2)).toEqual(true);
        expect(arc.isAngleInsideArc(PI / 5)).toEqual(false);
        expect(arc.isAngleInsideArc(PI / 5 * 4)).toEqual(false);
    });

    test('toPoints', () => {
        const points = arc.toPoints(50);
        expect(points.length).toEqual(50);

        points.forEach((p) => {
            NumberUtil.isEqual(Utils.Vector2.distance(p, center), radius);
        });
    });

    test('createByThreePoint', () => {
        const startPoint = Utils.Circle.getPointByAngle(center, radius, startAngle);
        const endPoint = Utils.Circle.getPointByAngle(center, radius, endAngle);
        const arcPoint = new Vector2(0, radius);
        const a = Arc.createByThreePoint(startPoint, arcPoint, endPoint, isClockwise);

        // todo ???????????? toEqualCloseTo ?????????????????????????????? x, y ????????????
        expect(a.center.x).toBeCloseTo(center.x, 6);
        expect(a.center.y).toBeCloseTo(center.y, 6);
        expect(a.radius).toBeCloseTo(radius, 6);
        expect(a.startRadian).toBeCloseTo(startAngle, 6);
        expect(a.endRadian).toBeCloseTo(endAngle, 6);
        expect(a.isClockwise).toEqual(isClockwise);
    });

    test('createByBoundaryPoint', () => {
        const startPoint = Utils.Circle.getPointByAngle(center, radius, startAngle);
        const endPoint = Utils.Circle.getPointByAngle(center, radius, endAngle);
        const a = Arc.createByBoundaryPoint(center, startPoint, endPoint, isClockwise);

        expect(a.center).toEqual(center);
        expect(a.radius).toEqual(radius);
        expect(a.startRadian).toEqual(startAngle);
        expect(a.endRadian).toEqual(endAngle);
        expect(a.isClockwise).toEqual(isClockwise);
    });
});