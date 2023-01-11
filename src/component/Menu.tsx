import * as React from "react";
import { useRef } from "react";
import { Container, Hangover } from "./Container";
import { Button, SvgIcon } from "./Button";
import { useTheme } from "../context/ThemeProvider";
import { CLASSNAMES, THEME_CONSTANT } from "../@constant/theme";
import {
  MenuButtonProperty,
  MenuItemProperty,
  MenuProperty,
} from "elementProperty";
import { usePop } from "../context/PopProvider";
import { Divider } from "./Accessory";
import { voidFn } from "../method/general";
import { MdCheck, MdKeyboardArrowRight } from "react-icons/md";
import { useModal } from "../context/ModalProvider";
import { sxParser } from "../method/parser";
import __ from "lodash";

export const Menu = (props: MenuProperty) => {
  const { children } = props;
  const { theme } = useTheme();
  const menuStyle = [
    {
      mt: 1,
      pb: 0.4,
      px: 0.4,
      pt: 0.05,
      overflow: "visible",
      backgroundColor: theme.docker.backgroundColor?.default,
      borderRadius: 2,
      boxShadow: theme.docker.shadow?.default,
    },
  ];

  return (
    <Container sx={sxParser(menuStyle, props.sx)}>
      {children.sub?.map((item, key) => (
        <MenuItem key={key}>{item}</MenuItem>
      ))}
    </Container>
  );
};

export const MenuButton = (props: MenuButtonProperty) => {
  const { context, ...other } = props;
  const anchorELRef: any = useRef();
  const { setRoot, rootOpen } = usePop();

  const setRootContent = () =>
    setRoot({
      anchor: { node: anchorELRef.current },
      content: <Menu>{context}</Menu>,
    });

  return (
    <Button
      onMouseEnter={setRootContent}
      ref={anchorELRef}
      className={CLASSNAMES.POP_BUTTON}
      {...other}
      onClick={rootOpen}
      label={context.label as string}
    />
  );
};

export const MenuItem = (props: MenuItemProperty): JSX.Element => {
  const { theme } = useTheme();
  const { children, startIcon, open, ...other } = props;
  const { onClick = voidFn } = children;
  const Ref: any = useRef();
  const { closeModal } = useModal();
  const { setStem, stem, stemClose, stemOpen, rootClose } = usePop({
    anchor: Ref.current,
  });
  const outStyle: Style.SXs = [
    {
      position: "relative",
      whiteSpace: "nowrap",
      cursor: THEME_CONSTANT.CURSORS.pointer,
      userSelect: "none",
      borderRadius: 1.8,
      backgroundColor: "transparent",
      color: theme.button.color?.default,
      px: 0.4,
      height: 32,
      m: 0,
      width: "100%",
      minWidth: 200,
      svg: {
        mx: 1,
        scale: "1.1",
      },
      ".shortcuts": {
        fontSize: "0.785rem",
        color: "#9f9f9f",
      },
      ":hover": {
        transition: "all 200ms ease",

        backgroundColor: theme.button.backgroundColor?.hover,
        color: theme.button.color?.hover,
        svg: {
          fill: theme.button.color?.hover,
        },
        ".shortcuts": {
          color: theme.button.color?.hover,
        },
      },
      "*": {
        pointerEvents: "none",
      },
    },
    children.allowed === false && {
      cursor: THEME_CONSTANT.CURSORS.arrow,
      backgroundColor: "transparent",
      color: "#eaeaea",
      svg: {
        fill: "#eaeaea",
      },
      ".shortcuts": {
        color: "#eaeaea",
      },
      ":hover": {
        backgroundColor: "transparent",
        color: "#eaeaea",
        svg: {
          fill: "#eaeaea",
        },
        ".shortcuts": {
          color: "#eaeaea",
        },
      },
    },
  ];

  function handleOpen() {
    setStem(
      <Container
        sx={{
          p: 0.4,
          pt: 0.1,
          backgroundColor: theme.docker.backgroundColor?.default,
          borderRadius: 2,
          overflow: "visible",
          boxShadow: theme.docker.shadow?.default,
        }}
      >
        {children.sub?.map((item, key) => (
          <MenuItem key={key}>{item}</MenuItem>
        ))}
      </Container>
    );
    stemOpen();
  }
  function pressItem() {
    closeModal();
    rootClose();
    onClick();
  }

  return ["item", "menu"].includes(children.type) ? (
    <Container
      open={children.open}
      sx={{
        position: "relative",
        overflow: "visible",
        mt: 0.4,
      }}
      full
      onMouseLeave={children.type === "menu" ? stemClose : voidFn}
    >
      <Container
        ref={Ref}
        onMouseEnter={children.type === "menu" ? handleOpen : voidFn}
        onClick={
          children.allowed !== false
            ? children.type === "menu"
              ? handleOpen
              : pressItem
            : voidFn
        }
        className={CLASSNAMES.MENU_SUB_ANCHOR}
        flexLayout
        sx={sxParser(outStyle, children.style)}
        {...other}
      >
        {children.icon || null}
        <Hangover
          sx={{
            whiteSpace: "nowrap",
            fontSize: "0.825rem",
            pr: 5,
          }}
        >
          {__.capitalize(children.label as string)}
        </Hangover>
        <Container
          className={"shortcuts"}
          sx={{ fontSize: "0.785rem", color: "#9f9f9f" }}
        >
          {children.shortcuts}
        </Container>
        {children.type === "menu" ? (
          <MdKeyboardArrowRight />
        ) : children.check ? (
          <MdCheck />
        ) : (
          <MdCheck opacity={0} />
        )}
      </Container>
      {stem}
    </Container>
  ) : children.type === "divider" ? (
    <Divider sx={{ mt: 0.4 }} />
  ) : (
    <Container
      sx={sxParser(
        [{ color: theme.button.color?.default, mx: 0.5, my: 0.4, mt: 0.7 }],
        children.style
      )}
    >
      {children.label}
    </Container>
  );
};
