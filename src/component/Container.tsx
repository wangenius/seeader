import {
  ForwardedRef,
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
} from "react";
import { Box } from "@mui/system";
import { voidFn } from "../method";
import clsx from "clsx";
import { Spring } from "./Spring";
import { useSpring } from "@react-spring/web";

/** 默认父组件重渲染后，子组件同时渲染*/
export const Container = memo(
  forwardRef((props: Props.Base, ref: ForwardedRef<any>) => {
    const {
      sx,
      children,
      cls,
      open = true,
      id,
      index,
      onClick = voidFn,
      onContextMenu = voidFn,
      ...other
    } = props;
    const Ref = useRef<HTMLElement>();

    /** @Description 暴露组件 */
    useImperativeHandle(ref, () => Ref.current);

    return open ? (
      <Box
        ref={Ref}
        id={id}
        className={cls}
        sx={sx}
        onClick={(event) => onClick(event, index)}
        onContextMenu={(event) => onContextMenu(event, index)}
        {...other}
      >
        {children}
      </Box>
    ) : null;
  })
);

export const Hangover = forwardRef(
  ({ cls, ...other }: Props.Base, ref) => (
    <Container cls={clsx("Hangover", cls)} {...other} ref={ref} />
  )
);

export const Card = memo(
  forwardRef((props: Props.Spring, ref) => {
    const spring = useSpring({
      from: {
        scale: 0,
      },
      to: {
        scale: 1,
      },
    });
    return (
      <Spring
        cls={props.cls}
        open={props.open}
        spring={spring}
        style={props.style}
      >
        {props.children}
      </Spring>
    );
  })
);
