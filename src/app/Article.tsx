import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Hangover, Container } from "../component/Container";
import { IconButton } from "../component/Button";
import { ListContainer } from "../component/List";
import { useTheme } from "../context/ThemeProvider";
import { useBook } from "../context/BookProvider";
import { useMeasure, useWindowSize } from "react-use";
import { Edit, MyLocation } from "@mui/icons-material";
import { Divider } from "../component/Accessory";
import { useSnackbar } from "notistack";
import { SpringContainer } from "../component/Spring";
import { useSpring } from "@react-spring/web";
import { ElementProps, ListButtonValue } from "elementProperty";
import { overFlowY, scrollbarSx } from "../constant/theme";
import { sxParser } from "../method/parser";

export const Article = forwardRef((props: ElementProps, ref) => {
  const ContentRef = useRef<any>();
  const { theme } = useTheme();
  const [listItems, setListItems] = useState<ListButtonValue[]>([]);
  const { book, changeCurrentChapter, chapterDocker } = useBook();
  const [outRef, { height }] = useMeasure();
  const { width } = useWindowSize();
  const [animateInit, setAnimateInit] = useState(chapterDocker ? 250 : 0);
  const [contentWidth, setContentWidth] = useState<number>();
  useEffect(() => {
    setContentWidth(width - 250);
  }, [width]);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => changeChapters(book.chapters), [book.chapters]);
  useEffect(() => ContentRef.current.scroll(0, 0), [book.progress]);
  const chapterBar_sx: Style.SXs = [
    {
      paddingLeft: "18px",
      height: "100%",
      width: 250,
      borderRightColor: theme.palette.container.focus,
      borderRightWidth: 0.5,
      borderRightStyle: "solid",
    },
  ];
  const content_sx: Style.SXs = [
    {
      pl: 1.5,
      justifyContent: "left",
      backgroundColor: theme.palette.background.main,
      height: "100%",
      overflowY: "scroll",
      transition: "all 300ms ease",
      scrollBehavior: "smooth",
      scrollbarWidth: "8px",
      position: "relative",
      boxShadow: "rgba(0, 0, 0, 0.54)" + "0px 0px 60px -20px",
    },
  ];
  const chapterBarTitle_sx = {
    lineHeight: "60px",
    maxWidth: "70%",
    height: 60,
    pl: 2,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "1.4rem",
  };
  const contentParagraph_sx = {
    mt: 1,
    textIndent: "2rem",
    fontSize: "1rem",
    lineHeight: "1.6rem",
  };

  function changeChapters(chapters: Chapter[]) {
    let lists: ListButtonValue[] = [];
    for (let i = 0; i < chapters.length; i++) {
      lists.push({
        index: i,
        startIcon: i + 1,
        label: chapters[i].title,
        onClick: () => changeCurrentChapter(i),
      });
    }
    setListItems(lists);
  }

  const text = (): string[] => {
    let result: string[] = [];
    book.chapters[book.progress]?.content.split(/\r\n|\n/).map((item, key) => {
      result.push(item.replace(/(^\s+)|(\s+$)/g, "").replace(/\s/g, ""));
    });
    return result;
  };

  const style = useSpring({
    from: { width: animateInit, height: "100%" },
    to: {
      width: chapterDocker ? 250 : 0,
    },
    config: {},
    delay: 0,
    loop: false,
  });

  return (
    <Container open={book.path !== ""} ref={outRef} flexLayout full vertex>
      <SpringContainer style={style}>
        <Container sx={sxParser(chapterBar_sx, overFlowY)}>
          <Container sx={{ height: 60 }} full flexLayout>
            <Container sx={chapterBarTitle_sx}>{book.name}</Container>
            <Hangover />
            <IconButton
              sx={{ mr: 2 }}
              icon={<MyLocation />}
              onClick={() =>
                enqueueSnackbar("暂未开放该功能", {
                  variant: "warning",
                })
              }
            />
            <IconButton
              sx={{ mr: 2 }}
              icon={<Edit />}
              onClick={() =>
                enqueueSnackbar("暂未开放该功能", {
                  variant: "warning",
                })
              }
            />
          </Container>
          <ListContainer
            sx={{ width: "100%", height: height - 60 }}
            activeIndex={book.progress}
            listItems={listItems}
          />
        </Container>
      </SpringContainer>

      <Container full sx={sxParser(content_sx, scrollbarSx)} ref={ContentRef}>
        <Container flexLayout col full>
          <Container
            ref={ref}
            sx={{
              m: 2,
              width: width - (chapterDocker ? 250 : 0),
              maxWidth: 900,
              textAlign: "justify",
              px: 3,
              fontSize: "1.62rem",
            }}
          >
            <Container>{`第${book.progress + 1}章`}</Container>
            {book.chapters[book.progress]?.title}
            <Divider />
            {text().map((it, keys) => (
              <Container sx={contentParagraph_sx} key={keys}>
                {it}
              </Container>
            ))}
          </Container>
        </Container>
      </Container>
    </Container>
  );
});
