import React, {useCallback, useRef} from "react";
import {Container, Divider, ListButton, LoadingRing, Spring,} from "../component";
import {useBook} from "../context/BookProvider";
import {
  MdOutlineContentCopy,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineSettings,
  MdSearch,
  MdTranslate,
} from "react-icons/md";
import {useSettings} from "../hook/useSettings";
import {useMethod} from "../hook/useMethod";
import {useEvent} from "../hook/useEvent";
import {useTranslation} from "react-i18next";
import {useNav} from "../hook/useNav";
import {useHotkeys} from "react-hotkeys-hook";
import {Docker, Mainer} from "./Docker";
import {useSpring} from "@react-spring/web";
import {useGesture} from "@use-gesture/react";
import {config} from "react-spring";
import {useMeasure} from "react-use";

/** @Description 书页 */
export const Book = () => {
  return (
    <Container open={useBook().book.path !== ""} cls={"BookPage"}>
      <BookDocker />
      <BookMainer />
    </Container>
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
      <Container cls={"list"} ref={ListRef}>
        {book.titles.map((item: { title: string | undefined }, key: number) => (
          <ListButton
            key={key}
            value={key}
            isActive={key === book.progress}
            label={item.title}
            onClick={key === book.progress ? scroll : jumpToPage}
          />
        ))}
      </Container>
    </Docker>
  );
};

/** @Description 书正文部分 */
const BookMainer = () => {
  /** @Description body ref */
  const { book, currentBody, nextPage, lastPage } = useBook();
  const { settings, toggleContentBar } = useSettings();
  const { copyText, searchWeb, translate } = useMethod();
  const { t } = useTranslation();
  const { toSetting } = useNav();

  useHotkeys("right", nextPage, {
    enabled: book.progress < book.total - 1,
  });
  useHotkeys("left", lastPage, {
    enabled: book.progress > 0,
  });

  const TextBodyMenu: () => Props.Menu.Option = useCallback(
    () =>
      window.getSelection()?.isCollapsed
        ? {
            type: "menu",
            sub: [
              {
                type: "item",
                label: t("next"),
                icon: <MdOutlineKeyboardArrowRight />,
                open: book.progress < book.total - 1,
                onClick: nextPage,
              },
              {
                type: "item",
                label: t("last"),
                open: book.progress > 0,
                icon: <MdOutlineKeyboardArrowLeft />,
                onClick: lastPage,
              },
              { type: "divider" },
              {
                type: "item",
                label: t("settings"),
                icon: <MdOutlineSettings />,
                onClick: toSetting,
              },
            ],
          }
        : {
            type: "menu",
            sub: [
              {
                type: "item",
                label: t("copy"),
                icon: <MdOutlineContentCopy />,
                shortcuts: "Ctrl+C",
                onClick: copyText,
              },

              {
                type: "item",
                label: t("translate"),
                shortcuts: "Ctrl+T",
                icon: <MdTranslate />,
                onClick: translate,
              },
              {
                type: "item",
                label: t("search"),
                icon: <MdSearch />,
                shortcuts: "Ctrl+F",
                onClick: searchWeb,
              },
            ],
          },
    [settings, book.progress]
  );

  const [Ref, position] = useMeasure();
  /** @Description 右键 */
  const onContextMenu = useEvent((event: React.MouseEvent) => {
    if (event.clientX >= position.x + position.width / 2) return nextPage();
    return lastPage();
  });

  /** @Description 自定义样式 */
  const alterStyle = {
    fontSize: settings.reading.fontSize + "rem",
    lineHeight: settings.reading.lineHeight,
    paddingBottom: settings.reading.paragraphSpacing + "pc",
  };

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
    <Mainer
      ref={Ref}
      condition={settings.reading.chapterDocker}
      onContextMenu={onContextMenu}
    >
      <Spring
        {...bind()}
        spring={spring}
        cls={"BodyTitle"}
        onClick={toggleContentBar}
        children={title}
      />
      <Divider />
      {currentBody.map((item: any, keys: React.Key) => (
        <Container
          cls={"BodyPara"}
          style={alterStyle}
          key={keys}
          children={item}
        />
      ))}
      <LoadingRing open={!currentBody.length} />
    </Mainer>
  );
};
