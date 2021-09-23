
/**
 * 负责将 Canvas 传递来的数据进行渲染
 */

class Renderer {
    private dom: HTMLCanvasElement;

    private ctx: CanvasRenderingContext2D;

    constructor(dom: HTMLCanvasElement) {
        this.dom = dom;
        this.ctx = dom.getContext('2d');
    }
}

export { Renderer };