import { ForwardedRef, forwardRef } from "react";
import { Box } from "@mui/system";
import { useTheme } from "../context/ThemeProvider";
import { ContainerProps } from "elementProperty";
import { sxParser } from "../method/parser";

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
      full,
      vertex,
      verticalCenter,
      horizonCenter,
      proportion,
      ...other
    } = props;
    const newStyle: Style.SXs = [
      {
        display: open ? (flexLayout ? "flex" : "block") : "none",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.875rem",
        overflow: "hidden",
        width: full ? "100%" : "fit-content",
        height: vertex ? "100%" : "fit-content",
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
