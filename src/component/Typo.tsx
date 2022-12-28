import { Container } from "./Container";
import { ElementProps } from "../interface";
import { Styles, sxAssigner } from "../style/sx";

interface TypoProps extends ElementProps {
  variant?: string;
}

export function Typo(props: TypoProps) {
  let style: Styles = [{}];

  function initStyle() {
    switch (props.variant) {
      case "h2":
        return (style = [
          {
            display: "inline-block",
            fontWeight: 400,
            verticalAlign: "middle",
            lineHeight: "100%",
            userSelect: "none",
            alignItems: "center",
          },
        ]);
      default:
        return (style = [{}]);
    }
  }
  return (
    <Container flex sx={sxAssigner(initStyle(), props.sx)} {...props}>
      {props.children}
    </Container>
  );
}
