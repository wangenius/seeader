import {animated} from "@react-spring/web";
import React, {forwardRef, memo, ReactNode} from "react";
import {styled} from "@mui/system";
import _ from "lodash";

/** @Description Spring 动画组件 */
export const Spring = memo(
  forwardRef((props: Props.Spring, ref: any) => {
    const { children, style, spring, cls, onClick, ...other } = props;
    const AnimatedContainer = styled(animated.div)(_.defaultsDeep(style, {}));
    return (
      <AnimatedContainer
        ref={ref}
        onClick={onClick}
        className={cls}
        style={spring}
        {...other}
      >
        {children as ReactNode}
      </AnimatedContainer>
    );
  })
);
