import { Utils, Vector2 } from "../../src";
import { PI } from "../../src/const";


describe('Test for CircleUtil', () => {
    const center = new Vector2(0, 0);

    test('getAngleByPoint', () => {
        const p1 = new Vector2(10, 0);
        const p2 = new Vector2(10 * Math.cos(PI / 4), 10 * Math.sin(PI / 4));
        const p3 = new Vector2(10 * Math.cos(PI / 4), -10 * Math.cos(PI / 4))

        expect(Utils.Circle.getAngleByPoint(center, p1)).toBeCloseTo(0);
        expect(Utils.Circle.getAngleByPoint(center, p2)).toBeCloseTo(PI / 4);
        expect(Utils.Circle.getAngleByPoint(center, p3, true)).toBeCloseTo(PI / 4);
    });

    test('getPointByAngle', () => {
        const radius = 10;

        const p1 = Utils.Circle.getPointByAngle(center, radius, 0);
        const p2 = Utils.Circle.getPointByAngle(center, radius, PI / 4);
        const p3 = Utils.Circle.getPointByAngle(center, radius, PI / 4, true);
        const p4 = Utils.Circle.getPointByAngle(center, radius, PI / 4 * 3, true);
        const p5 = Utils.Circle.getPointByAngle(center, radius, PI / 2);

        expect(p1.x).toBeCloseTo(10, 6);
        expect(p1.y).toBeCloseTo(0, 6);
        expect(p2.x).toBeCloseTo(10 * Math.cos(PI / 4), 6);
        expect(p2.y).toBeCloseTo(10 * Math.sin(PI / 4), 6);
        expect(p3.x).toBeCloseTo(10 * Math.cos(PI / 4), 6);
        expect(p3.y).toBeCloseTo(-10 * Math.sin(PI / 4), 6);
        expect(p4.x).toBeCloseTo(10 * Math.cos(PI / 4 * 3), 6);
        expect(p4.y).toBeCloseTo(-10 * Math.sin(PI / 4 * 3), 6);
        expect(p5.x).toBeCloseTo(0, 6);
        expect(p5.y).toBeCloseTo(10, 6);
    });
});