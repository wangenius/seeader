import * as React from "react";
import {memo, ReactNode, useCallback, useMemo, useRef, useState} from "react";
import {Once} from "./Once";
import {Pop} from "./Pop";
import {Divider} from "./Divider";
import _ from "lodash";
import clsx from "clsx";
import {fn} from "@/method";
import {Spring} from "./Spring";
import {useSpring} from "@react-spring/web";
import {TFuncKey} from "i18next";
import {useTranslation} from "react-i18next";
import {Localizer} from "@/component/Localizer";
import {useEvent} from "@/hook/useEvent";
import ClickAwayListener from "react-click-away-listener";

/** @Description 菜单 */
export const Menu = memo((props: Props.Menu.Main) => {
  const { children } = props;
  const spring = useSpring({
    from: {
      scale: 0.5,
      opacity:0,
      y:100
    },
    to: {
      scale: 1,
      opacity:1,
      y:0
    },
    config: {duration:200},
  });

  return (
    <Spring spring={spring} cs={"Menu"}>
      {children.sub?.map((item, key) => (
        <MenuItem key={key} lc={children.onClick} base={children.value}>
          {item}
        </MenuItem>
      ))}
    </Spring>
  );
});

/** @Description cascade */
export const useCascade = () => {
  /** @Description content */
  const [content, setContent] = useState<ReactNode>(null);
  /** @Description state */
  const [cascadeOpen, setCascadeOpen] = useState<boolean>(false);
  /** @Description change content */
  const cascade = (content: ReactNode, configs?: Props.Localizer) => {
    setContent(<Localizer {...configs}>{content}</Localizer>);
    openCascade();
  };

  const closeCascade = useEvent<Fn>(() => {
    setCascadeOpen(false);
  });

  const openCascade = useEvent<Fn>(() => {
    setCascadeOpen(true);
  });

  const onClickAway = useEvent<Fn>(() => {
    closeCascade();
  });

  const container = useMemo(
      () =>
          cascadeOpen && (
              <ClickAwayListener onClickAway={onClickAway}>
                <>{content}</>
              </ClickAwayListener>
          ),
      [content, cascadeOpen]
  );

  return {
    container,
    cascade,
    closeCascade,
  };
};
/** @Description 菜单item */
export const MenuItem = memo((props: Props.Menu.Item) => {
  const { children, startIcon, open, lc: click = fn, ...other } = props;
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

  const { t } = useTranslation();

  return ["item", "menu"].includes(children.type) ? (
    <Once
      ref={Ref}
      open={children.open}
      cs={"MenuItem"}
      onMouseLeave={onMouseLeave}
    >
      {container}
      <Once
        onMouseEnter={onMouseEnter}
        lc={clickItem}
        cs={clsx("MenuButton", children.cls)}
        state={children.allowed === false ? "notAllowed" : undefined}
        {...other}
      >
        {_.capitalize(t(children.label as TFuncKey) as string)}
      </Once>
    </Once>
  ) : children.type === "divider" ? (
    <Divider />
  ) : (
    <Once cs={"MenuItem"}>{children.label}</Once>
  );
});
