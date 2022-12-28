import { ElementProps } from "../interface";
import { forwardRef, useEffect, useRef, useState } from "react";
import { AirDrop, Container } from "../component/Container";
import { Button } from "../component/Button";
import { overFlowY, scrollbarSx, sxAssigner } from "../style/sx";
import { ListButtonValue, ListContainer } from "../component/List";
import { useTheme } from "../context/ThemeProvider";
import { useBook } from "../context/BookProvider";
const { shell } = window.require("electron");
const fs = window.require("fs");
const iconvLite = window.require("iconv-lite");
interface ArticleProps extends ElementProps {
  children?: string;
}

export const Article = forwardRef((props: ArticleProps, ref) => {
  const textRef = useRef<any>();
  const ContentRef = useRef<any>();
  const { theme } = useTheme();
  const [listItems, setListItems] = useState<ListButtonValue[]>([]);
  const { book, changeCurrentChapter, currentChapter } = useBook();
  const [index, setIndex] = useState(currentChapter);

  useEffect(() => {
    let lists: ListButtonValue[] = [];
    for (let i = 0; i < book.chapters.length; i++) {
      lists.push({
        index: i,
        startIcon: i + 1,
        label: book.chapters[i].title,
        onClick: () => {
          changeCurrentChapter(i);
        },
      });
    }
    setListItems(lists);
  }, [book.chapters]);

  useEffect(() => {
    ContentRef.current.scroll(0, 0);
  }, [currentChapter]);

  const text = (): string[] => {
    let result: string[] = [];
    book.chapters[currentChapter]?.content.split(/\r\n|\n/).map((item, key) => {
      result.push(item.replace(/(^\s+)|(\s+$)/g, "").replace(/\s/g, ""));
    });
    return result;
  };

  return (
    <>
      <Container
        sx={sxAssigner(
          [
            {
              height: "100%",
              width: 250,
              borderRightColor: theme.palette.container.focus,
              borderRightWidth: 0.5,
              borderRightStyle: "solid",
            },
          ],
          overFlowY
        )}
        flex
        col
      >
        <Container
          sx={{
            width: "100%",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            my: 2,
            ml: 5,
          }}
        >
          {"目录"}
        </Container>
        <AirDrop sx={{ width: "100%" }}>
          <ListContainer index={currentChapter} listItems={listItems} />
        </AirDrop>
      </Container>
      <AirDrop
        sx={sxAssigner(
          [
            {
              height: "100%",
              overflowY: "scroll",
              transition: "all 300ms ease",
              scrollBehavior: "smooth",
              scrollbarWidth: "8px",
              position: "relative",
            },
          ],
          scrollbarSx
        )}
        ref={ContentRef}
      >
        <Container sx={{ m: 4, fontSize: "1.52rem" }}>
          {book.chapters[currentChapter]?.title}
        </Container>
        <Container
          full
          sx={{
            borderBottom: `1px solid ${theme.palette.container.focus}`,
            mb: 2,
          }}
        ></Container>

        <Container ref={ref} sx={{ textAlign: "justify", px: 3 }}>
          {text().map((it, keys) => {
            return (
              <Container sx={{ mt: 1, textIndent: "2rem" }} key={keys}>
                {it}
              </Container>
            );
          })}
          <Container flex col sx={{ position: "fixed", bottom: 60, right: 30 }}>
            {/*<Button*/}
            {/*  label={"目录"}*/}
            {/*  onClick={() => {*/}
            {/*    setOpenContent((pre) => !pre);*/}
            {/*  }}*/}
            {/*/>*/}
            <Button
              open={currentChapter !== 0}
              label={"上一章"}
              onClick={() => changeCurrentChapter(currentChapter - 1)}
            />
            <Button
              open={currentChapter !== book.chapters.length - 1}
              label={"下一章"}
              onClick={() => changeCurrentChapter(currentChapter + 1)}
            />
          </Container>
        </Container>
      </AirDrop>
    </>
  );
});
