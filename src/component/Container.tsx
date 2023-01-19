import {
  ForwardedRef,
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
} from "react";
import { Box } from "@mui/system";
import { ContainerProps } from "elementProperty";
import { voidFn } from "../method/general";
import clsx from "clsx";

/*默认父组件重渲染后，子组件同时渲染*/
export const Container = memo(
  forwardRef((props: ContainerProps, ref: ForwardedRef<any>) => {
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

export const Hangover = forwardRef(({ cls, ...other }: ContainerProps, ref) => (
  <Container cls={clsx("Hangover", cls)} {...other} ref={ref} />
));
