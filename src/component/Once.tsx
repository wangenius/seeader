import {createRef, forwardRef, memo, useImperativeHandle} from "react";
import {fn} from "@/method";
import clsx from "clsx";

/** base memo component */
export const Once = memo(
  forwardRef((props: Props.Once, ref: any) => {
    const { value, cs, open = true, lc = fn, rc = fn, ...rest } = props;
    const Ref = createRef<HTMLDivElement>();

    /** @Description 暴露组件 */
    useImperativeHandle(ref, () => Ref.current);
    /** @Description 关闭 */
    if (!open) return null;
    return (
      <div
        ref={Ref}
        className={cs}
        onClick={(event) => lc(event, value)}
        onContextMenu={(event) => rc(event, value)}
        {...rest}
      />
    );
  })
);

/** @Description Expanse Component */
export const Exp = forwardRef(({ cs, ...other }: Props.Once, ref) => (
  <Once cs={clsx("Hangover", cs)} {...other} ref={ref} />
));
