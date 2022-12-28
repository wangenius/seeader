import { animated, useSpring } from "@react-spring/web";
import { forwardRef, ReactNode } from "react";
import { ElementProps } from "../interface";

export interface AnimatedProps extends ElementProps {
  onExit: () => void;
  onEnter: () => void;
  delay?: number | undefined;
  open: boolean;
  from?: Function | {};
  to?: Function | {};
  config?: {};
  pause?: boolean;
  loop?: boolean | Function;
}

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
  } = props;
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
    <animated.div ref={ref} style={style}>
      {children as ReactNode}
    </animated.div>
  );
});
