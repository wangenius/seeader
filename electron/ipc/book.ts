import { file } from "../method/file";
import { data } from "./dataStore";
import { DataStore, Path } from "local";
import _ from "lodash";

export const book_add: Motion = async (event, path:string) => {
  /*判断中含有该书*/
  const res = await data.select(DataStore.bookshelf, { path: path });
  if (res.length)
    return { code:0, msg: `已经添加过该书籍《${Path.parser(path).name}》` };
  /*从文件读取string*/
  const text = await file.read(path);
  const { Chapters, total, titles } = await textToBook(text);
  /*保存body数据库*/
  const { _id } = await data.insert(DataStore.bookBody, Chapters);
  const book = {
    _id: _id,
    name: Path.parser(path).name,
    path: path,
    total: total,
    progress: 0,
    titles: titles,
  };
  return await data.insert(DataStore.bookshelf, book);
};

export const textToBook = async (text: string) => {
  /*正则表达式*/
  const reg =
    /((?<=\s|\S+|\d+)【\S+】)|((?<=^|\s)第\S{1,5}章\S*\s)|((?<=^|\s)\d+.\d+\s)/g;
  const regCheck =
    /(【\S+】)|((?<=^|\s)第\S{1,5}章\S*\s)|((?<=^|\s)\d+.\d+\s)/g;
  const isTitle = (content: string) => content.search(regCheck) !== -1;

  /*分解text成数组并过滤*/
  const contentArray = text.split(reg).filter(Boolean);

  /*标题列表 array*/
  const titles = [];
  /*章节*/
  const Chapters = {};

  /*每章节内容初始化*/
  let chapterItem = {
    index: 0,
    title: "",
    content: [],
  };
  let curContent = ""
  /*总数*/
  let total = 0;
  /*遍历*/
  for (let i = 0; i < contentArray.length; i++) {
    /*如果是标题，将该条与现在的标题合并，检查上下文*/
    if (isTitle(contentArray[i])) {
      /*否则（是标题），判断是否上下文 插入item标题中*/ /*如果是标题，将该条与现在的标题合并，检查上下文*/
      chapterItem.title = chapterItem.title + contentArray[i];
    } else {
      /*如果不是标题，则将该段内容插入到当前item中*/
      /*更新item的值*/
      curContent = curContent + contentArray[i];
      /*继续判断其后面是否是标题，如果是标题，该组章节结束，push到chapters列表中*/
      if (
        i > 0 &&
        (i === contentArray.length - 1 || isTitle(contentArray[i + 1]))
      ) {
        chapterItem.content = parserChapter(curContent)
        /*将该item插入titles*/
        titles.push({ index: total, title: chapterItem.title });
        /*将该item插入chapters*/
        Chapters[total] = chapterItem;
        total = total + 1;
        /*chapterItem初始化*/
        curContent = ""
        chapterItem = { index: total, title: "", content: [] };

      }
    }
  }
  return { Chapters, total, titles };
};

function parserChapter(text:string){
  let result: string[] = [],
      temp;
  text.split(/\r\n|\n/).map((item: string) => {
    temp = item
        .replace(/(^\s+)|(\s+$)/g, "") //取消空格
        .replace(/\s/g, "");
    result.push(temp);
  });
  return _.without(result,"");
}
