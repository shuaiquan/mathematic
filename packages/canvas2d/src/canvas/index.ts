class Canvas2D {
    private originTarget: string | HTMLCanvasElement;

    private isValid: boolean = false;

    constructor(target: string | HTMLCanvasElement) {
        this.originTarget = target;

        const canvas = typeof target === 'string' ? document.getElementById(target) : target;
        if (!(canvas instanceof HTMLCanvasElement)) {
            console.error('Canvas2D: 目标元素不是 Canvas 节点、无法绘制');
            return;
        } else if (!canvas.getContext) {
            console.error('Canvas2D: 当前浏览器不支持 Canvas 2d 绘制');
            return;
        }

        this.isValid = true;
    }
}

export { Canvas2D };
