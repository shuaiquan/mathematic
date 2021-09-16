import { Canvas2D } from "../../canvas";
import { PartialStyleOption, StyleOption } from "./type";

abstract class BaseShape {
    // TODO 这里的判空处理
    protected styleOption: StyleOption;

    protected owner: Canvas2D;

    setStyleOption(styleOption: PartialStyleOption) {
        this.styleOption = { ...this.styleOption, ...styleOption };
    }

    getStyleOption() {
        return this.styleOption;
    }
}

export { BaseShape };