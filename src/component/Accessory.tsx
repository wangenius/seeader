import { Container } from "./Container";
import React, { memo } from "react";

export const Divider = memo(({ open }: Props.Base) => (
  <Container cls={"Divider"} open={open} />
));
