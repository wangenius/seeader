import * as React from "react";
import {memo, useCallback, useRef} from "react";
import {Container, Hangover} from "./Container";
import {Button} from "./Button";
import {MenuButtonProperty, MenuItemProps, MenuProps,} from "elementProperty";
import {pop} from "./Pop";
import {Divider} from "./Accessory";
import {MdCheck, MdKeyboardArrowRight} from "react-icons/md";
import _ from "lodash";
import {Fn} from "../@types/context";
import {useCascade} from "./Cascade";
import {styled} from "@mui/material";

/** @Description 菜单 */
export const Menu = memo((props: MenuProps) => {
  const { children, open } = props;
  return (
    <Container open={open} cls={"Menu"}>
      {children.sub?.map((item, key) => (
        <MenuItem key={key}>{item}</MenuItem>
      ))}
    </Container>
  );
});



/** @Description 菜单按钮 */
export const MenuButton = memo((props: MenuButtonProperty) => {
  const { context,...other } = props;
  const anchorELRef = useRef<HTMLElement>();
  /** @Description 鼠标进入事件 */
  const onMouseEnter = useCallback<Fn>(
    () =>
      pop(<Menu>{context}</Menu>, {
        anchor: anchorELRef.current,
        base: "bottom",
        position: "absolute",
      }),
    [context]
  );

  const onClick = ()=>{
    pop(<Menu>{context}</Menu>, {
      anchor: anchorELRef.current,
      base: "bottom",
      position: "absolute",
    })
    pop.open()
  }

  return (
    <Button
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      ref={anchorELRef}
      cls={"MenuButton"}
      label={context.label as string}
      {...other}
    />
  );
});


/** @Description 菜单item */
export const MenuItem = memo((props: MenuItemProps) => {
  const { children, startIcon, open, ...other } = props;
  const { onClick } = children;
  /** @Description anchor标记 */
  const Ref = useRef<HTMLElement>();
  const { container, cascade, closeCascade } = useCascade();
  /** @Description hover事件 */
  const onMouseEnter = useCallback<Fn>(() => {
    if (children.type === "item") return;
    cascade(<Menu>{children}</Menu>, {
      anchor: Ref.current,
      position: "relative",
    });
  }, [children]);

  /** @Description mouseLeave */
  const onMouseLeave = useCallback<Fn>(() => {
    closeCascade();
  }, [children]);

  /** @Description 点击按钮 */
  const clickItem = useCallback<Fn>(() => {
    if (children.allowed === false || children.type === "menu") return;
    pop.close();
    onClick!();
  }, [onClick]);

  return ["item", "menu"].includes(children.type) ? (
    <Container
      ref={Ref}
      open={children.open}
      cls={"MenuItem"}
      onMouseLeave={onMouseLeave}
    >
      {container}
      <Container
        onMouseEnter={onMouseEnter}
        onClick={clickItem}
        cls={"MenuButton"}
        state={children.allowed === false ? "notAllowed" : undefined}
        {...other}
      >
        {children.icon || null}
        <Hangover
          cls={"name"}
          children={_.capitalize(children.label as string)}
        />
        <Container cls={"shortcuts"} children={children.shortcuts} />
        {children.type === "menu" ? (
          <MdKeyboardArrowRight />
        ) : children.check ? (
          <MdCheck />
        ) : (
          <MdCheck opacity={0} />
        )}
      </Container>
    </Container>
  ) : children.type === "divider" ? (
    <Divider />
  ) : (
    <Container cls={"MenuItem"}>{children.label}</Container>
  );
});