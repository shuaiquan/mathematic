import { Object2D } from "../object";
import { render } from "./render";

/**
 * 渲染器：负责将 Canvas 传递来的数据进行渲染
 */
class Renderer {
    /**
     * 画布 DOM 节点
     */
    private dom: HTMLCanvasElement;

    /**
     * 画布 2D Context
     */
    private ctx: CanvasRenderingContext2D;

    private viewport?: Object2D;

    constructor(dom: HTMLCanvasElement) {
        this.dom = dom;
        this.ctx = dom.getContext('2d');
    }

    /**
     * 渲染
     * @param viewport 
     */
    render(viewport: Object2D) {
        this.viewport = viewport;
        this.renderViewport();
    }

    private renderViewport() {
        if (this.viewport) {
            render(this.viewport);
        }
    }
}

export { Renderer };