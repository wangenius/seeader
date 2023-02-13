import {Divider, icons, Once, SVG} from "@/component";
import React, {memo, useMemo, useState} from "react";
import _ from "lodash";
import {useTranslation} from "react-i18next";
import {useNav} from "@/hook/useNav";
import {Docker, DockerButton, Mainer} from "./Docker";
import {_book} from "@/data";
import {useAppSelector} from "@/data/store";
import {_shelf} from "@/data/method/_shelf";
import {useEffectOnce} from "react-use";
import {file} from "@/method/file";
import {dialog} from "@/method/dialog";

/** @Description 书架 */
export const ShelfPage = memo(() => {
  /** @Description 书架方法 */
  const shelf = useAppSelector((state) => state.shelf);
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const width = 60;
  useEffectOnce(() => {
    _shelf.load();
  });
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
        <DockerButton label={"add book"} lc={_book.dialog_to_add} children={icons.add} />
        <DockerButton
          label={"change shelf"}
          lc={_shelf.import}
          children={icons.box}
        />
        <Divider />
        <DockerButton
          label={"export shelf"}
          lc={_shelf.export}
          children={icons.export}
        />
      </Docker>
      <Docker state={!!selectedBooks.length} width={width}>
        <DockerButton
          label={"edit"}
          lc={() => {
            _book.edit(selectedBooks[0], cancelSelected);
          }}
          children={icons.edit}
        />
        <DockerButton
          label={"export"}
          lc={() => _book.backup(selectedBooks)}
          children={icons.copy}
        />
        <Divider />
        <DockerButton
          label={"delete book"}
          lc={async () => {
            await _book.delete(selectedBooks);
            selectedBooks.map((item) => {
              onCancelSelected(item);
            });
          }}
          children={icons.remove}
        />
        <DockerButton
          label={"show in folder"}
          lc={() => file.openInFolder(selectedBooks[0].path)}
          children={icons.showInFolder}
        />
        <DockerButton
          label={"book info"}
          lc={() =>
            dialog(
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
          children={icons.info}
        />
      </Docker>
      <Mainer width={width} lc={cancelSelected}>
        {shelf.books.map((item, key) => (
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
  const to = useNav();
  const book = useAppSelector((state) => state.book);

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
      ? to.reading()
      : _book.open(item).then(to.reading);
  };

  return (
    <Once rc={rc} lc={lc} cs={"book"} state={selected ? "selected" : undefined}>
      <SVG cs={"selected"} icon={icons.done} />
      <Once cs={"BookTitle"} children={item.name} />
      <Once cs={"progress"} children={progress} />
      <Once
        cs={"current"}
        open={item._id === book._id}
        children={icons.loc}
      />

    </Once>
  );
});
