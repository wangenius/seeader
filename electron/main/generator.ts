import { Path } from "local";
import { Fima } from "./file";
import { parseEpub } from "@gxl/epub-parser";
import _ from "lodash";
import Mdict from "js-mdict";
import { DIRS } from "../@constant/path";

export abstract class Generator {

    static async Book(path: string): Promise<ParseredBook> {
        return Path.parser(path).ext === "epub"
            ? await this.epub_book(path)
            : await this.txt_book(path);
    }

    static async txt_book(path: string): Promise<ParseredBook> {
        const reg =
            /((?<=^|\s)【\S+】.*?\s)|((?<![a-zA-Z0-9\u4e00-\u9fa5\u002c\uff0c\u300B\u3002\u3009\u300D\u300F\u201D\u2019])第.{1,5}章.*)|((?<=^|\s)\uff08.{1,3}?\uff09.*)|((?<=^|\s)\d+.\d+\n)/g;
        const isTitle = (content: string) => content.search(reg) !== -1;
        const text = await Fima.read(path);
        /*分解text成数组并过滤*/
        const contentArray = text
            .replace(RegExp("<.+?>.*?<.+?>", "g"), "")
            .split(reg)
            .filter(Boolean);
        /*标题列表 array*/
        const titles = [];
        /*章节*/
        const Chapters = [];

        /*每章节内容初始化*/
        let chapterItem = {
            index: 0,
            title: "",
            content: [],
        };
        /** @Description 暂时content */
        let curContent = "";
        /*总数*/
        let total = 0;
        /*遍历*/

        if (contentArray.length === 1) {
            return {
                Chapters: [
                    {
                        index: 0,
                        title: "第一章",
                        content: this.text_chapter(contentArray[0]),
                    },
                ],
                total: 1,
                titles: [{ index: 0, title: "第一章" }],
            };
        }

        for (let i = 0; i < contentArray.length; i++) {
            if (
                i < contentArray.length - 1 &&
                isTitle(contentArray[i]) &&
                !isTitle(contentArray[i + 1]) &&
                !Detector.isEmpty(contentArray[i + 1])
            )
                chapterItem.title = chapterItem.title + contentArray[i];
            else {
                curContent = curContent + contentArray[i];
            }

            /** @Description 该条件下生成内容 生成章节内容push到chapters中*/
            if (
                (i > 0 &&
                    i < contentArray.length - 2 &&
                    chapterItem.title !== "" &&
                    curContent !== "" &&
                    isTitle(contentArray[i + 1]) &&
                    !isTitle(contentArray[i + 2]) &&
                    !Detector.isEmpty(contentArray[i + 2])) ||
                i === contentArray.length - 1
            ) {
                /** @Description content 赋值 */
                chapterItem.content = this.text_chapter(curContent);
                /*将该item插入titles*/
                titles.push({ index: total, title: chapterItem.title });
                /*将该item插入chapters*/
                Chapters[total] = chapterItem;
                total = total + 1;
                /*chapterItem初始化*/
                curContent = "";
                chapterItem = { index: total, title: "", content: [] };
            }
        }

        return { Chapters, total, titles };
    }

    static async epub_book(path: string): Promise<ParseredBook> {
        const epubObj = await parseEpub(path, {
            type: "path",
        });

        /*标题列表 array*/
        const titles = [];
        /*章节*/
        const Chapters = [];

        epubObj.sections.map((item, key) => {
            if (key === 0) return;
            let text = item.htmlString;
            const regex = RegExp(
                "(?<=<h[0-9].+>).+?(?=</h[0-9]>)|(?<=<title>).{2,20}(?=</title>)",
                "g"
            );
            let title = text
                .replace(RegExp("<(?!h|/h).+?>", "g"), "")
                .match(regex) || [`第${key}章`];
            titles.push({ index: key - 1, title: title[0] });
            let content = text
                .replace(
                    RegExp("<(?!p|span|a|h[3-9]|/).+?>.+?<.+?(?<!p|span|a|h[3-9])>", "g"),
                    ""
                )
                .replace(/\x20+/g, " ")
                .replace(/<[\s\S]+?>/g, "\n")
                .replace(/[\n\r]+/g, "\n")
                .split(/\n/g)
                .filter((str) => {
                    return Boolean(str) && str !== " " && str !== " ";
                });
            Chapters[key - 1] = {
                index: key - 1,
                title: title,
                content: content || [""],
            };
        });

        return { Chapters, total: epubObj.sections.length - 1, titles };
    }


    static  text_chapter(text: string) {
        let result: string[] = [],
            temp;
        text.split(/\r\n|\n/).map((item: string) => {
            temp = item
                .replace(/(^\s+)|(\s+$)/g, "") //取消空格
                .replace(/\s/g, "");
            result.push(temp);
        });
        return _.without(result, "");
    }



}

/** @Description language tool */
export abstract class Detector {
    /** @Description string is Empty */
    static isEmpty(text) {
        return text.replace(/\s*/g, "") === "";
    }


    static translate(text:string){
        const dict = new Mdict(DIRS.STATICS.enter("mdx").end("h1.mdx"));
        return dict.lookup(text);
    }
    static ud(item:any){
        return item === undefined
    }
}