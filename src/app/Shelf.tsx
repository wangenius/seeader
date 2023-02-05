import {Container, Menu, Pop, Spring} from "../component";
import {useBook} from "../context/BookProvider";
import {useShelf} from "../context/ShelfProvider";
import React, {memo, useCallback, useMemo} from "react";
import _ from "lodash";
import {Dialog, voidFn} from "../method";
import {useEvent} from "../hook/useEvent";
import {useTranslation} from "react-i18next";
import {useNav} from "../hook/useNav";
import {useSpring} from "@react-spring/web";
import {useDrag} from "@use-gesture/react";
import {config} from "react-spring";
import {useWindows} from "../hook/useWindows";
import {Docker, Mainer} from "./Docker";
import Add from "../@static/add.svg";
import LoadDir from "../@static/loadDir.svg";
import Export from "../@static/export.svg";
import Copy from "../@static/copy.svg";
import {useMeasure} from "react-use";
import {Tooltip} from "@mui/material";

/** @Description 书架 */
export const Shelf = memo(() => {
  /** @Description 书架方法 */
  const { books, addBook, importShelf, exportShelf, backUpBook } = useShelf();
  const { w_height, w_width } = useWindows();

  const [Ref, { width }] = useMeasure();

  /** @Description drag zone 触发位置 */
  const dragZonePosition: Props.DragZone = {
    width: 300,
    height: 100,
    left: w_width - 280,
    top: w_height - 230,
  };

  /** @Description drag zone 默认样式 */
  const dragZoneStyle = {
    backgroundColor: "#fff",
    color: "#3f3d3d",
    left: w_width + 20,
  };

  /** @Description 初始值 */
  const [spring, api] = useSpring(() =>
    _.assign({}, dragZonePosition, dragZoneStyle)
  );

  /** @Description gesture 对象 拖拽时触发 */
  const onDrag = (state: boolean = true) => {
    api.start({
      left: state ? dragZonePosition.left : dragZoneStyle.left,
    });
  };

  /** @Description gesture 对象 拖拽到目标位置并松开触发 */
  const onDest = (state: boolean = true) => {
    api.start({
      backgroundColor: state ? "#2b41e5" : dragZoneStyle.backgroundColor,
      color: state ? dragZoneStyle.backgroundColor : dragZoneStyle.color,
    });
  };

  return (
    <Container cls={"ShelfArea"}>
      <Docker ref={Ref} state={true} width={width}>
        <DockerButton onClick={addBook}>
          <Add />
        </DockerButton>
        <DockerButton onClick={importShelf}>
          <LoadDir />
        </DockerButton>
        <DockerButton onClick={exportShelf}>
          <Export />
        </DockerButton>
        <DockerButton onClick={backUpBook}>
          <Copy />
        </DockerButton>
      </Docker>
      <Mainer width={width}>
        {books.map((item, key) => (
          <BookCover
            onDest={onDest}
            onDrag={onDrag}
            DestAnchor={dragZonePosition}
            item={item}
            key={key}
            index={key}
          />
        ))}
      </Mainer>
      <Spring cls={"deleteArea"} spring={spring} children={"拖动到此处删除"} />
    </Container>
  );
});

const DockerButton = (props: Props.Base) => {
  return (
    <Tooltip title={props.title} placement={'top'} className={"svgButton"}>
      <Container onClick={props.onClick}>{props.children}</Container>
    </Tooltip>
  );
};

/** @Description 封面单体 */
const BookCover = memo(
  (props: {
    item: Book;
    index: number;
    DestAnchor?: Props.DragZone;
    /** @Description gesture 对象拖拽时触发 */
    onDrag?(): void;
    /** @Description gesture 对象 拖拽到目标位置并松开触发 */
    onDest?(): void;
  }) => {
    const { item, index, onDrag = voidFn, onDest = voidFn, DestAnchor } = props;
    const { t } = useTranslation();
    const { toReading } = useNav();
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
            label: t("edit"),
            onClick: () => modalEditBook(item),
          },
          {
            type: "item",
            label: t("path"),
            onClick(): any {
              window.shell.openExternal(
                item.path.slice(0, item.path.lastIndexOf("\\"))
              );
            },
          },
          {
            type: "item",
            label: t("delete"),
            cls: "Button_red",
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

    /** @Description bookItem initial */
    const [spring, api] = useSpring(() => ({
      from: {
        x: 0,
        y: 0,
        zIndex: 20,
        scale: 0,
      },
      to: {
        scale: 1,
      },
      delay: index * 100,
      config: {
        mass: 2,
        tension: 400,
      },
    }));

    /** @Description check if the drag item is in the dest zone, return boolean */
    const inDest = useCallback(
      (current: { x: number; y: number }) => {
        return (
          DestAnchor!.left <= current.x &&
          current.x <= DestAnchor!.width + DestAnchor!.left &&
          current.y <= DestAnchor!.height + DestAnchor!.top &&
          current.y >= DestAnchor!.top
        );
      },
      [DestAnchor]
    );

    /** @Description bind drag hook */
    const bind = useDrag(
      ({ down, active, movement: [mx, my], initial, cancel }) => {
        /** @Description drag item spring start */
        api.start({
          x: active ? mx : 0,
          y: active ? my : 0,
          delay: 0,
          config: active ? config.stiff : config.wobbly,
        });

        /** @Description when down, trigger the onDrag method */
        onDrag(down);
        /** @Description if item (use event position) is in dest zone, trigger the onDest method*/
        if (inDest({ y: initial[1] + my, x: initial[0] + mx })) onDest();
        else onDest(false);

        /** @Description if place the item in the dest zone, do the function*/
        if (inDest({ y: initial[1] + my, x: initial[0] + mx }) && !down) {
          /** @Description end the drag */
          cancel();
          /** @Description deleteBook */
          Pop.confirm(`确认删除${item.name}?`, () => {
            deleteBook(item);
          });
        }
      },
      {
        /** @Description cancel the default event matter */
        filterTaps: true,
      }
    );

    return (
      <Spring
        {...bind()}
        style={{ touchAction: "none", overflow: "visible" }}
        spring={spring}
      >
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
      </Spring>
    );
  }
);
