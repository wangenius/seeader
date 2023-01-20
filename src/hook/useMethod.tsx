import { Clipboard } from "../method/remote";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/store";
import { Browser } from "../method/browser";
import {Container, modal, pop} from "../component";

export function useMethod() {
  const settings = useAppSelector((state) => state.settings);

  /** @Description 复制文字 默认复制选中字*/
  function copyText(strings?: string) {
    try {
      Clipboard.copy(
        strings || (window.getSelection() as Selection).toString()
      );
      toast.success("复制成功");
    } catch (e) {
      toast.error("复制失败");
    }
  }

  /** @Description 百度搜索 默认搜索选中字段 */
  async function searchWeb(strings?: string) {
    await Browser.create(
      `https://m.baidu.com/s?wd=${strings || window.getSelection()}`
    );
  }

  /** @Description 翻译 默认翻译选中字段 */
  async function translate(strings?: string) {
    if (settings.reading.dictionary === "online")
      return await Browser.create(
        `https://www.youdao.com/result?word=${
          strings || window.getSelection()
        }&lang=en`
      );
    const content = await Browser.dict(
      strings || window.getSelection()?.toString() || ""
    );
    pop.modal(
      <Container
        className={"Dict"}
        dangerouslySetInnerHTML={{ __html: content.definition }}
      />
    );
  }

  return {
    copyText,
    searchWeb,
    translate,
  };
}
