import * as React from "react";
import { forwardRef, ReactNode } from "react";
import { Hangover, Container } from "./Container";
import { useTheme } from "../context/ThemeProvider";
import { SxProps, Theme } from "@mui/system";
import { voidFn } from "../method/general";
import { ButtonProperty, ElementProps } from "elementProperty";
import { sxParser } from "../method/parser";
import { THEME_CONSTANT } from "../@constant/theme";
import __ from "lodash";

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
      x: "fit-content",
      position: "relative",
      whiteSpace: "nowrap",
      cursor: loading ? "not-allowed" : THEME_CONSTANT.CURSORS.pointer,

      userSelect: "none",
      borderRadius: 3,
      backgroundColor: theme.button.backgroundColor?.default,
      color: theme.button.color?.default,
      transition: "all 200ms ease",
      px: 1,
      mx: 0.1,
      ":hover": {
        backgroundColor: theme.button.backgroundColor?.hover,
        color: theme.button.color?.hover,
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
        {__.capitalize(label) || children}
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
            x: 24,
            win_height: 24,
            cursor: THEME_CONSTANT.CURSORS.pointer,
            transition: "all 300ms ease",
            borderRadius: 3,
            mx: 0.4,
            backgroundColor: "transparent",
            svg: {
              fill: theme.icon.color?.default,
            },
            ":hover": {
              backgroundColor: theme.icon.backgroundColor?.hover,
              svg: {
                fill: theme.icon.color?.hover,
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
            x: size,
            height: size,
            width: size,
            minHeight: size,
            maxWidth: size,
            maxHeight: size,
            borderRadius: size / 2,
            p: 0.36,
            svg: {
              fill: theme.icon.color?.default,
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

export const FontButton = forwardRef((props: ButtonProperty, ref) => {
  const { sx, ...other } = props;
  const style: Style.SXs = [
    {
      backgroundColor: "transparent",
      ":hover": {
        backgroundColor: "transparent",
        color: "#000",
      },
    },
  ];
  return <Button sx={sxParser(style, sx)} {...other} ref={ref} />;
});
