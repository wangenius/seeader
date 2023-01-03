import { animated, useSpring } from "@react-spring/web";
import { forwardRef, ReactNode } from "react";
import { styled } from "@mui/system";
import { AnimatedProps } from "elementProperty";

export const Spring = forwardRef((props: AnimatedProps, ref: any) => {
  const {
    children,
    onExit,
    delay,
    loop = false,
    open,
    onEnter,
    from = {
      opacity: 0,
    },
    to = {
      opacity: open ? 1 : 0,
    },
    config = { duration: 200 },
    cssString = "",
  } = props;

  const AnimatedContainer = styled(animated.div)`
    ${cssString}
  `;

  const style = useSpring({
    from: from,
    to: to,
    config: config,
    delay: delay,
    loop: loop,
    onRest: () => {
      if (!open) onExit();
    },
    onStart: () => {
      onEnter();
    },
  });
  return (
    <AnimatedContainer ref={ref} style={style}>
      {children as ReactNode}
    </AnimatedContainer>
  );
});

export const SpringContainer = forwardRef(
  (props: { [propsName: string]: any }, ref: any) => {
    const { style, children, ...other } = props;
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children as ReactNode}
      </animated.div>
    );
  }
);
