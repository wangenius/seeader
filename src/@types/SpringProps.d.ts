import {ElementProps} from "elementProperty";
import {SpringValues} from "react-spring";
import {PickAnimated} from "@react-spring/web";
import {CSSProperties} from "react";

declare interface SpringProps extends ElementProps {
    spring?: SpringValues<PickAnimated<{}>>;
    style?: CSSProperties;
}