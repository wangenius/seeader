import { FileInter } from "./remote";
import { BookBody, chapterTitle } from "../@types/object";

export function is<T extends object>(obj: any, key: string): obj is T {
  return key in obj;
}

export const jsonParse = (text: string) => {
  return JSON.parse(text);
};

export const pathParser = (path: string) => {
  const array = path.split(/\\/g);
  return { name: array[array.length - 1] };
};

export function sxParser(sxList: Style.SXs, newSx: any): [] {
  let result: [];
  if (newSx === undefined) return sxList as [];
  result = sxList.concat([...(Array.isArray(newSx) ? newSx : [newSx])]) as [];
  return result;
}

export async function chaptersParser(filePath: string) {
  const reg =
    /((?<=\s|\S+|\d+)【\S+】)|((?<=^|\s)第\S{1,5}章\S*\s)|((?<=^|\s)\d+.\d+\s)/g;
  const regCheck =
    /(【\S+】)|((?<=^|\s)第\S{1,5}章\S*\s)|((?<=^|\s)\d+.\d+\s)/g;

  const text = await FileInter.read(filePath);
  console.log(text);
  const contentArray = text.split(reg).filter(Boolean);
  let arrayItem = {
    index: 0,
    title: "",
    content: "",
  };
  let Chapters: BookBody = {};
  let index = 0;
  let titles: chapterTitle[] = [];
  for (let i = 0; i < contentArray.length; i++) {
    if (regCheck.test(contentArray[i])) {
      arrayItem.title = arrayItem.title + contentArray[i];
    } else if (!regCheck.test(contentArray[i])) {
      arrayItem.content = arrayItem.content + contentArray[i];
    }
    if (
      i !== 0 &&
      regCheck.test(contentArray[i - 1]) &&
      !regCheck.test(contentArray[i])
    ) {
      index = index + 1;
      Chapters[index] = arrayItem;
      titles.push({ index: index, title: arrayItem.title });
      arrayItem = { index: index, title: "", content: "" };
    }
    if (i === contentArray.length - 1) {
      index = index + 1;
      Chapters[index] = arrayItem;
    }
  }
  return { Chapters, length: index, titles };
}
