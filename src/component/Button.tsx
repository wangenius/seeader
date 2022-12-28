import * as React from "react";
import { forwardRef, ReactNode } from "react";
import { ElementProps, voidFn } from "../interface";
import { AirDrop, Container } from "./Container";
import { useTheme } from "../context/ThemeProvider";
import { Styles, sxAssigner } from "../style/sx";

export interface ButtonProperty extends ElementProps {
  index?: number;
  value?: string;
  startIcon?: ReactNode;
  label?: string;
  endIcon?: ReactNode;
  href?: string;
  mr?: boolean;
  ml?: boolean;
  tip?: boolean;
}

export const Button = forwardRef((props: ButtonProperty, ref) => {
  const { theme } = useTheme();
  const {
    children,
    href,
    onClick,
    tip,
    startIcon = undefined,
    endIcon = undefined,
    loading = false,
    label = "",
    sx,
    ...other
  } = props;

  const outStyle: Styles = [
    {
      height: 24,
      maxWidth: 300,
      width: "fit-content",
      position: "relative",
      whiteSpace: "nowrap",
      cursor: loading ? "not-allowed" : "pointer",
      userSelect: "none",
      borderRadius: 2,
      fontSize: "0.875rem",
      backgroundColor: theme.palette.button.default,
      color: theme.palette.buttonChar.default,
      transition: "all 200ms ease",
      px: 1,
      ":hover": {
        backgroundColor: theme.palette.button.hover,
        color: theme.palette.primary.reverse,
      },
    },
  ];
  return (
    <Container
      ref={ref}
      flex={true}
      sx={sxAssigner(outStyle, sx)}
      {...other}
      onClick={loading ? voidFn : onClick}
    >
      <AirDrop
        flex
        sx={{ justifyContent: "left" }}
        open={startIcon !== undefined}
      >
        {startIcon}
      </AirDrop>
      {label || children}
    </Container>
  );
});

interface SvgIconPrototype extends JSX.Element {}

interface IconButtonProps extends ElementProps {
  children?: SvgIconPrototype;
  icon?: SvgIconPrototype | string;
}
export const IconButton = forwardRef((props: IconButtonProps, ref) => {
  const { theme } = useTheme();
  const { children, onClick, icon, sx, ...other } = props;

  return (
    <Container
      flex
      sx={sxAssigner(
        [
          {
            width: 26,
            height: 26,
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
                fill: theme.palette.primary.main,
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
      {icon || children}
    </Container>
  );
});

interface SvgIconProps extends ElementProps {
  size?: number;
}
export function SvgIcon(props: SvgIconProps): SvgIconPrototype {
  const { size = 26, open, sx } = props;
  const { theme } = useTheme();
  return (
    <Container
      open={open}
      sx={sxAssigner(
        [
          {
            mx: "auto",
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
      {props.children}
    </Container>
  );
}
