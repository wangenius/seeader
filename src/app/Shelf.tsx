import { Container, Menu, pop } from "../component";
import { useBook } from "../context/BookProvider";
import { useShelf } from "../context/ShelfProvider";
import React, { memo, useCallback, useState } from "react";
import {
  MdDeleteOutline,
  MdInfoOutline,
  MdModeEditOutline,
  MdOpenInNew,
} from "react-icons/md";
import __ from "lodash";
import { Book } from "../@types/object";
import { useNavigate } from "react-router-dom";
import { Dialog } from "../method";
import { useEvent } from "../hook/useEvent";
import { ElementProps, Menu_Options } from "elementProperty";
import { Fn } from "../@types/context";

export const Shelf = memo(() => {
  const { openBook, deleteBook, modalEditBook } = useBook();
  const { book } = useBook();
  const { books } = useShelf();

  /*选中的书index*/
  const [hoveredBookIndex, setHoveredBookIndex] = useState<number>();
  const nav = useNavigate();

  /** 右键上下文内容 */
  const contextContent: (key: number) => Menu_Options = useCallback(
    (key: number) => ({
      type: "menu",
      sub: [
        {
          type: "item",
          icon: <MdOpenInNew />,
          label: "打开",
          onClick: () => openBook(books[key]),
        },
        {
          type: "item",
          label: "编辑",
          icon: <MdModeEditOutline />,
          onClick: () => modalEditBook(books[key]),
        },
        {
          type: "item",
          label: "打开文件本地位置",
          icon: <MdInfoOutline />,
          onClick(): any {
            window.shell.openExternal(
              books[key].path.slice(0, books[key].path.lastIndexOf("\\"))
            );
          },
        },
        {
          type: "item",
          label: "信息",
          icon: <MdInfoOutline />,
          onClick: () => {
            pop.modal(<Container>{books[key].name}</Container>);
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
            Dialog.confirm("确定删除？").then(() => deleteBook(books[key]));
          },
        },
      ],
    }),
    []
  );

  /** 右键书籍封面 */
  const contextShow = useEvent((event, key) => {
    setHoveredBookIndex(key);
    pop.modal(<Menu>{contextContent(key)}</Menu>, {
      event: event,
      position: "absolute",
    });
  });

  /** 左键书籍封面 */
  const bookClick = useEvent<Fn>((event, key) => {
    books[key]._id === book._id ? nav("/") : openBook(books[key]);
  });

  return (
    <Container cls={"ShelfArea"}>
      {books.map((item, key) => {
        return (
          <BookCover
            item={item}
            index={key}
            key={key}
            onClick={bookClick}
            modalHover={hoveredBookIndex === key}
            onContextMenu={contextShow}
          />
        );
      })}
    </Container>
  );
});

interface CoverIFC extends ElementProps {
  url?: string;
  modalHover?: boolean;
  item: Book;
}

const BookCover = memo((props: CoverIFC) => {
  const { index, url, modalHover, onClick, onContextMenu, item } = props;
  const { book } = useBook();

  return (
    <Container cls={"BookGrid"}>
      <Container
        index={index}
        cls={"BookCover"}
        state={modalHover ? "focus" : undefined}
        onClick={onClick}
        onContextMenu={onContextMenu}
      >
        <Container cls={"BookTitle"}>{item.name}</Container>
        <Container
          open={item._id === book._id}
          cls={"Tip"}
        >{`正在阅读`}</Container>
        <Container
          sx={{
            fontSize: "0.76rem",
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
});
