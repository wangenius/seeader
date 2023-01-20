import { Container } from "./Container";
import { memo } from "react";
import { ElementProps } from "elementProperty";
import { Ring} from '@uiball/loaders'
export const Logo = memo(() => (
  <img
    src={"icon/icon.png"}
    style={{ width: 20, height: 20, userSelect: "none" }}
    alt={""}
  />
));

export const LoadingRing = memo((props: ElementProps) => (
  <Container open={props.open} cls={"loader"}>
    <Ring size={35} color={`${"#3e4859"}`} />
  </Container>
));
