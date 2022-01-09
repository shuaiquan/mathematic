import { Line2, Vector2 } from "../../src";
import { Utils } from "../../src/utils";

test('isLineIntersectLine', () => {
    const l1 = new Line2(new Vector2(0, 0), new Vector2(10, 0));
    const l2 = new Line2(new Vector2(0, 10), new Vector2(10, 10));
    const l3 = new Line2(new Vector2(-10, 0), new Vector2(-10, 10));
    const l4 = new Line2(new Vector2(0, 0), new Vector2(0, 10));

    expect(Utils.Line2.isLineIntersectLine(l1, l2)).toEqual(false);
    expect(Utils.Line2.isLineIntersectLine(l1, l3)).toEqual(true);
    expect(Utils.Line2.isLineIntersectLine(l1, l4)).toEqual(true);
    expect(Utils.Line2.isLineIntersectLine(l2, l3)).toEqual(true);
    expect(Utils.Line2.isLineIntersectLine(l2, l4)).toEqual(true);
    expect(Utils.Line2.isLineIntersectLine(l3, l4)).toEqual(false);
});

test('isLineIntersectSegment', () => {
    const l1 = new Line2(new Vector2(0, 0), new Vector2(10, 0));
    const l2 = new Line2(new Vector2(0, 10), new Vector2(10, 10));
    const l3 = new Line2(new Vector2(-10, 0), new Vector2(-10, 10));

    expect(Utils.Line2.isLineIntersectSegment(l1, l2)).toEqual(false);
    expect(Utils.Line2.isLineIntersectSegment(l1, l3)).toEqual(true);
    expect(Utils.Line2.isLineIntersectSegment(l3, l1)).toEqual(false);
    expect(Utils.Line2.isLineIntersectSegment(l2, l3)).toEqual(true);
    expect(Utils.Line2.isLineIntersectSegment(l3, l2)).toEqual(false);
});

test('isSegmentIntersectSegment', () => {
    const l1 = new Line2(new Vector2(0, 0), new Vector2(10, 0));
    const l2 = new Line2(new Vector2(0, 10), new Vector2(10, 10));
    const l3 = new Line2(new Vector2(-10, 0), new Vector2(-10, 10));
    const l4 = new Line2(new Vector2(0, 0), new Vector2(0, 10));

    expect(Utils.Line2.isSegmentIntersectSegment(l1, l2)).toEqual(false);
    expect(Utils.Line2.isSegmentIntersectSegment(l1, l3)).toEqual(false);
    expect(Utils.Line2.isSegmentIntersectSegment(l1, l4)).toEqual(true);
    expect(Utils.Line2.isSegmentIntersectSegment(l2, l3)).toEqual(false);
    expect(Utils.Line2.isSegmentIntersectSegment(l2, l4)).toEqual(true);
    expect(Utils.Line2.isSegmentIntersectSegment(l3, l4)).toEqual(false);
});

test('lineIntersectLine', () => {
    const l1 = new Line2(new Vector2(0, 0), new Vector2(10, 0));
    const l2 = new Line2(new Vector2(0, 10), new Vector2(10, 10));
    const l3 = new Line2(new Vector2(-10, 0), new Vector2(-10, 10));
    const l4 = new Line2(new Vector2(0, 0), new Vector2(0, 10));

    expect(Utils.Line2.lineIntersectLine(l1, l2)).toEqual(undefined);
    expect(Utils.Line2.lineIntersectLine(l1, l3).equals(new Vector2(-10, 0))).toEqual(true);
    expect(Utils.Line2.lineIntersectLine(l1, l4).equals(new Vector2(0, 0))).toEqual(true);
    expect(Utils.Line2.lineIntersectLine(l2, l3).equals(new Vector2(-10, 10))).toEqual(true);
    expect(Utils.Line2.lineIntersectLine(l2, l4).equals(new Vector2(0, 10))).toEqual(true);
    expect(Utils.Line2.lineIntersectLine(l3, l4)).toEqual(undefined);
});

test('lineIntersectSegment', () => {
    const l1 = new Line2(new Vector2(0, 0), new Vector2(10, 0));
    const l2 = new Line2(new Vector2(0, 10), new Vector2(10, 10));
    const l3 = new Line2(new Vector2(-10, 0), new Vector2(-10, 10));

    expect(Utils.Line2.lineIntersectSegment(l1, l2)).toEqual(undefined);
    expect(Utils.Line2.lineIntersectSegment(l1, l3).equals(new Vector2(-10, 0))).toEqual(true);
    expect(Utils.Line2.lineIntersectSegment(l3, l1)).toEqual(undefined);
    expect(Utils.Line2.lineIntersectSegment(l2, l3).equals(new Vector2(-10, 10))).toEqual(true);
    expect(Utils.Line2.lineIntersectSegment(l3, l2)).toEqual(undefined);
});

test('segmentIntersectSegment', () => {
    const l1 = new Line2(new Vector2(0, 0), new Vector2(10, 0));
    const l2 = new Line2(new Vector2(0, 10), new Vector2(10, 10));
    const l3 = new Line2(new Vector2(-10, 0), new Vector2(-10, 10));
    const l4 = new Line2(new Vector2(0, 0), new Vector2(0, 10));

    expect(Utils.Line2.segmentIntersectSegment(l1, l2)).toEqual(undefined);
    expect(Utils.Line2.segmentIntersectSegment(l1, l3)).toEqual(undefined);
    expect(Utils.Line2.segmentIntersectSegment(l1, l4).equals(new Vector2(0, 0))).toEqual(true);
    expect(Utils.Line2.segmentIntersectSegment(l2, l3)).toEqual(undefined);
    expect(Utils.Line2.segmentIntersectSegment(l2, l4).equals(new Vector2(0, 10))).toEqual(true);
    expect(Utils.Line2.segmentIntersectSegment(l3, l4)).toEqual(undefined);
});