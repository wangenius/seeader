import { AirDrop, Container } from "../component/Container";
import { Button, IconButton, SvgIcon } from "../component/Button";
import { Typo } from "../component/Typo";
import { useTheme } from "../context/ThemeProvider";
import { Close, Minimize, Remove } from "@mui/icons-material";
import { voidFn } from "../interface";
import { Logo } from "../component/Icons";
import ReactDOM from "react-dom/client";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
const path = window.require("path");
const url = window.require("path");

const { BrowserWindow, app, dialog, getCurrentWindow, webContents } =
  window.require("@electron/remote");

export function Header() {
  const { theme } = useTheme();
  const nav = useNavigate();
  const param = useLocation();

  function messageBox() {
    dialog.showMessageBoxSync({
      type: "none",
      buttons: ["confirm"],
      title: "提示消息",
      message: "该功能暂未开放",
    });
  }
  return (
    <Container
      flex
      full
      sx={{
        zIndex: 100,
        height: 36,
        px: 1,
        backgroundColor: theme.palette.container.hover,
      }}
    >
      <SvgIcon size={30}>
        <Logo />
      </SvgIcon>

      <Typo variant={"h2"}>阅读器</Typo>
      <Button
        label={"书架"}
        onClick={() => {
          path.parse(param.pathname).name === "shelf"
            ? nav("./")
            : nav("./shelf");
        }}
      />
      <AirDrop className={"draggable"} />
      <Button label={"登录"} onClick={messageBox} />
      <Button label={"设置"} onClick={messageBox} />
      <Button label={"帮助"} onClick={voidFn} />
      <IconButton
        icon={<Remove />}
        onClick={() => {
          getCurrentWindow().minimize();
        }}
      />
      <IconButton
        icon={<Close />}
        onClick={() => {
          getCurrentWindow().close();
        }}
      />
    </Container>
  );
}
