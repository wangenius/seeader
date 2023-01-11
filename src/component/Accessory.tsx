import { Container } from "./Container";
import React from "react";
import { useTheme } from "../context/ThemeProvider";
import { ElementProps } from "elementProperty";
import { sxParser } from "../method/parser";

interface DividerProps extends ElementProps {
  vertical?: boolean;
  open?: boolean;
}
export function Divider({ open, vertical = false, sx }: DividerProps) {
  const { theme } = useTheme();
  return (
    <Container
      open={open}
      full={!vertical}
      sx={sxParser(
        [
          { px: 2 },
          vertical
            ? {
                height: "100%",
                borderLeft: theme.divider.border?.default,
              }
            : { borderBottom: theme.divider.border?.default },
        ],
        sx
      )}
    />
  );
}
