import { forwardRef } from "react";
import { ElementProps, ElementRef, voidFn } from "../interface";
import { Spring } from "./Spring";
import { Box, SxProps } from "@mui/system";
import { useTheme } from "../context/ThemeProvider";
import { Styles, sxAssigner } from "../style/sx";

interface ContainerProps extends ElementProps {
  flex?: boolean;
  proportion?: number;
  full?: boolean;
  col?: boolean;
  verticalCenter?: boolean;
  horizonCenter?: boolean;
}

/** @overview base container*/
export const Container = forwardRef((props: ContainerProps, ref) => {
  const { theme } = useTheme();
  const {
    sx,
    children,
    className,
    open = true,
    col,
    flex,
    full,
    proportion,
    ...other
  } = props;
  const newStyle: Styles = [
    {
      display: open ? (flex ? "flex" : "block") : "none",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      width: full ? "100%" : "fit-content",
      flexDirection: col ? "column" : "row",
      flex: proportion,
      boxSizing: "border-box",
      fontFamily: theme.typography.fontFamily,
    },
  ];
  return (
    <Box
      {...other}
      ref={ref}
      className={className}
      sx={sxAssigner(newStyle, sx)}
    >
      {children}
    </Box>
  );
});

/**@overview flex布局填充*/
export const AirDrop = forwardRef((props: ContainerProps, ref) => {
  const { proportion, sx, children, ...other } = props;
  return (
    <Container
      proportion={proportion || 1}
      ref={ref}
      sx={sxAssigner([{ flex: proportion || 1, height: "100%" }], sx)}
      {...other}
    >
      {children}
    </Container>
  );
});

/**
 * @overview 二级容器 供各种自定义操作使用
 * */
export const Docker = forwardRef((props: ContainerProps, ref) => {
  const { children, onClick, sx, open = true, ...other } = props;

  const sty: Styles = [
    {
      borderRadius: 4,
      width: "100%",
    },
  ];

  return (
    <Spring open={open} onExit={voidFn} onEnter={voidFn}>
      <Container
        sx={sxAssigner(sty, sx)}
        {...other}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </Container>
    </Spring>
  );
});
