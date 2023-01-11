import * as React from "react";
import { forwardRef, useEffect, useRef } from "react";
import { Button } from "./Button";
import { Container } from "./Container";
import { useTheme } from "../context/ThemeProvider";
import { voidFn } from "../method/general";
import { ElementProps, ListButtonValue } from "elementProperty";
import { SX } from "../@constant/theme";
import { sxParser } from "../method/parser";
import { useEffectOnce } from "react-use";
import { getOffsetTop } from "@mui/material";

export const ListButton = forwardRef((props: ListButtonValue, ref) => {
  const { theme } = useTheme();
  const { isActive, sx, label, onClick, ...other } = props;
  return (
    <Button
      label={label}
      onClick={onClick}
      sx={sxParser(
        [
          {
            width: "100%",
            mx: "auto",
            height: 40,
            borderRadius: 3,
            my: 0.6,
            justifyContent: "left",
          },
          isActive
            ? {
                backgroundColor: theme.button.backgroundColor?.hover,
                color: theme.button.color?.hover,
              }
            : {},
        ],
        sx
      )}
      ref={ref}
    />
  );
});

interface ListProps extends ElementProps {
  defaultPosition?: number;
}

export const ListContainer = forwardRef((props: ListProps, ref) => {
  return (
    <Container
      sx={sxParser(
        [
          {
            position: "relative",
            overflowY: "scroll",
            transition: "all 300ms ease",
            scrollBehavior: "smooth",
            pb: 2,
          },
          SX.scrollbarSx,
        ],
        props.sx
      )}
      ref={ref}
    >
      {props.children}
    </Container>
  );
});
