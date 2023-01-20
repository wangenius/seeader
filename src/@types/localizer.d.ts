import {ReactNode} from "react";
import * as React from "react";

declare interface LocalizerProps {
    /** @Description 子元素 */
    children?: ReactNode;
    /** @Description 锚元素 鼠标事件和锚元素必须设置一个 */
    anchor?: HTMLElement;
    /** @Description 鼠标事件 */
    event?: React.MouseEvent;
    /** @Description 停靠位置线 */
    base?: "top" | "bottom";
    /** @Description 绝对定位 相对定位 */
    position?: "relative" | "absolute";
}