import * as React from "react";
import {forwardRef, memo, useCallback, useRef} from "react";
import {Container, Hangover} from "./Container";
import {Button} from "./Button";
import {MenuButtonProperty, MenuItemProperty, MenuProperty,} from "elementProperty";
import {usePop} from "../context/PopContainer";
import {Divider} from "./Accessory";
import {voidFn} from "../method/general";
import {MdCheck, MdKeyboardArrowRight} from "react-icons/md";
import {useModal} from "../context/ModalProvider";
import _ from "lodash";
import {Localizer} from "./Localizer";
import {Fn} from "../@types/context";

/** @Description 菜单 */
export const Menu = memo(
  forwardRef((props: MenuProperty, ref) => {
    const { children, open } = props;
    return (
      <Container open={open} cls={"Menu"}>
        {children.sub?.map((item, key) => (
          <MenuItem key={key}>{item}</MenuItem>
        ))}
      </Container>
    );
  })
);

/** @Description 菜单按钮 */
export const MenuButton = memo((props: MenuButtonProperty) => {
  const { context, ...other } = props;
  const anchorELRef = useRef<HTMLElement>();
  const { pop, openPop } = usePop();

  /** @Description 鼠标进入事件 */
  const onMouseEnter = useCallback<Fn>(
    () =>
      pop(
        <Localizer
          base={"bottom"}
          position={"absolute"}
          anchor={anchorELRef.current}
        >
          <Menu>{context}</Menu>
        </Localizer>
      ),
    [context]
  );
  return (
    <Button
      onMouseEnter={onMouseEnter}
      onClick={openPop}
      ref={anchorELRef}
      cls={"MenuButton"}
      label={context.label as string}
      {...other}
    />
  );
});

/** @Description 菜单item */
export const MenuItem = memo((props: MenuItemProperty): JSX.Element => {
  const { children, startIcon, open, ...other } = props;
  const { onClick = voidFn } = children;
  const Ref = useRef<HTMLElement>();
  const { closeModal } = useModal();
  const { closePop, cascade, Cascade, openCascade, closeCascade } = usePop();

  /** @Description hover事件 */
  const onMouseEnter = useCallback<Fn>(() => {
    if (children.type === "item") return;
    cascade(
      <Localizer anchor={Ref.current as HTMLElement}>
        <Menu>{children}</Menu>
      </Localizer>
    );
    openCascade();
  }, [children]);

  /** @Description mouseLeave */
  const onMouseLeave = useCallback<Fn>(() => {
    if (children.type === "menu") closeCascade();
  }, [children]);

  /** @Description 点击按钮 */
  const clickItem = useCallback<Fn>(() => {
    if (children.allowed === false || children.type === "menu") return;
    closeModal();
    closePop();
    onClick();
  }, [onClick]);

  return ["item", "menu"].includes(children.type) ? (
    <Container
      ref={Ref}
      open={children.open}
      cls={"MenuItem"}
      onMouseLeave={onMouseLeave}
    >
      {Cascade}
      <Container
        onMouseEnter={onMouseEnter}
        onClick={clickItem}
        cls={"MenuButton"}
        state={children.allowed ? "notAllowed" : undefined}
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
    <Container
    >
      {children.label}
    </Container>
  );
});
