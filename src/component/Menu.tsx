import * as React from "react";
import { useRef } from "react";
import { Container, Hangover } from "./Container";
import { Button, SvgIcon } from "./Button";
import { useTheme } from "../context/ThemeProvider";
import { CLASSNAMES } from "../constant/theme";
import { MenuItemProperty, MenuProperty } from "elementProperty";
import { usePop } from "../context/PopProvider";
import { Divider } from "./Accessory";
import { voidFn } from "../method/general";
import { ArrowRight } from "@mui/icons-material";

export const Menu = (props: MenuProperty) => {
  const { children, ...other } = props;
  const anchorELRef: any = useRef();
  const { rootPop, rootOpen } = usePop();

  const menuStyle = {
    mt: 1,
    p: 0.4,
    overflow: "visible",
    backgroundColor: "#fff",
    borderRadius: 2,
    boxShadow:
      "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
  };

  const handleClick = () =>
    rootPop(
      anchorELRef.current,
      <Container sx={menuStyle}>
        {children.sub?.map((item, key) => (
          <MenuItem key={key}>{item}</MenuItem>
        ))}
      </Container>
    );

  return (
    <Button
      onMouseEnter={handleClick}
      ref={anchorELRef}
      className={CLASSNAMES.MENU_ANCHOR}
      {...other}
      onClick={rootOpen}
      label={children.label}
    />
  );
};

export const MenuItem = (props: MenuItemProperty): JSX.Element => {
  const { theme } = useTheme();
  const { children, startIcon, ...other } = props;
  const Ref: any = useRef();
  const { stemPop, stem, stemClose, stemOpen, rootClose } = usePop({
    anchor: Ref.current,
  });
  const outStyle: Style.SXs = [
    {
      height: 24,
      width: "fit-content",
      position: "relative",
      whiteSpace: "nowrap",
      cursor: "pointer",
      userSelect: "none",
      borderRadius: 2,
      backgroundColor: theme.palette.button.default,
      color: theme.palette.buttonChar.default,
      transition: "all 200ms ease",
      px: 1,
      mx: 0.2,
      ":hover": {
        backgroundColor: theme.palette.button.hover,
        color: theme.palette.buttonChar.hover,
      },
      "*": {
        pointerEvents: "none",
      },
    },
    { height: 32, m: 0, width: "100%", minWidth: 200 },
  ];

  function handleOpen() {
    stemPop(
      <Container
        sx={{
          p: 0.4,
          backgroundColor: "#fff",
          borderRadius: 2,
          overflow: "visible",
          boxShadow:
            "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
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
    children.onClick && children.onClick();
    rootClose();
  }

  return ["item", "menu"].includes(children.type) ? (
    <Container
      sx={{
        position: "relative",
        overflow: "visible",
      }}
      full
      onMouseLeave={children.type === "menu" ? stemClose : voidFn}
    >
      <Container
        ref={Ref}
        onMouseEnter={children.type === "menu" ? handleOpen : voidFn}
        onClick={children.type === "menu" ? handleOpen : pressItem}
        className={CLASSNAMES.MENU_SUB_ANCHOR}
        flexLayout
        sx={outStyle}
        {...other}
      >
        <SvgIcon>{startIcon || null}</SvgIcon>
        <Hangover
          sx={{
            whiteSpace: "nowrap",
            fontSize: "0.825rem",
            pr: 5,
          }}
        >
          {children.label}
        </Hangover>
        <Container sx={{ fontSize: "0.785rem", color: "#9f9f9f" }}>
          {children.shortcuts}
        </Container>
        <SvgIcon>
          {children.type === "menu" ? <ArrowRight /> : startIcon || null}
        </SvgIcon>
      </Container>
      {stem}
    </Container>
  ) : children.type === "divider" ? (
    <Divider />
  ) : (
    <Container>{children.label}</Container>
  );
};
