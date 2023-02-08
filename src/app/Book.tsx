import React, {useRef} from "react";
import {Divider, ListButton, LoadingRing, Once, Spring,} from "@/component";
import {useBook} from "@/context/BookProvider";
import {useSettings} from "@/hook/useSettings";
import {useHotkeys} from "react-hotkeys-hook";
import {Docker, Mainer} from "./Docker";
import {useSpring} from "@react-spring/web";
import {useGesture} from "@use-gesture/react";
import {config} from "react-spring";
import {useWindows} from "@/hook/useWindows";

/** @Description 书页 */
export const Book = () => {
  return (
    <Once open={useBook().book.path !== ""} cs={"BookPage"}>
      <BookDocker />
      <BookMainer />
    </Once>
  );
};

/** @Description 目录部分 */
const BookDocker = () => {
  /** @Description list of contents ref */
  const ListRef = useRef<any>();
  const { book, jumpToPage } = useBook();
  const { settings, toggleContentBar } = useSettings();

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
      changeState={toggleContentBar}
    >
      <Once cs={"list"} ref={ListRef}>
        {book.titles.map((item: { title: string | undefined }, key: number) => (
          <ListButton
            key={key}
            value={key}
            isActive={key === book.progress}
            primary={`${key + 1}`}
            secondary={item.title}
            lc={key === book.progress ? scroll : jumpToPage}
          />
        ))}
      </Once>
    </Docker>
  );
};

/** @Description 书正文部分 */
const BookMainer = () => {
  /** @Description body ref */
  const { book, currentBody, nextPage, lastPage } = useBook();
  const { settings, toggleContentBar } = useSettings();

  useHotkeys("right", nextPage, {
    enabled: book.progress < book.total - 1,
  });
  useHotkeys("left", lastPage, {
    enabled: book.progress > 0,
  });

  /** @Description 自定义样式 */
  const alterStyle = {
    fontSize: settings.reading.fontSize + "rem",
    lineHeight: settings.reading.lineHeight,
    paddingBottom: settings.reading.paragraphSpacing + "pc",
  };

  /** @Description 标题 */
  const title = `第${book.progress + 1}章  ${
    book.titles[book.progress]?.title
  }`;

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

  return (
    <Mainer condition={settings.reading.chapterDocker} rc={nextPage}>
      <Spring
        {...bind()}
        spring={spring}
        cs={"BodyTitle"}
        rc={lastPage}
        lc={toggleContentBar}
        children={title}
      />
      <Divider />
      {currentBody.map((item: any, keys: React.Key) => (
        <Once cs={"BodyPara"} style={alterStyle} key={keys} children={item} />
      ))}
      <LoadingRing open={!currentBody.length} />
      {/*<Spring cls={"toolPanel"}>{Icons.Minus}</Spring>*/}
    </Mainer>
  );
};
