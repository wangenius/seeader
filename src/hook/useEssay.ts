import { useEffect, useState } from "react";
const fs = window.require("fs");
const iconvLite = window.require("iconv-lite");
const { BrowserWindow, dialog, Menu, MenuItem, getCurrentWindow } =
  window.require("@electron/remote");
interface Chapter {
  index: number;
  title: string;
}

interface ChapterContent {
  index: number;
  title: string;
  content: string;
}

export function useEssay(text: string = "") {
  const [originalText, setOriginalText] = useState<string>(text);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chaptersContent, setChaptersContent] = useState<ChapterContent[]>([]);
  const reg = RegExp(
    /((?<=\s|\S+|\d+)【\S+】)|((?<=^|\s)第\S{1,6}章\S*\s)|((?<=^|\s)\d+.\d+\s)/,
    "g"
  );

  useEffect(() => {
    generateChapters();
  }, [originalText]);

  useEffect(() => {
    generateChaptersContent();
  }, [chapters]);

  useEffect(() => {
    // console.log(chapters);
    // console.log(chaptersContent);
  }, [chaptersContent]);

  const openFile = () => {
    const res = dialog.showOpenDialogSync({
      title: "读取文件", // 对话框窗口的标题
      filters: [
        { name: "txt", extensions: ["txt"] },
        { name: "All Files", extensions: ["*"] },
      ],
    });
    localStorage.setItem("file", res[0]);
    // changeText(parserTextFile(res[0]));
  };

  function generateChapters() {
    const contentArray = originalText.match(reg);
    let chaptersList: Chapter[] = [];
    if (!contentArray) return;
    contentArray.map((item, key) => {
      chaptersList.push({ index: key, title: item });
    });
    setChapters(chaptersList);
  }

  function generateChaptersContent() {
    let contentArray = originalText.split(reg);
    contentArray = contentArray.filter(Boolean);
    // console.log(contentArray);
    let chaptersContentList: ChapterContent[] = [];
    if (contentArray)
      for (let i = 0; i < chapters.length; i++) {
        chaptersContentList.push({
          index: i,
          title: chapters[i].title,
          content: contentArray[2 * i + 2],
        });
      }
    setChaptersContent(chaptersContentList);
  }

  function body(chapter: Chapter) {
    return chaptersContent[chapter.index];
  }
  function changeText(text: string) {
    // console.log(text);
    setOriginalText(text);
  }

  return {
    chapterBody: chaptersContent,
    body: body,
    chapters: chapters,
    changeText: changeText,
    openBook: openFile,
  };
}
