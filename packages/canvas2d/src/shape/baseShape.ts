import { Canvas2D } from "../canvas";
import { PartialStyleOption, StyleOption } from "./type";

abstract class BaseShape {
    protected styleOption: StyleOption;

    protected owner: Canvas2D;

    setStyleOption(styleOption: PartialStyleOption) {
        this.styleOption = { ...this.styleOption, ...styleOption };
    }
}

export { BaseShape };