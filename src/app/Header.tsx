import { Container, Hangover } from "../component/Container";
import { Button, IconButton, SvgIcon } from "../component/Button";
import { useTheme } from "../context/ThemeProvider";
import { Close, CropSquare, Remove } from "@mui/icons-material";
import { Logo } from "../component/Icons";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useBook } from "../context/BookProvider";
import { HEIGHT_VALUE, Z_INDEX } from "../constant/theme";
import { Menu } from "../component/Menu";
import { useShelf } from "../context/ShelfProvider";
import { voidFn } from "../method/general";
import { useHotkeys } from "react-hotkeys-hook";
import { ENV } from "this_root";
import { usePath } from "../hook/usePath";
import { useSnackbar } from "notistack";
import { useTools } from "../hook/useTools";
import { Dialog, invoke } from "../method/Invoke";
import { useWindowSize } from "react-use";

export function Header() {
  const { theme } = useTheme();
  const nav = useNavigate();
  const { book, nextPage, lastPage, toggleChapterDocker } = useBook();
  const { addBook, updateBook, deleteBook, exportShelf, backUpBook } =
    useShelf();
  const { enqueueSnackbar } = useSnackbar();
  const { isShelf, isReading } = usePath();
  const { copyText } = useTools();
  const { width } = useWindowSize();

  const list: Menu_Options = {
    type: "menu",
    label: "菜单",
    sub: [
      {
        type: "menu",
        label: "文件",
        sub: [
          {
            type: "item",
            label: "添加书籍",
            shortcuts: "Ctrl+O",
            onClick: addBook,
          },
          {
            type: "item",
            label: "书籍信息",
            onClick: () =>
              Dialog.message(
                `名称: ${book.name}\n 路径：${book.path} \n 当前进度：第${
                  book.progress + 1
                }章`
              ),
          },
          {
            type: "divider",
          },
          {
            type: "item",
            label: "打开书架",
            shortcuts: "ctrl+shift+O",
            onClick: () => {},
          },
          {
            type: "item",
            label: "导出书架",
            shortcuts: "ctrl+E",
            onClick: exportShelf,
          },
          {
            type: "item",
            label: "重命名书架",
            onClick: voidFn,
          },
          {
            type: "divider",
          },
          {
            type: "item",
            label: "分享",
            shortcuts: "ctrl+shift+s",
            onClick: voidFn,
          },
          {
            type: "item",
            label: "开启同步",
            shortcuts: "ctrl+shift+U",
            onClick: voidFn,
          },
          {
            type: "item",
            label: "备份",
            onClick: backUpBook,
          },
          {
            type: "item",
            label: "重新加载",
            onClick: voidFn,
          },
          {
            type: "item",
            label: "清理缓存",
            onClick: voidFn,
          },
          {
            type: "divider",
          },
          {
            type: "item",
            label: "退出",
            shortcuts: "ctrl+W",
            onClick: () => confirm("确定退出?"),
          },
        ],
      },
      {
        type: "menu",
        open: true,
        label: "视图",
        sub: [
          {
            type: "item",
            label: "显示目录",
            shortcuts: "ctrl+b",
            onClick: toggleChapterDocker,
          },
          {
            type: "item",
            label: "显示书签",
            onClick: Dialog.message,
          },
        ],
      },
      {
        type: "menu",
        label: "编辑",
        sub: [
          {
            type: "item",
            label: "复制",
            shortcuts: "Ctrl+C",
            onClick: Dialog.message,
          },
          {
            type: "item",
            label: "复制路径",
            shortcuts: "Ctrl+D",
            onClick: () => copyText(book.path),
          },
          {
            type: "divider",
          },
          {
            type: "item",
            label: "添加书签",
            onClick: Dialog.message,
          },
          {
            type: "item",
            label: "编辑书签",
            onClick: Dialog.message,
          },
          {
            type: "divider",
          },
          {
            type: "item",
            label: "选择",
            onClick: Dialog.message,
          },
          {
            type: "item",
            label: "选择全部",
            shortcuts: "Ctrl+A",
            onClick: Dialog.message,
          },
          {
            type: "item",
            label: "查找",
            shortcuts: "Ctrl+F",
            onClick: Dialog.message,
          },
        ],
      },
      {
        type: "menu",
        label: "窗口",
        sub: [
          {
            type: "item",
            label: "最大化/还原",
            onClick: () => invoke("window_resize"),
          },
          {
            type: "item",
            label: "最大化",
            onClick: () => invoke("window_max"),
          },
          {
            type: "item",
            label: "最小化",
            onClick: () => invoke("window_min"),
          },
        ],
      },
      {
        type: "menu",
        label: "工具",
        sub: [
          {
            type: "item",
            label: "黑暗模式",
            onClick: voidFn,
          },
          {
            type: "menu",
            label: "主题",
            sub: [
              {
                type: "item",
                label: "默认",
                onClick: voidFn,
              },
              {
                type: "item",
                label: "黑暗",
                onClick: voidFn,
              },
            ],
          },
          {
            type: "menu",
            label: "语言",
            sub: [
              {
                type: "item",
                label: "中文",
                onClick: voidFn,
              },
              {
                type: "item",
                label: "英文",
                onClick: voidFn,
              },
              {
                type: "menu",
                label: "更多",
                sub: [
                  {
                    type: "item",
                    label: "添加语言",
                    onClick: voidFn,
                    shortcuts: "Ctrl+T",
                  },
                ],
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "item",
            label: "设置",
            onClick: voidFn,
          },
        ],
      },
      {
        type: "menu",
        label: "帮助",
        sub: [
          {
            type: "item",
            open: ENV.IS_DEV,
            shortcuts: "f12",
            label: "打开开发工具",
            onClick: () => invoke("window_toggleDevTools"),
          },
          {
            type: "item",
            label: "刷新页面",
            shortcuts: "ctrl+R",
            onClick: () => window.location.reload(),
          },
          { type: "divider" },
          {
            type: "item",
            label: "关于",
            onClick: Dialog.message,
          },
          {
            type: "item",
            label: "检查更新",
            onClick: Dialog.message,
          },
          {
            type: "item",
            label: "报告问题",
            onClick: Dialog.message,
          },
          { type: "divider" },
          {
            type: "item",
            label: "我的产品",
            shortcuts: "ctrl+shift+r",
            onClick: () => window.shell.openExternal("http://39.96.54.181"),
          },
          {
            type: "item",
            label: "获得支持",
            onClick: Dialog.message,
          },
          {
            type: "item",
            label: "注册",
            onClick: Dialog.message,
          },
          { type: "divider" },
          {
            type: "item",
            label: "隐私政策",
            onClick: Dialog.message,
          },
          {
            type: "item",
            label: "查看许可",
            onClick: Dialog.message,
          },
        ],
      },
    ],
  };
  iterate(list);
  return (
    <Container
      flexLayout
      full
      sx={{
        zIndex: Z_INDEX.HEADER,
        height: HEIGHT_VALUE.HEADER,
        px: 1,
        backgroundColor: theme.palette.background.main,
        borderBottom: theme.palette.border.default,
      }}
    >
      <SvgIcon icon={<Logo />} size={30} />
      <Button
        label={isShelf ? `阅读` : "书架"}
        onClick={() => nav(isShelf ? "./" : "./shelf")}
      />
      {width >= 800 &&
        list.sub?.map((item, key) => {
          return <Menu key={key} children={item} />;
        })}
      <Menu open={width < 800} label={"菜单"} children={list} />
      <Hangover className={"draggable"} sx={{ height: "100%" }} />
      <Button
        open={isShelf}
        label={`正在阅读:${book.name}`}
        onClick={() => nav("./")}
      />
      <Button
        open={isReading && book.progress !== 0}
        label={"上一章"}
        onClick={lastPage}
      />
      <Button
        open={isReading && book.progress !== book.chapters.length - 1}
        label={"下一章"}
        onClick={nextPage}
      />
      <IconButton icon={<Remove />} onClick={() => invoke("window_min")} />
      <IconButton
        icon={<CropSquare />}
        onClick={() => invoke("window_resize")}
      />
      <IconButton
        icon={<Close />}
        onClick={() =>
          Dialog.confirm("确认关闭?").then(() => invoke("window_close"))
        }
      />
    </Container>
  );
}
function iterate(item: Menu_Options) {
  item.sub?.map((item, key) => {
    if (item.type === "item" && item.shortcuts && item.onClick && item.open) {
      useHotkeys(item.shortcuts, item.onClick, {
        enabled: true,
      });
    }
    if (item.type === "menu") {
      iterate(item);
    }
  });
}
