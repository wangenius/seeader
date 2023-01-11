import React, { forwardRef, useEffect, useRef } from "react";
import { Container, Hangover } from "../component/Container";
import { IconButton } from "../component/Button";
import { ListButton, ListContainer } from "../component/List";
import { useTheme } from "../context/ThemeProvider";
import { useBook } from "../context/BookProvider";
import { useMeasure, useWindowSize } from "react-use";
import { Divider } from "../component/Accessory";
import { ElementProps, Menu_Options } from "elementProperty";
import { SX, THEME_CONSTANT } from "../@constant/theme";
import { sxParser } from "../method/parser";
import { useAppSelector } from "../store/store";
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
import { usePop } from "../context/PopProvider";
import { Menu } from "../component/Menu";
import { useSettings } from "../hook/useSettings";
import { BiBookmarkPlus, BiCog, BiFontSize } from "react-icons/bi";
import { AiOutlineColumnHeight } from "react-icons/ai";
import { Range } from "../component/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { Grow } from "@mui/material";
import { Styles } from "../@constant/styles";
import { useMethod } from "../hook/useMethod";

export const Article = forwardRef((props: ElementProps, ref) => {
  const ContentRef = useRef<any>();
  const ListRef = useRef<any>();
  const { theme } = useTheme();
  const {
    book,
    jumpToPage,
    modalAddBookmark,
    currentBody,
    nextPage,
    lastPage,
    modalEditBook,
  } = useBook();
  const settings = useAppSelector((state) => state.settings);
  const [outRef, { height }] = useMeasure();
  const { width } = useWindowSize();
  const { setRoot, rootOpen } = usePop();
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { changeFontSize, toggleContentBar, changeLineHeight } = useSettings();
  const { copyText, searchWeb, translate } = useMethod();

  useEffect(() => {
    ContentRef.current.scrollTo(0, 0);
    if (book.progress <= 6) return;
    scrollToCurrentChapterTitle();
  }, [pathname, currentBody]);

  function scrollToCurrentChapterTitle() {
    const target = ListRef.current?.children[book.progress - 3] as HTMLElement;
    ListRef.current?.scrollTo(0, target.offsetTop);
  }

  const TextSelected: Menu_Options = {
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
  };
  const NoSelection: Menu_Options = {
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
              <Range
                args={THEME_CONSTANT.FontSize}
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
              <Range
                args={THEME_CONSTANT.LineHeight}
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
  };

  const contentStyle = sxParser(
    [
      Styles.content_sx,
      {
        backgroundColor: theme.default.backgroundColor?.default,
        boxShadow: theme.default.shadow?.default,
        width: width - (settings.reading.contentOpen ? 250 : 0),
      },
    ],
    SX.scrollbarSx
  );

  const paragraph = [
    Styles.contentParagraph_sx,
    {
      mt: settings.reading.paragraphSpacing,
      fontSize: `${(settings.reading.fontSize || 10) / 10}rem`,
      lineHeight: `${(settings.reading.lineHeight || 18) / 10}rem`,
    },
  ];

  function onContextMenu(event: React.MouseEvent) {
    setRoot({
      anchor: {
        position: { x: event.clientX, y: event.clientY },
      },
      content: (
        <Menu>
          {!window.getSelection()?.isCollapsed ? TextSelected : NoSelection}
        </Menu>
      ),
    });
    rootOpen();
  }

  return book.path !== "" ? (
    <Container ref={outRef} sx={{ position: "relative" }} full vertex>
      <Grow in={settings.reading.contentOpen}>
        <Container sx={sxParser([Styles.chapterBar_sx], SX.overFlowY)}>
          <Container sx={{ height: 60 }} full flexLayout>
            <Container sx={[Styles.chapterBarTitle_sx]}>{book.name}</Container>
            <Hangover />
            <IconButton
              sx={{ mr: 2 }}
              icon={<MdModeStandby />}
              onClick={scrollToCurrentChapterTitle}
            />
            <IconButton
              sx={{ mr: 2 }}
              icon={<MdEdit />}
              onClick={modalEditBook}
            />
          </Container>
          <ListContainer
            ref={ListRef}
            defaultPosition={book.progress}
            sx={{ width: "100%", height: height - 60 }}
          >
            {book.titles.map((item, key) => (
              <ListButton
                key={key}
                index={key}
                isActive={key === book.progress}
                label={item.title}
                onClick={() => jumpToPage(key)}
              />
            ))}
          </ListContainer>
        </Container>
      </Grow>
      <Container sx={contentStyle} ref={ContentRef}>
        <Container flexLayout col full>
          <Container
            ref={ref}
            onContextMenu={onContextMenu}
            sx={Styles.contentBody_sx}
          >
            <Container>{`第${book.progress + 1}章`}</Container>
            {book.titles[book.progress]?.title}
            <Divider />
            {currentBody.map((item, keys) => (
              <Container sx={paragraph} key={keys}>
                {item}
              </Container>
            ))}
          </Container>
        </Container>
      </Container>
    </Container>
  ) : (
    <Container
      full
      flexLayout
      verticalCenter
      sx={{ height: "100%", color: theme.button.color?.default }}
    >
      无打开文件
    </Container>
  );
});
