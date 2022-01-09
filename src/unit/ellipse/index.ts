import { IVec2, Vector2 } from "../vector2";

/**
 * 表示二维空间的椭圆
 */
class Ellipse {
    /**
     * 通过焦点和到焦点的距离来生成一个椭圆
     * @param f1 焦点1
     * @param f2 焦点2
     * @param distance 到两个焦点的距离之和
     */
    static createByFoci(f1: Vector2, f2: Vector2, distance: number) {
        const a = distance / 2;
        const c = f1.sub(f2).length / 2;

        const center = f1.add(f2).sub(2);
        const rx = a;
        const ry = Math.sqrt(a * a - c * c);
        const rotate = f2.sub(f1).angle;
        return new Ellipse(center, rx, ry, rotate);
    }

    /**
     * 椭圆圆心
     */
    center: Vector2 = new Vector2(0, 0);

    /**
     * 椭圆横轴半径
     */
    rx: number = 0;

    /**
     * 椭圆纵轴半径
     */
    ry: number = 0;

    /**
     * 椭圆的旋转（弧度）
     * 
     * 默认：0
     */
    rotate: number = 0

    constructor(center: Vector2, rx: number, ry: number, rotate?: number);
    constructor();
    constructor() {
        if (arguments.length >= 3) {
            const [center, rx, ry, rotate] = arguments;
            this.center = new Vector2(center.x, center.y);
            this.rx = rx;
            this.ry = ry;
            if (rotate !== void 0) {
                this.rotate = rotate;
            }
        }
    }

    /**
     * 设置椭圆圆心
     * @param center 圆形
     * @returns 当前 Ellipse
     */
    setCenter(center: Partial<IVec2>) {
        const { x: cx, y: cy } = this.center;
        const { x = cx, y = cy } = center;
        this.center.set(x, y);
        return this;
    }

    /**
     * 设置椭圆横轴半径
     * @param rx 椭圆横轴半径
     * @returns 当前 Ellipse
     */
    setRx(rx: number) {
        this.rx = rx;
        return this;
    }

    /**
     * 设置椭圆纵轴半径
     * @param ry 椭圆纵轴半径
     * @returns 当前 Ellipse
     */
    setRy(ry: number) {
        this.ry = ry;
        return this;
    }

    /**
     * 设置椭圆的旋转
     * @param rotate 椭圆的旋转
     * @returns 当前 Ellipse
     */
    setRotate(rotate: number) {
        this.rotate = rotate;
        return this;
    }

    /**
     * 复制指定椭圆的数据到自身
     * @param ellipse 目标椭圆
     * @returns 当前 Ellipse
     */
    copy(ellipse: Ellipse) {
        const { center, rx, ry, rotate } = ellipse;
        this.center.set(center.x, center.y);
        this.rx = rx;
        this.ry = ry;
        this.rotate = rotate;
        return this;
    }

    /**
     * 复制当前椭圆
     * @returns 新的椭圆
     */
    clone() {
        const { center, rx, ry, rotate } = this;
        return new Ellipse(center, rx, ry, rotate);
    }

    /**
     * 判断点是否椭圆内
     * @param point 目标点
     * 
     * @todo 如何增加误差; 
     * @todo 拆成两个接口 On | Inside ?
     */
    isPointInsideEllipse(point: Vector2) {
        /**
         * 椭圆坐标方程：x^2 / a^2 + y^2 / b^2 = 1 (x, y 指以 center 为原点的坐标系)
         * 
         * 故椭圆内的点需要满足 (x - center.x)^2 / a^2 + (y - center.x)^2 / b^2 <= 1
         */
        const { center, rx, ry } = this;
        const { x, y } = center;
        const { x: px, y: py } = point;
        return Math.pow(px - x, 2) / Math.pow(rx, 2) + Math.pow(py - y, 2) / Math.pow(ry, 2) <= 1;
    }
}

export { Ellipse }