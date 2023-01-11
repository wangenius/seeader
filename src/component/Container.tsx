import { ForwardedRef, forwardRef } from "react";
import { Box } from "@mui/system";
import { useTheme } from "../context/ThemeProvider";
import { ContainerProps } from "elementProperty";
import { sxParser } from "../method/parser";
import { SX } from "../@constant/theme";

export const Container = forwardRef(
  (props: ContainerProps, ref: ForwardedRef<any>) => {
    const { theme } = useTheme();
    const {
      sx,
      children,
      className,
      open = true,
      col,
      id,
      flexLayout,
      overflowY,
      full,
      vertex,
      verticalCenter,
      horizonCenter,
      proportion,
      ...other
    } = props;
    const newStyle: Style.SXs = [
      {
        backgroundColor: "transparent",
        display: open ? (flexLayout ? "flex" : "block") : "none",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        color: theme.default.color?.default,
        fontSize: "0.875rem",
        overflow: "hidden",
        width: full ? "100%" : "fit-content",
        height: vertex ? "100%" : "fit-content",
        flexDirection: col ? "column" : "row",
        flex: proportion,
        boxSizing: "border-box",
        fontFamily: theme.default.font,
      },
      overflowY && SX.overFlowY,
    ];
    return (
      <Box
        {...other}
        ref={ref}
        id={id}
        className={className}
        sx={sxParser(newStyle, sx)}
      >
        {children}
      </Box>
    );
  }
);

export const Hangover = ({ proportion, ...other }: ContainerProps) => (
  <Container proportion={proportion || 1} {...other} />
);

export const Docker = (props: ContainerProps) => {
  return <Container></Container>;
};
