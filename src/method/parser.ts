import {File} from "./file";

/** @Description 判断是否属于接口 */
export function is<T extends object>(obj: any, key: string): obj is T {
  return key in obj;
}

/** json 解析器*/
export const jsonParse = <T extends object>(text: string): T =>
  JSON.parse(text);

/** @Description 路径解析器，返回{name名称} */
export const pathParser = (path: string) => {
  const array = path.split(/\\/g);
  return { name: array[array.length - 1].slice(0, -4) };
};

/** @Description txt文件解析 */
export async function chaptersParser(filePath: string) {
  /*正则表达式*/
  const reg =
    /((?<=\s|\S+|\d+)【\S+】)|((?<=^|\s)第\S{1,5}章\S*\s)|((?<=^|\s)\d+.\d+\s)/g;
  const regCheck =
    /(【\S+】)|((?<=^|\s)第\S{1,5}章\S*\s)|((?<=^|\s)\d+.\d+\s)/g;
  const isTitle = (content: string) => content.search(regCheck) !== -1;

  /*从文件读取string*/
  const text = await File.read(filePath);

  /*分解text成数组并过滤*/
  const contentArray = text.split(reg).filter(Boolean);

  /*标题列表 array*/
  const titles: chapterTitle[] = [];
  /*章节*/
  const Chapters: BookBodies = {};

  /*每章节内容初始化*/
  let chapterItem: Chapter = {
    index: 0,
    title: "",
    content: "",
  };
  /*总数*/
  let index = 0;
  /*遍历*/
  for (let i = 0; i < contentArray.length; i++) {
    /*如果是标题，将该条与现在的标题合并，检查上下文*/
    if (isTitle(contentArray[i])) {
      /*否则（是标题），判断是否上下文 插入item标题中*/ /*如果是标题，将该条与现在的标题合并，检查上下文*/
      chapterItem.title = chapterItem.title + contentArray[i];
    } else {
      /*如果不是标题，则将该段内容插入到当前item中*/
      /*更新item的值*/
      chapterItem.content = chapterItem.content + contentArray[i];
      /*继续判断其后面是否是标题，如果是标题，该组章节结束，push到chapters列表中*/
      if (
        i > 0 &&
        (i === contentArray.length - 1 || isTitle(contentArray[i + 1]))
      ) {
        /*将该item插入titles*/
        titles.push({ index: index, title: chapterItem.title });
        /*将该item插入chapters*/
        Chapters[index] = chapterItem;
        index = index + 1;
        /*chapterItem初始化*/
        chapterItem = { index: index, title: "", content: "" };
      }
    }
  }
  return { Chapters, total: index, titles };
}
