import { Object2D } from "../../object";
import { DEFAULT_STYLE_OPTION } from "./const";
import { PartialStyleOption, StyleOption } from "./type";

abstract class BaseShape extends Object2D {
    /**
     * 样式配置
     */
    protected styleOption: StyleOption = DEFAULT_STYLE_OPTION;

    constructor(styleOption?: PartialStyleOption) {
        super();
        if (styleOption) {
            this.updateStyleOption(styleOption);
        }
    }

    /**
     * 更新图形的 styleOption
     * 
     * @param styleOption 样式配置
     */
    updateStyleOption(styleOption: PartialStyleOption) {
        this.styleOption = { ...this.styleOption, ...styleOption };
    }

    /**
     * 获取图形的样式配置
     */
    getStyleOption() {
        return this.styleOption;
    }

    /**
     * 获取图形的 Path
     */
    abstract getPath(): Path2D;
}

export { BaseShape };