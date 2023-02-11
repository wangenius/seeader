import {_sets} from "@/data";
import {browser, clipboard, invoke} from "@/method/invoke";
import {Channels} from "local";
import {dialog} from "@/method/dialog";
import {toast} from "react-toastify";
import {Once, Pop, TextInput} from "@/component";
import React from "react";
import i18n from "i18next";

/** @Description 关闭App */
export const app = () =>{}

app.close =async () => {
  await _sets.save();
  if (_sets.value().common.minWithTray)
    return await invoke(Channels.window_close);
  if (await dialog.confirm("确认退出？")) await invoke(Channels.app_close);
}



/** @Description 复制文字 默认复制选中字*/
export function copyText(strings?: string) {
  try {
    clipboard.copy(strings || window.getSelection()!.toString());
    toast.success("复制成功");
  } catch (e) {
    toast.error("复制失败");
  }
}

/** @Description 百度搜索 默认搜索选中字段 */
export async function searchWeb(strings?: string) {
  await browser(`https://quark.sm.cn/s?q=${strings || window.getSelection()}`);
}

/** @Description 翻译 默认翻译选中字段 */
export async function translate() {
  if (_sets.value().reading.dictionary === "online")
    return await browser(
      `https://www.youdao.com/result?word=${window.getSelection()}&lang=en`
    );
  const content = await browser.dict(window.getSelection()?.toString() || "");
  Pop.modal(
    <Once
      cs={"Dict"}
      dangerouslySetInnerHTML={{ __html: content.definition }}
    />
  );
}

export const devTools = () => invoke(Channels.window_toggleDevTools);
export const about = () =>
  dialog("版本:1.0.1\n作者:wangenius\n联系邮箱:wangenius@qq.com\n微博:Iynnz");

export function report() {
  Pop.modal(
    <Once style={{ maxWidth: "90vw", width: 600 }}>
      <TextInput
        placeholder={i18n.t("input what you want to report")}
        onClick={function (): void {}}
        button
      />
    </Once>
  );
}