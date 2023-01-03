import * as React from "react";
import { forwardRef, ReactNode } from "react";
import { Hangover, Container } from "./Container";
import { useTheme } from "../context/ThemeProvider";
import { SxProps, Theme } from "@mui/system";
import { voidFn } from "../method/general";
import { ButtonProperty, ElementProps } from "elementProperty";
import { sxParser } from "../method/parser";

export const Button = forwardRef((props: ButtonProperty, ref) => {
  const { theme } = useTheme();
  const {
    children,
    href,
    onClick,
    onMouseEnter,
    tip,
    startIcon = undefined,
    endIcon = undefined,
    loading = false,
    label = "",
    sx,
    small = true,
    ...other
  } = props;

  const style: Style.SXs = [
    {
      height: small ? 24 : 32,
      maxWidth: 300,
      width: "fit-content",
      position: "relative",
      whiteSpace: "nowrap",
      cursor: loading ? "not-allowed" : "pointer",
      userSelect: "none",
      borderRadius: 2,
      backgroundColor: theme.palette.button.default,
      color: theme.palette.buttonChar.default,
      transition: "all 200ms ease",
      px: 1,
      mx: 0.2,
      ":hover": {
        backgroundColor: theme.palette.button.hover,
        color: theme.palette.buttonChar.hover,
      },
      "*": {
        pointerEvents: "none",
      },
    },
  ];
  return (
    <Container
      ref={ref}
      flexLayout={true}
      sx={sxParser(style, sx)}
      {...other}
      onMouseEnter={onMouseEnter}
      onClick={loading ? voidFn : onClick}
    >
      <Hangover
        flexLayout
        sx={{ justifyContent: "left" }}
        open={startIcon !== undefined}
      >
        {startIcon}
      </Hangover>
      <Container
        sx={{
          whiteSpace: "nowrap",
          fontSize: small ? "0.825rem" : "0.875rem",
        }}
      >
        {label || children}
      </Container>
      <Hangover
        flexLayout
        sx={{ justifyContent: "left" }}
        open={endIcon !== undefined}
      >
        {endIcon}
      </Hangover>
    </Container>
  );
});

interface SvgIconPrototype extends JSX.Element {}

interface IconButtonProps extends ElementProps {
  children?: SvgIconPrototype;
  icon?: SvgIconPrototype | string;
  SvgSx?: SxProps<Theme>;
  size?: number;
}
export const IconButton = forwardRef((props: IconButtonProps, ref) => {
  const { theme } = useTheme();
  const { children, onClick, icon, sx, size, SvgSx, ...other } = props;

  return (
    <Container
      flexLayout
      sx={sxParser(
        [
          {
            width: 24,
            height: 24,
            cursor: "pointer",
            borderRadius: 3,
            mx: 0.4,
            backgroundColor: "transparent",
            svg: {
              fill: theme.palette.logo.default,
            },
            ":hover": {
              backgroundColor: theme.palette.button.hover,
              svg: {
                fill: theme.palette.primary.reverse,
              },
            },
          },
        ],
        sx
      )}
      ref={ref}
      {...other}
      onClick={onClick}
    >
      <SvgIcon size={size} sx={SvgSx}>
        {icon || children}
      </SvgIcon>
    </Container>
  );
});

interface SvgIconProps extends ElementProps {
  size?: number;
  icon?: ReactNode;
}
export function SvgIcon(props: SvgIconProps): SvgIconPrototype {
  const { size = 24, open, sx } = props;
  const { theme } = useTheme();
  return (
    <Container
      flexLayout
      open={open}
      sx={sxParser(
        [
          {
            width: size,
            height: size,
            minWidth: size,
            minHeight: size,
            maxWidth: size,
            maxHeight: size,
            borderRadius: size / 2,
            p: 0.36,
            svg: {
              fill: theme.palette.logo.default,
              width: "100%",
              height: "100%",
            },
          },
        ],
        sx
      )}
    >
      {props.icon || props.children}
    </Container>
  );
}
