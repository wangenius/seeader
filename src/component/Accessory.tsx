import { Container } from "./Container";
import React from "react";
import { useTheme } from "../context/ThemeProvider";
import { ElementProps } from "elementProperty";

export function Divider({ open }: ElementProps) {
  const { theme } = useTheme();
  return (
    <Container
      open={open}
      full
      sx={{
        borderBottom: `1px solid ${theme.palette.container.focus}`,
        my: 0.4,
      }}
    />
  );
}
