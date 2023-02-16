import React, { useEffect, useRef } from "react";
import {
  Divider,
  ListButton,
  LoadingRing,
  Menu,
  Once,
  Pop,
  Spring,
} from "@/component";
import { useHotkeys } from "react-hotkeys-hook";
import { Docker, Mainer } from "./Docker";
import { useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { config } from "react-spring";
import { useAppSelector } from "@/data/store";
import { _sets } from "@/data/method/_sets";
import {toa} from "@/method/common";
import {app} from "@/method/app";
import {tip} from "@/component/Tip";
import {_chapter} from "@/data/method/_chapter";

/** @Description 书页 */
export const BookPage = () => {
  const book = useAppSelector(state=>state.book)
  return (
    <Once open={book.path !== ""} cs={"BookPage"}>
      <BookDocker />
      <BookMainer />
    </Once>
  );
};

/** @Description 目录部分 */
const BookDocker = () => {
  /** @Description list of contents ref */
  const ListRef = useRef<any>();
  const settings = useAppSelector((state) => state.settings);
  const book = useAppSelector((state) => state.book);

  /** @Description 滚动到当前位置 */
  function scroll() {
    /** @Description 前六章 定位到0 */
    if (book.progress <= 6) return ListRef.current?.scrollTo(0, 0);
    const top = (ListRef.current?.children[book.progress - 3])!.offsetTop;
    return ListRef.current?.scrollTo(0, top);
  }

  return (
    <Docker
      state={settings.reading.chapterDocker!}
      changeState={_sets.contentDocker}
    >
      <Once cs={"list"} ref={ListRef}>
        {book.titles.map((item: { title: string | undefined }, key: number) => (
          <ListButton

            key={key}
            value={key}
            isActive={key === book.progress}
            primary={`${key + 1}`}
            secondary={item.title}
            lc={key === book.progress ? scroll : _chapter.to}
          />
        ))}
      </Once>
    </Docker>
  );
};

/** @Description 书正文部分 */
const BookMainer = () => {
  /** @Description body ref */
  const settings = useAppSelector((state) => state.settings);
  const book = useAppSelector((state) => state.book);
  const chapter = useAppSelector((state) => state.chapter);
  useHotkeys("right", _chapter.next, {
    enabled: book.progress < book.total - 1,
  });
  useHotkeys("left", _chapter.last, {
    enabled: book.progress > 0,
  });

  /** @Description 自定义样式 */
  const alterStyle = {
    fontSize: settings.reading.fontSize + "rem",
    lineHeight: settings.reading.lineHeight,
    paddingBottom: settings.reading.paragraphSpacing + "pc",
  };

  const [spring, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: config.gentle,
  }));

  const bind = useGesture(
    {
      onDrag: (state) => {
        api.start({
          x: state.active ? state.movement[0] : 0,
        });
      },
    },
    {
      drag: {
        filterTaps: true,
      },
    }
  );

  const rc = (event: MouseEvent) => {
    event.stopPropagation();
    _chapter.last();
  };

  const contentRightClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.getSelection()!.toString()) {
      Pop.set(
        <Menu>
          {{
            type: "menu",
            sub: [
              {
                type: "item",
                label: "copy",
                onClick: toa(app.copy,"复制成功"),
              },
              { type: "item", label: "translate", onClick: app.dict },
              { type: "item", label: "search", onClick: app.search },
            ],
          }}
        </Menu>,
        { event: event }
      ).open();
    } else {
      Pop.close();
      _chapter.next();
    }
  };

  return (
    <Mainer condition={settings.reading.chapterDocker} rc={contentRightClick}>
      <Spring
        {...bind()}
        spring={spring}
        cs={"BodyTitle"}
        rc={rc}
        lc={_sets.contentDocker}
        children={book.titles[book.progress]?.title}
      />
      <Divider />
      {chapter?.map((item: any, keys: React.Key) => (
        <Once cs={"BodyPara"} style={alterStyle} key={keys} children={item} />
      ))}
      <LoadingRing open={!chapter?.length} />
    </Mainer>
  );
};
