import { Container } from "./Container";
import React, { memo } from "react";
import { ElementProps } from "elementProperty";

export const Divider = memo(({ open }: ElementProps) => (
  <Container cls={"Divider"} open={open} />
));
