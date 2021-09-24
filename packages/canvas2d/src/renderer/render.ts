import { Object2D } from "../object";
import { Circle, DrawCircle } from "../shape";

export function render(object: Object2D, ctx: CanvasRenderingContext2D) {
    // TODO 分别调用不用类型的渲染方法
    // TODO 这样写似乎有点繁琐了
    if (object instanceof Circle) {
        DrawCircle.draw(object, ctx);
    } else if (object instanceof Object2D) {
        object.children.forEach(child => {
            render(child, ctx);
        });
    }
}