import React, { memo, useCallback, useLayoutEffect, useRef } from "react";
import {
  Container,
  Divider,
  Hangover,
  IconButton,
  ListButton,
  LoadingRing,
  Menu,
  pop,
  SliderInput,
} from "../component";
import { useBook } from "../context/BookProvider";
import { Menu_Options } from "elementProperty";
import {
  MdEdit,
  MdFormatListBulleted,
  MdModeStandby,
  MdOutlineBookmarks,
  MdOutlineContentCopy,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdSearch,
  MdTranslate,
} from "react-icons/md";
import { useSettings } from "../hook/useSettings";
import { BiBookmarkPlus, BiCog, BiFontSize } from "react-icons/bi";
import { AiOutlineColumnHeight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useMethod } from "../hook/useMethod";
import { SliderInstance } from "../@constant/slider";
import { useEvent } from "../hook/useEvent";
import { Fn } from "../@types/context";
import { useSpring } from "@react-spring/web";

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
  const { settings } = useSettings();
  const { book, jumpToPage, modalEditBook } = useBook();
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
    <Container cls={"BookContents"}>
      <Container cls={"Title"}>
        <Container children={book.name} />
        <Hangover />
        <IconButton
          icon={<MdModeStandby />}
          onClick={scrollToCurrentChapterTitle}
        />
        <IconButton icon={<MdEdit />} onClick={modalEditBook} />
      </Container>
      <Container /** @Description 目录 */ cls={"Contents"} ref={ListRef}>
        {book.titles.map((item, key) => (
          <ListButton
            key={key}
            index={key}
            isActive={key === book.progress}
            label={item.title}
            onClick={() => jumpToPage(key)}
          />
        ))}
      </Container>
    </Container>
  );
});

/** @Description 书正文部分 */
const BookBody = memo(() => {
  /** @Description body ref */
  const ContentRef = useRef<HTMLElement>();
  const { book, modalAddBookmark, currentBody, nextPage, lastPage } = useBook();
  const { changeFontSize, toggleContentBar, changeLineHeight } = useSettings();
  const { copyText, searchWeb, translate } = useMethod();
  const { settings } = useSettings();
  const nav = useNavigate();

  useLayoutEffect(() => {
    ContentRef.current?.scrollTo(0, 0);
  }, [currentBody]);

  const NoSelection: () => Menu_Options = useCallback(
    () => ({
      type: "menu",
      sub: [
        {
          type: "item",
          label: "下一章",
          shortcuts: "Right",
          icon: <MdOutlineKeyboardArrowRight />,
          open: book.progress < book.total - 1,
          onClick: nextPage,
        },
        {
          type: "item",
          label: "上一章",
          open: book.progress > 0,
          shortcuts: "Left",
          icon: <MdOutlineKeyboardArrowLeft />,
          onClick: lastPage,
        },
        {
          type: "item",
          label: "显示目录",
          shortcuts: "Ctrl+B",
          icon: <MdFormatListBulleted />,
          check: settings.reading.contentOpen,
          onClick: toggleContentBar,
        },

        {
          type: "item",
          label: "添加书签",
          shortcuts: "Ctrl+M",
          icon: <MdOutlineBookmarks />,
          onClick: () => modalAddBookmark(book.titles[book.progress]?.title),
        },
        { type: "divider" },
        {
          type: "menu",
          label: "文字大小",
          icon: <BiFontSize />,
          sub: [
            {
              type: "title",
              label: (
                <SliderInput
                  args={SliderInstance.FontSize}
                  defaultValue={settings.reading.fontSize}
                  getAriaValueText={(value) => value.toString()}
                  onChange={changeFontSize}
                />
              ),
            },
          ],
        },
        {
          type: "menu",
          label: "行间距",
          icon: <AiOutlineColumnHeight />,
          sub: [
            {
              type: "title",
              label: (
                <SliderInput
                  args={SliderInstance.LineHeight}
                  defaultValue={settings.reading.lineHeight}
                  onChange={changeLineHeight}
                />
              ),
            },
          ],
        },

        { type: "divider" },
        {
          type: "item",
          label: "设置",
          icon: <BiCog />,
          onClick: () => nav("./setting"),
        },
      ],
    }),
    [settings, book.progress]
  );
  const TextSelected: () => Menu_Options = useCallback(
    () => ({
      type: "menu",
      sub: [
        {
          type: "item",
          label: "复制",
          icon: <MdOutlineContentCopy />,
          shortcuts: "Ctrl+C",
          onClick: copyText,
        },
        {
          type: "item",
          label: "搜索",
          icon: <MdSearch />,
          shortcuts: "Ctrl+F",
          onClick: searchWeb,
        },
        {
          type: "item",
          label: "翻译",
          shortcuts: "Ctrl+T",
          icon: <MdTranslate />,
          onClick: translate,
        },
        { type: "divider" },
        {
          type: "item",
          label: "添加书签",
          shortcuts: "Ctrl+M",
          icon: <BiBookmarkPlus />,
          onClick: modalAddBookmark,
        },
      ],
    }),
    [settings]
  );

  const onContextMenu = useEvent((event: React.MouseEvent) => {
    pop(
      <Menu
        children={
          window.getSelection()?.isCollapsed ? NoSelection() : TextSelected()
        }
      />,
      { event: event }
    );
    pop.open();
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
          children={`第${book.progress + 1}章  ${
            book.titles[book.progress]?.title
          }`}
        />
        <Divider />
        {currentBody.map((item, keys) => (
          <Container
            cls={"BodyPara"}
            style={{
              fontSize:settings.reading.fontSize + 'rem',
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
