import React from "react";
import { dialog } from "@/method/dialog";
import { Channels, config } from "local";
import _ from "lodash";
import { toast } from "react-toastify";
import { Once, Pop } from "@/component";
import { _sets } from "@/data/method/_sets";

export const app = (channel: Channels, ...args: any[]) =>
  window.invoke(channel, ...args);

/** @Description 应用参数 */
app.config = config;
/** @Description 应用地址 */
app.path = window.paths;

/** @Description 关闭App */
app.close = async () => {
  await _sets.save();
  if (_sets.value().common.minWithTray) return await app("window_close");
  await app("app_exit");
};

app.new = (url: string) => app("window_new", url);

app.copy = (text: string = window.getSelection()!.toString()) =>
  window.clipboard.writeText(text);

app.dev = () => app("window_toggleDevTools");

app.about = () =>
  dialog("版本:1.0.1\n作者:wangenius\n联系邮箱:wangenius@qq.com\n微博:Iynnz");

app.report = () => app.link("https://github.com/wangenius/seeader/issues/new");

app.search = async (strings?: string) =>
  await app.new(`https://quark.sm.cn/s?q=${strings || window.getSelection()}`);

app.dict = async () => {
  if (_sets.value().reading.dictionary === "online")
    return await app.new(
      `https://baike.baidu.com/search/word?fromModule=lemma_search-box&lemmaId=&word=${window.getSelection()}`
    );

  const content = await app(
    "dict_search",
    _.lowerCase(window.getSelection()!.toString())
  );
  if (!content.definition) return toast.warning("暂无释义");
  Pop.modal(
    <Once
      cs={"Dict"}
      dangerouslySetInnerHTML={{ __html: content.definition }}
    />
  );
};

app.link = (url: string) =>
  dialog
    .confirm(`是否打开外部链接:${url}`)
    .then(() => window.shell.openExternal(url));
