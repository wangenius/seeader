import * as React from "react";
import {forwardRef, memo} from "react";
import {Exp, Once, SVG} from "@/component";
import _ from "lodash";
import clsx from "clsx";
import {fn} from "@/method";
import {useTranslation} from "react-i18next";

/** @Description button
 *
 * default label "click";
 * default value undefined
 *
 * */
export const Button = forwardRef((props: Props.Button.Default, ref) => {
  const {
    children,
    startIcon,
    endIcon,
    label = "click",
    cs,
    lc = fn,
    value,
    ...rest
  } = props;
  const { t } = useTranslation();
  return (
    <Once ref={ref} cs={clsx("Button", cs)} lc={() => lc(value)} {...rest}>
      <SVG cs={"start"} open={!!startIcon} icon={startIcon} />
      <Once cs={"text"} children={_.capitalize(t(label))} />
      <SVG cs={"end"} open={!!endIcon} icon={endIcon} />
    </Once>
  );
});

export const IconButton = forwardRef((props: Props.Button.Icon, ref) => {
  const { cs, icon, lc = fn, value,size, ...rest } = props;
  return (
    <Once
      cs={clsx("IconButton", cs)}
      ref={ref}
      children={<SVG size={size} icon={icon} />}
      lc={() => lc(value)}
      {...rest}
    />
  );
});

/** @Description List*
 *  @overview flex布局，primary为左字符，secondary为右字符
 * */
export const ListButton = memo(
  forwardRef((props: Props.Button.InList, ref) => {
    const { isActive, primary, secondary, lc = fn, value, cs, ...rest } = props;
    const { t } = useTranslation();
    return (
      <Once
        ref={ref}
        state={isActive ? "active" : undefined}
        cs={clsx("ListButton", cs)}
        lc={() => lc(value)}
        {...rest}
      >
        <Once cs={"primary"} children={_.capitalize(t(primary))} />
        <Exp />
        <Once cs={"secondary"} children={_.capitalize(t(secondary))} />
      </Once>
    );
  })
);
