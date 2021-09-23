import { Object2D } from "../../object";
import { PartialStyleOption, StyleOption } from "./type";

abstract class BaseShape extends Object2D {
    // TODO 这里的判空处理
    protected styleOption: StyleOption;

    setStyleOption(styleOption: PartialStyleOption) {
        this.styleOption = { ...this.styleOption, ...styleOption };
    }

    getStyleOption() {
        return this.styleOption;
    }
}

export { BaseShape };