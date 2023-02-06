import { Container } from "./Container";
import { memo, ReactNode } from "react";
import { Ring } from "@uiball/loaders";

export const LoadingRing = memo((props: Props.Base) => (
  <Container open={props.open} cls={"loader"}>
    <Ring size={35} color={`${"#3e4859"}`} />
  </Container>
));

const req = require.context("../@static", true, /\.svg$/);

/** @Description  type generated*/
interface Icons {
  [propsName: string]: ReactNode;
}

/** @Description Icons是图标包 直接跟上variable名即可 variable名为文件名，首字母大写 */
export const Icons: Icons = {};

/** @Description 生成 */
req.keys().map(req).map((item) => {
  const X = (item as any).default;
  return Icons[X.name.slice(3, X.name.length)] = <X />;
});