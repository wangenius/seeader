import React, {memo, useCallback, useLayoutEffect, useRef} from "react";
import {Container, Divider, ListButton, LoadingRing, Menu, Pop,} from "../component";
import {useBook} from "../context/BookProvider";
import {
  MdOutlineContentCopy,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdSearch,
  MdTranslate,
} from "react-icons/md";
import {useSettings} from "../hook/useSettings";
import {BiFontSize} from "react-icons/bi";
import {AiOutlineColumnHeight} from "react-icons/ai";
import {useMethod} from "../hook/useMethod";
import {FontSize, LineHeight} from "../@constant/settings";
import {useEvent} from "../hook/useEvent";
import {useTranslation} from "react-i18next";

/** @Description 主体 */
export const Book = memo(() => (
  <Container open={useBook().book.path !== ""} cls={"BookPage"}>
    <BookContents />
    <BookBody />
  </Container>
));

/** @Description book contents */
const BookContents = memo(() => {
  /** @Description list of contents ref */
  const ListRef = useRef<any>();
  const { book, jumpToPage } = useBook();
  const { settings } = useSettings();
  /** 滚动到顶部*/
  const scrollToCurrentChapterTitle = useCallback<Fn>(() => {
    {
      /** @Description 前六章 定位到0 */
      if (book.progress <= 6) return ListRef.current?.scrollTo(0, 0);
      ListRef.current?.scrollTo(
        0,
        (ListRef.current?.children[book.progress - 3] as HTMLElement).offsetTop
      );
    }
  }, [book.progress]);

  useLayoutEffect(scrollToCurrentChapterTitle);

  return (
    <Container
      cls={"BookContents"}
      ref={ListRef}
      state={settings.reading.contentOpen ? "open" : undefined}
    >
      {book.titles.map((item: { title: string | undefined }, key: number) => (
        <ListButton
          key={key}
          value={key}
          isActive={key === book.progress}
          label={item.title}
          onClick={jumpToPage}
        />
      ))}
    </Container>
  );
});

/** @Description 书正文部分 */
const BookBody = memo(() => {
  /** @Description body ref */
  const ContentRef = useRef<HTMLElement>();
  const { book, currentBody, nextPage, lastPage } = useBook();
  const { settings, changeFontSize, toggleContentBar, changeLineHeight } =
    useSettings();
  const { copyText, searchWeb, translate } = useMethod();
  const { t } = useTranslation();

  /** @Description 更新滚动 */
  useLayoutEffect(() => {
    ContentRef.current?.scrollTo(0, 0);
  }, [currentBody]);

  const NoSelection: () => Props.Menu.Option = useCallback(
    () => ({
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
          type: "menu",
          label: t("font size"),
          icon: <BiFontSize />,
          value: settings.reading.fontSize,
          onClick: changeFontSize,
          sub: [
            {
              type: "item",
              label: t("tiny"),
              value: FontSize.tiny,
            },
            {
              type: "item",
              label: t("small"),
              value: FontSize.small,
            },
            {
              type: "item",
              label: t("medium"),
              value: FontSize.medium,
            },
            {
              type: "item",
              label: t("big"),
              value: FontSize.big,
            },
            {
              type: "item",
              label: t("large"),
              value: FontSize.large,
            },
          ],
        },
        {
          type: "menu",
          label: t("line height"),
          icon: <AiOutlineColumnHeight />,
          onClick: changeLineHeight,
          value: settings.reading.lineHeight,
          sub: [
            {
              type: "item",
              label: t("small"),
              value: LineHeight.small,
            },
            {
              type: "item",
              label: t("medium"),
              value: LineHeight.medium,
            },
            {
              type: "item",
              label: t("big"),
              value: LineHeight.big,
            },
          ],
        },
      ],
    }),
    [settings, book.progress]
  );

  const TextSelected: () => Props.Menu.Option = useCallback(
    () => ({
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
    }),
    [settings]
  );

  const onContextMenu = useEvent((event: React.MouseEvent) => {
    Pop.set(
      <Menu
        children={
          window.getSelection()?.isCollapsed ? NoSelection() : TextSelected()
        }
      />,
      { event: event }
    ).open();
  });

  return (
    <Container
      cls={"BookArea"}
      ref={ContentRef}
      state={settings.reading.contentOpen ? undefined : "full"}
      onContextMenu={onContextMenu}
    >
      <Container cls={"BookBody"}>
        <Container
          cls={"BodyTitle"}
          onClick={() => toggleContentBar()}
          children={`第${book.progress + 1}章  ${
            book.titles[book.progress]?.title
          }`}
        />
        <Divider />
        {currentBody.map((item: any, keys: React.Key) => (
          <Container
            cls={"BodyPara"}
            style={{
              fontSize: settings.reading.fontSize + "rem",
              lineHeight: settings.reading.lineHeight,
              marginBottom: settings.reading.paragraphSpacing + "pc",
            }}
            key={keys}
          >
            {item}
          </Container>
        ))}
        <LoadingRing open={!currentBody.length} />
      </Container>
    </Container>
  );
});
