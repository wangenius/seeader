import { Browser, Clipboard, Dialog, remote } from "../method";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/store";
import { Container, Pop, TextInput } from "../component";
import React from "react";
import { useTranslation } from "react-i18next";

export function useMethod() {
  const { t } = useTranslation();
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
      `https://quark.sm.cn/s?q=${strings || window.getSelection()}`
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
    Pop.modal(
      <Container
        className={"Dict"}
        dangerouslySetInnerHTML={{ __html: content.definition }}
      />
    );
  }

  const devTools = () => remote("window_toggleDevTools");
  const about = () =>
    Dialog.message(
      "版本:1.0.1\n作者:wangenius\n联系邮箱:wangenius@qq.com\n微博:Iynnz"
    );

  function report() {
    Pop.modal(
      <Container sx={{ maxWidth: "90vw",width:600 }}>
        <TextInput
          placeholder={t("input what you want to report")}
          onClick={function (): void {}}
          button
        />
      </Container>
    );
  }

  return {
    copyText,
    searchWeb,
    translate,
    devTools,
    about,
    report,
  };
}
