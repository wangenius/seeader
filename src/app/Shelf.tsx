import {Divider, Icons, Once, SVG} from "@/component";
import {useBook} from "@/context/BookProvider";
import {useShelf} from "@/context/ShelfProvider";
import React, {memo, useMemo, useState} from "react";
import _ from "lodash";
import {useTranslation} from "react-i18next";
import {useNav} from "@/hook/useNav";
import {Docker, DockerButton, Mainer} from "./Docker";
import {Dialog} from "@/method";

/** @Description 书架 */
export const Shelf = memo(() => {
  /** @Description 书架方法 */
  const { books, addBook, importShelf, exportShelf, backUpBook } = useShelf();
  const { deleteBook,modalEditBook} = useBook();
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const width = 60;

  const onSelected = (item: Book) => {
    setSelectedBooks((prevState) =>
      prevState.includes(item)
        ? _.remove(prevState, (it) => item !== it)
        : prevState.concat(item)
    );
  };
  const onCancelSelected = (item: Book) => {
    setSelectedBooks((prevState) => _.remove(prevState, (it) => item !== it));
  };
  const cancelSelected = () => {
    setSelectedBooks([]);
  };

  return (
    <Once cs={"ShelfArea"}>
      <Docker state={!selectedBooks.length} width={width}>
        <DockerButton label={"add book"} lc={addBook} children={Icons.Add} />
        <DockerButton
          label={"change shelf"}
          lc={importShelf}
          children={Icons.Box}
        />
        <Divider />
        <DockerButton
          label={"export shelf"}
          lc={exportShelf}
          children={Icons.Export}
        />
      </Docker>
      <Docker state={!!selectedBooks.length} width={width}>
        <DockerButton
          label={"edit"}
          lc={() => modalEditBook(selectedBooks[0])}
          children={Icons.Edit}
        />
        <DockerButton
          label={"export"}
          lc={() => backUpBook(selectedBooks)}
          children={Icons.Copy}
        />
        <Divider />
        <DockerButton
          label={"delete book"}
          lc={() => deleteBook(selectedBooks)}
          children={Icons.Remove}
        />
        <DockerButton
          label={"book info"}
          lc={() =>
            Dialog.message(
              selectedBooks[0].name +
                "\n" +
                selectedBooks[0]._id +
                "\n" +
                selectedBooks[0].path +
                "\n" +
                selectedBooks[0].total +
                "章"
            )
          }
          children={Icons.Info}
        />
      </Docker>
      <Mainer width={width} lc={cancelSelected}>
        {books.map((item, key) => (
          <BookCover
            selected={selectedBooks.includes(item)}
            onSelected={onSelected}
            onCancelSelected={onCancelSelected}
            selectedExist={!!selectedBooks.length}
            item={item}
            key={key}
          />
        ))}
      </Mainer>
    </Once>
  );
});

/** @Description 封面单体 左键打开 右键选中 */
const BookCover = memo((props: Props.BookCover) => {
  const {
    item,
    onSelected,
    onCancelSelected,
    selectedExist,
    selected = false,
  } = props;
  const { t } = useTranslation();
  const { toReading } = useNav();
  const { book, openBook } = useBook();
  const isReading = item._id === book._id;

  /** @Description 当前进度百分比 */
  const progress = useMemo(
    () =>
      _.round(
        (((isReading ? book.progress : item.progress) + 1) / item.total) * 100,
        2
      ) + "%",
    [item, book]
  );

  const rc: Click = () =>
    selected ? onCancelSelected(item) : onSelected(item);

  const lc: Click = (e) => {
    e.stopPropagation();
    selected
      ? onCancelSelected(item)
      : selectedExist
      ? onSelected(item)
      : isReading
      ? toReading()
      : openBook(item);
  };

  return (
    <Once rc={rc} lc={lc} cs={"book"} state={selected ? "selected" : undefined}>
      <SVG cs={"selected"} icon={Icons.Done} />
      <Once cs={"BookTitle"} children={item.name} />
      <Once cs={"progress"} children={progress} />
      <Once
        cs={"current"}
        open={item._id === book._id}
        children={t("current reading")}
      />
    </Once>
  );
});
