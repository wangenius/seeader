import {
  Button,
  Container,
  Hangover,
  IconButton,
  Logo,
  MenuButton,
  pop,
  SvgIcon,
  TextInput,
} from "../component";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useBook } from "../context/BookProvider";
import { useShelf } from "../context/ShelfProvider";
import { Browser, Dialog, remote, voidFn } from "../method";
import { useHotkeys } from "react-hotkeys-hook";
import { ENV } from "a_root";
import { usePath } from "../hook/usePath";
import { useWindowSize } from "react-use";
import { useAppDispatch, useAppSelector } from "../store/store";
import { settingsSlice } from "../store/slice_settings";
import { useSettings } from "../hook/useSettings";
import {
  VscChromeMinimize,
  VscClose,
  VscPrimitiveSquare,
} from "react-icons/vsc";
import { Menu_Options } from "elementProperty";
import {
  MdAccountCircle,
  MdAdd,
  MdBrightnessAuto,
  MdContentCopy,
  MdCopyAll,
  MdDarkMode,
  MdDeveloperBoard,
  MdExitToApp,
  MdFullscreen,
  MdInfoOutline,
  MdLanguage,
  MdLibraryBooks,
  MdLightMode,
  MdMoreHoriz,
  MdOutlineAccessibility,
  MdOutlineAddBox,
  MdOutlineAddCircleOutline,
  MdOutlineApps,
  MdOutlineBookmarkAdd,
  MdOutlineBookmarks,
  MdOutlineCloud,
  MdOutlineCloudQueue,
  MdOutlineEdit,
  MdOutlineFileUpload,
  MdOutlineLanguage,
  MdOutlineReport,
  MdOutlineSettings,
  MdOutlineSupport,
  MdOutlineUpdate,
  MdPalette,
  MdRefresh,
  MdSearch,
  MdSettingsBackupRestore,
  MdShare,
  MdVerticalSplit,
} from "react-icons/md";
import { RxReader } from "react-icons/rx";
import { useMethod } from "../hook/useMethod";

export function Header() {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const { book, modalAddBookmark } = useBook();
  const { nextPage, lastPage } = useBook();
  const { addBook, exportShelf, backUpBook, importShelf } = useShelf();
  const { isShelf, isSetting, isReading } = usePath();
  const settings = useAppSelector((state) => state.settings);
  const { closeApp } = useSettings();
  const { width } = useWindowSize();
  const { copyText } = useMethod();
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
            icon: <MdOutlineAddCircleOutline />,
            shortcuts: "Ctrl+O",
            onClick: addBook,
            allowed: isShelf,
          },

          {
            type: "item",
            label: "打开书架",
            icon: <MdOutlineAddBox />,
            shortcuts: "ctrl+shift+O",
            allowed: isShelf,

            onClick: importShelf,
          },
          {
            type: "item",
            label: "书籍信息",
            icon: <MdInfoOutline />,
            shortcuts: "Ctrl+I",
            allowed: isReading,
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
            label: "导出书架",
            icon: <MdOutlineFileUpload />,
            shortcuts: "ctrl+E",
            allowed: isShelf,
            onClick: exportShelf,
          },
          {
            type: "item",
            label: "导出书籍",
            icon: <MdOutlineFileUpload />,
            onClick: backUpBook,
            allowed: isShelf,
          },

          {
            type: "divider",
          },
          {
            type: "item",
            label: "分享",
            icon: <MdShare />,
            shortcuts: "ctrl+shift+s",
            allowed: isReading,

            onClick: voidFn,
          },
          {
            type: "divider",
          },
          {
            type: "item",
            label: "退出",
            icon: <MdExitToApp />,
            shortcuts: "ctrl+W",
            onClick: () => Dialog.confirm("确定退出?"),
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
            label: "正在阅读",
            icon: <RxReader />,
            check: isReading,
            shortcuts: "Shift+R",
            onClick: () => {
              nav("/");
            },
          },
          {
            type: "item",
            label: "书架",
            check: isShelf,
            icon: <MdLibraryBooks />,
            shortcuts: "Shift+S",
            onClick: () => {
              nav("/shelf");
            },
          },
          { type: "divider" },
          {
            type: "item",
            label: "显示目录",
            icon: <MdVerticalSplit />,
            allowed: isReading,
            shortcuts: "B",
            check: settings.reading.contentOpen,
            onClick: () => {
              dispatch(settingsSlice.actions.toggleChaptersOpen());
            },
          },
          {
            type: "item",
            label: "显示书签",
            allowed: isReading,
            icon: <MdOutlineBookmarks />,
            onClick: Dialog.message,
          },
          { type: "divider" },
          {
            type: "item",
            label: "最大化/还原",
            onClick: () => remote("window_resize"),
            icon: <MdFullscreen />,
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
            icon: <MdContentCopy />,
            shortcuts: "Ctrl+C",
            allowed: isReading,
            onClick: copyText,
          },
          {
            type: "item",
            label: "复制路径",
            allowed: isReading,
            shortcuts: "Ctrl+D",
            icon: <MdCopyAll />,
            onClick() {
              copyText(book.path);
            },
          },
          {
            type: "divider",
          },
          {
            type: "item",
            label: "添加书签",
            allowed: isReading,
            onClick: () => {
              modalAddBookmark(book.titles[book.progress]?.title);
            },
            icon: <MdOutlineBookmarkAdd />,
          },
          {
            type: "item",
            label: "编辑书签",
            allowed: isReading,
            onClick: Dialog.message,
            icon: <MdOutlineEdit />,
          },
          {
            type: "divider",
          },
          {
            type: "item",
            label: "查找",
            shortcuts: "Ctrl+F",
            allowed: isReading,
            onClick: Dialog.message,
            icon: <MdSearch />,
          },
        ],
      },
      {
        type: "menu",
        label: "工具",
        sub: [
          {
            type: "menu",
            label: "主题",
            icon: <MdPalette />,
            sub: [
              {
                type: "item",
                label: "默认",
                onClick: () => {},
                icon: <MdLightMode />,
              },
              {
                type: "item",
                label: "黑暗",
                onClick: () => {},
                icon: <MdDarkMode />,
              },
              {
                type: "item",
                label: "跟随系统",
                onClick: () => {},
                icon: <MdBrightnessAuto />,
              },
            ],
          },
          {
            type: "menu",
            label: "语言",
            icon: <MdLanguage />,
            sub: [
              {
                type: "item",
                label: "中文",
                onClick: voidFn,
                check: true,
                icon: <MdOutlineLanguage />,
              },
              {
                type: "item",
                label: "英文",
                onClick: voidFn,
                icon: <MdOutlineLanguage />,
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
                    icon: <MdAdd />,
                  },
                ],
                icon: <MdMoreHoriz />,
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "item",
            label: "设置",
            shortcuts: "Ctrl+K",
            onClick: () => {
              nav("/setting");
            },
            icon: <MdOutlineSettings />,
          },
        ],
      },
      {
        type: "menu",
        label: "同步",
        sub: [
          {
            type: "item",
            label: "我的账户",
            icon: <MdAccountCircle />,
            onClick: () => Dialog.message("该功能未开放。"),
          },
          {
            type: "menu",
            label: "服务器设置",
            icon: <MdSettingsBackupRestore />,
            sub: [
              { type: "item", label: "webdav", icon: <MdOutlineCloud /> },
              {
                type: "item",
                label: "添加服务器",
                onClick: voidFn,
                icon: <MdAdd />,
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "item",
            label: "同步设置",
            icon: <MdOutlineCloudQueue />,
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
            icon: <MdDeveloperBoard />,
            onClick: () => remote("window_toggleDevTools"),
          },
          {
            type: "item",
            label: "刷新页面",
            shortcuts: "ctrl+R",
            onClick: () => window.location.reload(),
            icon: <MdRefresh />,
          },
          {
            type: "item",
            label: "检查更新",
            onClick: () => Dialog.message("已更新到最新版本"),
            icon: <MdOutlineUpdate />,
          },
          {
            type: "item",
            label: "我的产品",
            shortcuts: "ctrl+shift+r",
            onClick: () => window.shell.openExternal("http://39.96.54.181"),
            icon: <MdOutlineApps />,
          },
          { type: "divider" },
          {
            type: "item",
            label: "获得支持",
            onClick: Dialog.message,
            icon: <MdOutlineSupport />,
          },
          {
            type: "item",
            label: "查看许可",
            onClick: async () => {
              await Browser.openFile("txt/LICENSE.txt");
            },
            icon: <MdOutlineAccessibility />,
          },
          {
            type: "item",
            label: "报告问题",
            onClick: () => {
              pop.modal(
                <Container sx={{ width: 600 }}>
                  <TextInput
                    placeholder={"输入您要反馈的问题"}
                    onClick={function (): void {}}
                    button
                  />
                </Container>
              );
            },
            icon: <MdOutlineReport />,
          },
          {
            type: "item",
            label: "关于",
            onClick: () => Dialog.message(),
            icon: <MdInfoOutline />,
          },
        ],
      },
    ],
  };

  activeShortCuts(list);

  return (
    <Container cls={"Header"}>
      <SvgIcon icon={<Logo />} size={30} />
      <Button
        label={isSetting ? "设置" : isShelf ? `书架` : "阅读"}
        onClick={() => (isSetting ? nav(-1) : nav(isShelf ? "./" : "./shelf"))}
      />
      {width >= 800 &&
        list.sub?.map((item, key) => {
          return <MenuButton key={key} context={item} />;
        })}
      <MenuButton open={width < 800} label={"菜单"} context={list} />
      <Hangover cls={"draggable"} sx={{ height: "100%" }} />
      <Button
        open={isShelf}
        label={`正在阅读:${book.name}`}
        onClick={() => nav("./")}
      />
      <Button
        open={isReading && book.progress !== 0 && book.path !== ""}
        label={"上一章"}
        onClick={lastPage}
      />
      <Button
        open={isReading && book.progress !== book.total - 1 && book.path !== ""}
        label={"下一章"}
        onClick={nextPage}
      />
      <IconButton
        icon={<VscChromeMinimize />}
        onClick={() => remote("window_min")}
      />
      <IconButton
        icon={<VscPrimitiveSquare />}
        onClick={() => remote("window_resize")}
      />
      <IconButton icon={<VscClose />} onClick={closeApp} />
    </Container>
  );
}

function activeShortCuts(item: Menu_Options) {
  item.sub?.map((item) => {
    if (item.type === "item" && item.shortcuts)
      useHotkeys(item.shortcuts, item.onClick as any, {
        enabled: item.open,
      });
    if (item.type === "menu") activeShortCuts(item);
  });
}
