import {animated} from "@react-spring/web";
import {memo, ReactNode} from "react";
import {styled} from "@mui/system";
import _ from "lodash";
import {SpringProps} from "../@types/SpringProps";

/** @Description Spring 动画组件 */
export const Spring = memo((props: SpringProps) => {
  const { children, style, spring, cls,onClick } = props;
  const AnimatedContainer = styled(animated.div)(_.defaultsDeep(style, {}));
  return (
    <AnimatedContainer onClick={onClick} className={cls} style={spring}>
      {children as ReactNode}
    </AnimatedContainer>
  );
})