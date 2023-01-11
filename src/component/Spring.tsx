import { animated } from "@react-spring/web";
import { forwardRef, ReactNode } from "react";
import { styled } from "@mui/system";

export const Spring = (props: {
  spring: any;
  children?: ReactNode;
  open?: boolean;
  style?: string;
}) => {
  const { children, spring, style = "", ...other } = props;
  const AnimatedContainer = styled(animated.div)`
    ${style}
  `;
  return (
    <AnimatedContainer style={spring} {...other}>
      {children as ReactNode}
    </AnimatedContainer>
  );
};
