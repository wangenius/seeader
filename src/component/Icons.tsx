import { Container } from "./Container";
import { memo } from "react";
import { ElementProps } from "elementProperty";

export const Logo = memo(() => (
  <img
    src={"icon/icon.png"}
    style={{ width: 20, height: 20, userSelect: "none" }}
    alt={""}
  />
));

export const LoadingRing = memo((props: ElementProps) => (
  <Container open={props.open} cls={"loader"} />
));
