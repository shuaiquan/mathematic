import { Object2D } from '../object';
import { Renderer } from '../render';
import { PartialStyleOption } from '../shape';
import { DEFAULT_CANVAS_OPTION } from './const';
import { CanvasOption } from './type';

class Canvas2D {
    /**
     * 渲染器
     */
    private render: Renderer;

    /**
     * 被渲染的目标画布
     */
    private element: HTMLCanvasElement;

    /**
     * 默认视口：当前要渲染的全部元素都会被添加这个视口下
     */
    private viewPort: Object2D = new Object2D();

    constructor(option: CanvasOption) {
        this.element = this.createCanvas(option);

        this.render = new Renderer(this.element);
    }

    /**
     * 获取被渲染的目标画布
     */
    getCanvas() {
        return this.element;
    }

    /**
     * 增加要渲染的元素
     * @param child 目标元素
     */
    add(child: Object2D | Object2D[]) {
        this.viewPort.addChild(child);
    }

    /**
     * 移除要渲染的元素
     * @param child 目标元素
     */
    remove(child: Object2D | Object2D[]) {
        this.viewPort.removeChild(child);
    }

    setGlobalStyleOption(styleOption: PartialStyleOption) {
        // todo
    }

    private createCanvas(option: CanvasOption) {
        const { element, width, height } = option;

        let canvas = typeof element === 'string' ? document.getElementById(element) as HTMLCanvasElement : element;
        if (canvas && canvas.tagName !== 'CANVAS') {
            // 用户传入了有效的画布DOM，仅可以根据用户传入的宽高进行设置
            return (
                width && canvas.setAttribute('width', `${width}`),
                height && canvas.setAttribute('height', `${height}`),
                canvas
            );
        }

        // 需要创建画布对象DOM，优先使用用户传入的宽高进行设置
        canvas = document.createElement('canvas');
        canvas.setAttribute('width', `${width || DEFAULT_CANVAS_OPTION.width}`);
        canvas.setAttribute('height', `${height || DEFAULT_CANVAS_OPTION.height}`);
        return canvas;
    }
}

export { Canvas2D };
