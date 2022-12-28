import { AirDrop, Container } from "../component/Container";
import { overFlowY, sxAssigner } from "../style/sx";
import { useTheme } from "../context/ThemeProvider";
import { Button } from "../component/Button";
import { useBook } from "../context/BookProvider";
import { useShelf } from "../context/ShelfProvider";
import Grid from "@mui/system/Unstable_Grid";

export function Shelf() {
  const { theme } = useTheme();
  const { openBook } = useBook();
  const { addBook, books } = useShelf();
  return (
    <>
      <Container
        full
        sx={sxAssigner(
          [
            {
              height: "100%",
              borderRightColor: theme.palette.container.focus,
              borderRightWidth: 0.5,
              borderRightStyle: "solid",
              alignItems: "start",
              justifyContent: "start",
            },
          ],
          overFlowY
        )}
        flex
        col
      >
        <Grid container spacing={2} component={"div"}>
          {books.map((item, key) => {
            return (
              <Grid
                xs={2}
                sx={{ height: 180 }}
                md={2}
                key={key}
                component={"div"}
              >
                {item.name}
              </Grid>
            );
          })}
        </Grid>

        <Button label={"打开文件"} onClick={addBook} />
      </Container>
    </>
  );
}
