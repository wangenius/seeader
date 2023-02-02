import {Container, Menu, Pop} from "../component";
import {useBook} from "../context/BookProvider";
import {useShelf} from "../context/ShelfProvider";
import React, {memo, useCallback, useMemo, useState} from "react";
import {
  MdDeleteOutline,
  MdInfoOutline,
  MdModeEditOutline,
  MdOutlineAddBox,
  MdOutlineAddCircleOutline,
  MdOutlineFileUpload,
} from "react-icons/md";
import _ from "lodash";
import {Dialog} from "../method";
import {useEvent} from "../hook/useEvent";
import {useTranslation} from "react-i18next";
import {usePath} from "../hook/usePath";

/** @Description 书架 */
export const Shelf = memo(() => {
  /** @Description 书架方法 */
  const { books, addBook, importShelf, exportShelf, backUpBook } = useShelf();

  const { t } = useTranslation();

  /** @Description 书架菜单 */
  const contextMenu: Props.Menu.Option = {
    type: "menu",
    label: t("file"),
    sub: [
      {
        type: "item",
        label: t("add book"),
        icon: <MdOutlineAddCircleOutline />,
        onClick: addBook,
      },
      {
        type: "item",
        label: t("open shelf"),
        icon: <MdOutlineAddBox />,
        onClick: importShelf,
      },
      {
        type: "divider",
      },
      {
        type: "item",
        label: t("export shelf"),
        icon: <MdOutlineFileUpload />,
        onClick: exportShelf,
      },
      {
        type: "item",
        label: t("export book"),
        icon: <MdOutlineFileUpload />,
        onClick: backUpBook,
      },
    ],
  };

  const onContextMenu = useEvent<Fn>((event) => {
    Pop.set(<Menu>{contextMenu}</Menu>, { event, position: "absolute" }).open();
  });

  return (
    <Container cls={"ShelfArea"} onContextMenu={onContextMenu}>
      {books.map((item: Book, key: number) => (
        <BookCover item={item} key={key} />
      ))}
    </Container>
  );
});

const BookCover = memo((props: { item: Book }) => {
  const { item } = props;
  const { t } = useTranslation();
  const { toReading } = usePath();
  const { book, openBook, modalEditBook, deleteBook } = useBook();

  /** @Description 当前进度百分比 */
  const progress = useMemo(
    () =>
      `进度：${_.round(
        item._id === book._id
          ? ((book.progress + 1) / item.total) * 100
          : ((item.progress + 1) / item.total) * 100,
        2
      )}% `,
    [item, book]
  );

  /** 右键上下文内容 */
  const contextContent: (key: number) => Props.Menu.Option = useCallback(
    () => ({
      type: "menu",
      sub: [
        {
          type: "item",
          label: "编辑",
          icon: <MdModeEditOutline />,
          onClick: () => modalEditBook(item),
        },
        {
          type: "item",
          label: t("path"),
          icon: <MdInfoOutline />,
          onClick(): any {
            window.shell.openExternal(
              item.path.slice(0, item.path.lastIndexOf("\\"))
            );
          },
        },
        {
          type: "item",
          label: "删除",
          cls: "Button_red",
          icon: <MdDeleteOutline />,
          onClick(): any {
            Dialog.confirm("确定删除？").then(() => deleteBook(item));
          },
        },
      ],
    }),
    []
  );

  /** 右键书籍封面 */
  const contextShow = useEvent((event, key) => {
    event.stopPropagation();
    Pop.set(<Menu>{contextContent(key)}</Menu>, {
      event: event,
      position: "absolute",
    }).open();
  });
  /** 左键书籍封面 */
  const bookClick = useEvent<Fn>(() => {
    item._id === book._id ? toReading() : openBook(item);
  });

  return (
    <Container
      cls={"book"}
      onClick={bookClick}
      state={item._id === book._id ? "current" : undefined}
      onContextMenu={contextShow}
    >
      <Container cls={"front"}>
        <Container cls={"BookTitle"} children={item.name} />
        <Container cls={"progress"} children={progress} />
      </Container>
    </Container>
  );
});
