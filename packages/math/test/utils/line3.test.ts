import { Line3, Vector3 } from "../../src";
import { Utils } from "../../src/utils";

test('isParallelToXAxis', () => {
    const line = new Line3(new Vector3(0, 0, 0), new Vector3(10, 0, 0));

    expect(Utils.Line3.isParallelToXAxis(line)).toEqual(true);
});

test('isParallelToYAxis', () => {
    const line = new Line3(new Vector3(0, 0, 0), new Vector3(0, 10, 0));

    expect(Utils.Line3.isParallelToYAxis(line)).toEqual(true);
});

test('isParallelToZAxis', () => {
    const line = new Line3(new Vector3(0, 0, 0), new Vector3(0, 0, 10));

    expect(Utils.Line3.isParallelToZAxis(line)).toEqual(true);
});
