import { IVec2, Vector2 } from "../vector2";

/**
 * 表示二维空间的椭圆
 */
class Ellipse {
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
}

export { Ellipse }