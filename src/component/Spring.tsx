import {animated} from "@react-spring/web";
import React, {forwardRef, memo, ReactNode} from "react";
import {fn} from "@/method";

/** @Description Spring 动画组件 */
export const Spring = memo(
  forwardRef((props: Props.Spring, ref: any) => {
    const { children, spring, cs, lc = fn, rc = fn, value, ...other } = props;
    return (
      <animated.div
        ref={ref}
        onClick={(event) => {lc(event, value);}}
        onContextMenu={(event) => {rc(event, value);}}
        className={cs}
        style={spring}
        {...other}
      >
        {children as ReactNode}
      </animated.div>
    );
  })
);
