import * as React from "react";
import { forwardRef, memo, useImperativeHandle, useRef } from "react";
import { Container } from "./Container";
import _ from "lodash";
import clsx from "clsx";
import { voidFn } from "../method";
import { useTranslation } from "react-i18next";

export const Button = memo(
  forwardRef((props: Props.Button.Main, ref) => {
    const {
      children,
      startIcon,
      endIcon,
      label = "",
      cls,
      onClick = voidFn,
      value,
      ...other
    } = props;
    const { t } = useTranslation();
    return (
      <Container
        ref={ref}
        cls={clsx("Button", cls)}
        onClick={() => onClick(value)}
        {...other}
      >
        <Container
          cls={"Button_startIcon"}
          open={!!startIcon}
          children={startIcon}
        />
        <Container
          cls={"Button_Chars"}
          children={_.capitalize(t(label)) || children}
        />
        <Container cls={"Button_endIcon"} open={!!endIcon} children={endIcon} />
      </Container>
    );
  })
);

export const IconButton = forwardRef((props: Props.Button.IconButton, ref) => {
  const { children, cls, icon, onClick = voidFn, value, ...other } = props;
  return (
    <Container
      cls={clsx("IconButton", cls)}
      ref={ref}
      children={<SvgIcon icon={icon || children} />}
      onClick={() => onClick(value)}
      {...other}
    />
  );
});

export const SvgIcon = memo((props: Props.Button.SvgIcon) => {
  const { open, cls, ...other } = props;
  return (
    <Container open={open} cls={clsx("SvgIcon", cls)} {...other}>
      {props.icon || props.children}
    </Container>
  );
});

export const ListButton = memo(
  forwardRef((props: Props.Button.ListButton, ref) => {
    const { isActive, sx, label, onClick = voidFn, value, ...other } = props;
    const Ref = useRef<HTMLElement>();
    /** @Description 暴露组件 */
    useImperativeHandle(ref, () => Ref.current);
    return (
      <Button
        ref={Ref}
        state={isActive ? "active" : undefined}
        label={label}
        onClick={() => onClick(value)}
        cls={"ListButton"}
        {...other}
      />
    );
  })
);
