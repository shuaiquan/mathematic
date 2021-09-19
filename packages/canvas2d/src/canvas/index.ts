
/**
 * TODO 
 * 1. 去支持一个全局默认样式的设置
 */

import { Render } from '../render';
import { BaseShape, PartialStyleOption } from '../shape';
import { DEFAULT_CANVAS_OPTION } from './const';
import { CanvasOption } from './type';

class Canvas2D {
    /**
     * 渲染器
     */
    private render: Render;

    /**
     * 被渲染的目标画布
     */
    private element: HTMLCanvasElement;

    private shapes: BaseShape[] = [];

    constructor(option: CanvasOption) {
        this.element = this.createCanvas(option);

        this.render = new Render(this.element);
    }

    /**
     * 获取被渲染的目标画布
     */
    getCanvas() {
        return this.element;
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
