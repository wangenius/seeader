import * as React from "react";
import { forwardRef, memo, useImperativeHandle, useRef } from "react";
import { Container, Hangover } from "./Container";
import { ButtonProperty, ListButtonValue } from "elementProperty";
import _ from "lodash";
import clsx from "clsx";
import {
  IconButtonProps,
  SvgIconProps,
  SvgIconPrototype,
} from "../@types/button";

export const Button = memo(
  forwardRef((props: ButtonProperty, ref) => {
    const { children, startIcon, endIcon, label = "", cls, ...other } = props;
    return (
      <Container ref={ref} cls={clsx("Button", cls)} {...other}>
        <Hangover
          cls={"Button_startIcon"}
          open={!startIcon}
          children={startIcon}
        />
        <Container
          cls={"Button_Chars"}
          children={_.capitalize(label) || children}
        />
        <Hangover cls={"Button_endIcon"} open={!endIcon} children={endIcon} />
      </Container>
    );
  })
);

export const IconButton = memo(
  forwardRef((props: IconButtonProps, ref) => {
    const { children, cls, icon, ...other } = props;
    return (
      <Container
        cls={clsx("IconButton", cls)}
        ref={ref}
        children={<SvgIcon icon={icon || children} />}
        {...other}
      />
    );
  })
);

export const SvgIcon = memo((props: SvgIconProps): SvgIconPrototype => {
  const { open, cls, ...other } = props;
  return (
    <Container open={open} cls={clsx("SvgIcon", cls)} {...other}>
      {props.icon || props.children}
    </Container>
  );
});

export const FontButton = memo(
  forwardRef((props: ButtonProperty, ref) => {
    const { cls, ...other } = props;
    return <Button cls={clsx("FontButton", cls)} {...other} ref={ref} />;
  })
);
export const ListButton = memo(
  forwardRef((props: ListButtonValue, ref) => {
    const { isActive, sx, label, onClick, ...other } = props;
    const Ref = useRef<HTMLElement>();
    /** @Description 暴露组件 */
    useImperativeHandle(ref, () => Ref.current);
    return (
      <Button
        ref={Ref}
        state={isActive ? "active" : undefined}
        label={label}
        onClick={onClick}
        cls={"ListButton"}
        {...other}
      />
    );
  })
);
