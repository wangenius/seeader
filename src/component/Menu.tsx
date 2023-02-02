import * as React from "react";
import { memo, useCallback, useRef } from "react";
import { Container, Hangover } from "./Container";
import { Button } from "./Button";
import { Pop } from "./Pop";
import { Divider } from "./Accessory";
import { MdCheck, MdKeyboardArrowRight } from "react-icons/md";
import _ from "lodash";
import { useCascade } from "./Cascade";
import clsx from "clsx";
import { voidFn } from "../method";

/** @Description 菜单 */
export const Menu = memo((props: Props.Menu.Main) => {
  const { children, open } = props;
  return (
    <Container open={open} cls={"Menu"}>
      {children.sub?.map((item, key) => {
        return (
          <MenuItem key={key} onClick={children.onClick} base={children.value}>
            {item}
          </MenuItem>
        );
      })}
    </Container>
  );
});

/** @Description 菜单按钮 */
export const MenuButton = memo((props: Props.Button.MenuButton) => {
  const { context, cls, ...other } = props;
  const anchorELRef = useRef<HTMLElement>();
  /** @Description 鼠标进入事件 */
  const onMouseEnter = useCallback<Fn>(
    () =>
      Pop.set(<Menu>{context}</Menu>, {
        anchor: anchorELRef.current,
        base: "bottom",
        position: "absolute",
      }),
    [context]
  );

  const onClick = () => {
    Pop.set(<Menu>{context}</Menu>, {
      anchor: anchorELRef.current,
      base: "bottom",
      position: "absolute",
    }).open();
  };

  return (
    <Button
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      ref={anchorELRef}
      cls={clsx("MenuButton", cls)}
      label={context.label as string}
      {...other}
    />
  );
});

/** @Description 菜单item */
export const MenuItem = memo((props: Props.Menu.Item) => {
  const {
    children,
    startIcon,
    open,
    onClick: click = voidFn,
    ...other
  } = props;
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
    Pop.close();
    click(children.value);
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
        cls={clsx("MenuButton", children.cls)}
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
        ) : children.value === true ||
          (children.value === props.base &&
            props.children.value !== undefined) ? (
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
