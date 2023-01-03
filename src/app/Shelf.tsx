import { Hangover, Container } from "../component/Container";
import { useTheme } from "../context/ThemeProvider";
import { Button, IconButton, SvgIcon } from "../component/Button";
import { useBook } from "../context/BookProvider";
import { useShelf } from "../context/ShelfProvider";
import { useEffectOnce } from "react-use";
import { Delete, Edit, Info } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useLoading } from "../context/LoadingProvider";
import { useState } from "react";
import { voidFn } from "../method/general";
import { Dialog } from "../method/Invoke";
import { overFlowY } from "../constant/theme";
import { sxParser } from "../method/parser";

export function Shelf() {
  const { theme } = useTheme();
  const { openBook, book } = useBook();
  const { addBook, books, updateBook, deleteBook, exportShelf, backUpBook } =
    useShelf();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, closeLoading } = useLoading();
  const [editMode, setEditMode] = useState(false);

  useEffectOnce(() => {
    updateBook({ name: book.name, path: book.path, progress: book.progress });
  });

  return (
    <>
      <Container
        full
        sx={sxParser(
          [
            {
              height: "100%",
              borderRightColor: theme.palette.container.focus,
              borderRightWidth: 0.5,
              borderRightStyle: "solid",
              alignItems: "start",
              justifyContent: "start",
              p: 2,
            },
          ],
          overFlowY
        )}
        flexLayout
        col
      >
        <Container flexLayout full>
          <Button label={"添加书籍"} onClick={addBook} />
          <Button label={"导出书架"} onClick={exportShelf} />
          <Button label={"书籍备份"} onClick={backUpBook} />
          <Hangover />
          <Button label={"排序"} onClick={voidFn} />
          <Button
            sx={
              editMode
                ? {
                    backgroundColor: "red",
                    div: {
                      color: theme.palette.container.default,
                    },
                    ":hover": {
                      backgroundColor: "darkred",
                      div: {
                        color: theme.palette.container.default,
                      },
                    },
                  }
                : {}
            }
            label={editMode ? "编辑模式" : "编辑书架"}
            onClick={() => {
              setEditMode((pre) => !pre);
            }}
          />
        </Container>

        <Container
          sx={{
            display: "grid",
            width: "100%",
            gridGap: "20px 20px",
            pt: 2,
            gridTemplateColumns: "repeat(auto-fill, 160px)",
            overflow: "visible",
            mx: "auto",
          }}
        >
          {books.map((item, key) => {
            return (
              <Container
                key={key}
                col
                sx={{
                  display: "inline-flex",
                  overflow: "visible",
                }}
              >
                <Container
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    width: 160,
                    height: 200,
                    transition: "all 300ms ease",
                    backgroundColor: theme.palette.buttonChar.default,
                    cursor: "pointer",
                    boxShadow:
                      " rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                    ":hover": {
                      backgroundColor: "rgba(0, 0, 10, 0.6)",
                    },
                  }}
                  onClick={() => loading(() => openBook(item))}
                >
                  <Container
                    sx={{
                      p: 2,
                      margin: " 20px auto",
                      color: theme.palette.background.main,
                      textAlign: "justify",
                      userSelect: "none",
                    }}
                  >
                    {item.name}
                  </Container>
                  <Container
                    sx={{
                      fontSize: "0.76rem",
                      color: "rgba(200,200,200,1)",
                      position: "absolute",
                      bottom: 4,
                      left: 4,
                    }}
                  >{`进度：第${item.progress + 1}章 `}</Container>
                </Container>
                <Container flexLayout full sx={{ mt: 0.3, height: 30 }}>
                  <Hangover />
                  <IconButton
                    open={!editMode}
                    onClick={() =>
                      Dialog.message(
                        `名称: ${item.name}\n 路径：${
                          item.path
                        } \n 当前进度：第${item.progress + 1}章`
                      )
                    }
                    icon={<Info />}
                  />
                  <IconButton
                    open={editMode}
                    onClick={() => Dialog.confirm("是否编辑")}
                    icon={<Edit />}
                  />
                  <IconButton
                    open={editMode}
                    onClick={() =>
                      Dialog.confirm("确定删除？").then(() => deleteBook(item))
                    }
                    icon={<Delete />}
                  />
                </Container>
              </Container>
            );
          })}
        </Container>
      </Container>
    </>
  );
}
