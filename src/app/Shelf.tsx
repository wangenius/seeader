import {Button, Container, Icons, Pop, Spring} from "../component";
import {useBook} from "../context/BookProvider";
import {useShelf} from "../context/ShelfProvider";
import React, {memo, useCallback, useMemo, useState} from "react";
import _ from "lodash";
import {voidFn} from "../method";
import {useEvent} from "../hook/useEvent";
import {useTranslation} from "react-i18next";
import {useNav} from "../hook/useNav";
import {useSpring} from "@react-spring/web";
import {useDrag} from "@use-gesture/react";
import {config} from "react-spring";
import {useWindows} from "../hook/useWindows";
import {Docker, DockerButton, Mainer} from "./Docker";
import {useMeasure} from "react-use";

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
        <DockerButton
          label={"add book"}
          onClick={addBook}
          children={Icons.Add}
        />
        <DockerButton
          label={"open shelf"}
          onClick={importShelf}
          children={Icons.LoadDir}
        />
        <DockerButton
          label={"export shelf"}
          onClick={exportShelf}
          children={Icons.Export}
        />
        <DockerButton
          label={"export book"}
          onClick={backUpBook}
          children={Icons.Copy}
        />
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
      <Spring cls={"deleteArea"} spring={spring}>
        {Icons.Minus}
        {"拖动到此处删除"}
      </Spring>
    </Container>
  );
});

/** @Description 封面单体 */
const BookCover = memo((props: Props.BookCover) => {
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

  /** 左键书籍封面 */
  const bookClick = useEvent<Fn>(() => {
    item._id === book._id ? toReading() : openBook(item);
  });

  /** @Description bookItem initial */
  const [spring, api] = useSpring(() => ({
    from: {
      x: 0,
      y: 0,
      scale: 0,
      rotateY: 0,
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

  const onContextMenu = () => {

  };
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
        onContextMenu={onContextMenu}
      >
        <Container cls={"front"}>
          <Container cls={"BookTitle"} children={item.name} />
          <Container cls={"progress"} children={progress} />
        </Container>
      </Container>
    </Spring>
  );
});
