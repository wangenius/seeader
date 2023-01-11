import { Container } from "../component/Container";
import { useTheme } from "../context/ThemeProvider";
import { useBook } from "../context/BookProvider";
import { useShelf } from "../context/ShelfProvider";
import React, { useState } from "react";
import { Dialog } from "../method/remote";
import { THEME_CONSTANT } from "../@constant/theme";
import {
  MdDeleteOutline,
  MdInfoOutline,
  MdModeEditOutline,
  MdOpenInNew,
} from "react-icons/md";
import { Menu } from "../component/Menu";
import { useModal } from "../context/ModalProvider";
import __ from "lodash";
import { Book } from "../@types/object";
import { useNavigate } from "react-router-dom";
import Z_INDEX = THEME_CONSTANT.Z_INDEX;

export function Shelf() {
  const { theme } = useTheme();
  const { openBook, deleteBook, modalEditBook } = useBook();
  const { book } = useBook();
  const { books } = useShelf();
  const { modal } = useModal();
  const [activeKey, setActiveKey] = useState<number>();
  const nav = useNavigate();

  function contextShow(position: { x: number; y: number }, item: Book) {
    modal(
      <Menu sx={{ position: "absolute", top: position.y, left: position.x }}>
        {{
          type: "menu",
          sub: [
            {
              type: "item",
              icon: <MdOpenInNew />,
              label: "打开",
              onClick: () => openBook(item),
            },
            {
              type: "item",
              label: "编辑",
              icon: <MdModeEditOutline />,
              onClick: () => modalEditBook(item),
            },
            {
              type: "item",
              label: "打开文件本地位置",
              icon: <MdInfoOutline />,
              onClick(): any {
                window.shell.openExternal(
                  item.path.slice(0, item.path.lastIndexOf("\\"))
                );
              },
            },
            {
              type: "item",
              label: "信息",
              icon: <MdInfoOutline />,
              onClick: () => {
                modal(<Container>{item.name}</Container>);
              },
            },
            {
              type: "item",
              label: "删除",
              style: {
                backgroundColor: "#ff0000",
                color: "#f1f1f1",
                svg: {
                  fill: "#f1f1f1",
                },
                ":hover": {
                  backgroundColor: "#e80005",
                  color: "#f1f1f1",
                },
              },
              icon: <MdDeleteOutline />,
              onClick(): any {
                Dialog.confirm("确定删除？").then((r) => deleteBook(item));
              },
            },
          ],
        }}
      </Menu>
    );
  }

  return (
    <>
      <Container
        full
        overflowY
        sx={[
          {
            height: "100%",
            borderRightColor: theme.default.backgroundColor?.default,
            backgroundColor: theme.default.backgroundColor?.default,
            borderRightWidth: 0.5,
            borderRightStyle: "solid",
            alignItems: "start",
            justifyContent: "start",
            p: 2,
          },
        ]}
        flexLayout
        col
      >
        <Container
          sx={{
            display: "grid",
            width: "100%",
            gridGap: "20px 20px",
            pt: 2,
            gridTemplateColumns: "repeat(auto-fill, 160px)",
            overflow: "visible",
            mx: "auto",
          }}
        >
          {books.map((item, key) => {
            return (
              <Container
                key={key}
                col
                sx={{
                  display: "inline-flex",
                  overflow: "visible",
                }}
              >
                <Container
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    width: 160,
                    height: 200,
                    transition: "all 300ms ease",
                    background: theme.docker.background?.default,
                    overflow: "visible",
                    backgroundSize: "300% 300%",
                    cursor: THEME_CONSTANT.CURSORS.pointer,
                    zIndex: activeKey === key ? Z_INDEX.FocusItem : 0,
                    "::after": {
                      content: "''",
                      position: "absolute",
                      top: "10%",
                      width: "80%",
                      left: "10%",
                      backgroundSize: "100% 100%",
                      height: "100%",
                      background: "inherit",
                      zIndex: -1,
                      filter: "blur(20px) brightness(100%) opacity(.6)",
                    },
                    ":hover": {
                      zIndex: Z_INDEX.FocusItem,
                      scale: "1.04",
                      backgroundPosition: "100% 0",
                    },
                  }}
                  onClick={() => {
                    item._id === book._id ? nav("/") : openBook(item);
                  }}
                  onContextMenu={(e) => {
                    setActiveKey(key);
                    contextShow({ x: e.clientX, y: e.clientY }, item);
                  }}
                >
                  <Container
                    sx={{
                      p: 2,
                      margin: " 20px auto",
                      color: theme.docker.color?.default,
                      textAlign: "justify",
                      userSelect: "none",
                    }}
                  >
                    {item.name}
                  </Container>
                  <Container
                    open={item._id === book._id}
                    sx={{
                      fontSize: "0.76rem",
                      color: theme.docker.color?.default,
                      position: "absolute",
                      bottom: 4,
                      right: 6,
                    }}
                  >{`正在阅读`}</Container>
                  <Container
                    sx={{
                      fontSize: "0.76rem",
                      color: theme.docker.color?.default,
                      position: "absolute",
                      bottom: 4,
                      left: 4,
                    }}
                  >{`进度：${__.round(
                    item._id === book._id
                      ? ((book.progress + 1) / item.total) * 100
                      : ((item.progress + 1) / item.total) * 100,
                    2
                  )}% `}</Container>
                </Container>
              </Container>
            );
          })}
        </Container>
      </Container>
    </>
  );
}
