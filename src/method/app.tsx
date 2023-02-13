import { _sets } from "@/data";
import React from "react";
import { dialog } from "@/method/dialog";
import { AppConfig, Channels, Path } from "local";
import _ from "lodash";
import { toast } from "react-toastify";
import { Once, Pop, TextInput } from "@/component";
import i18n from "i18next";

export const app = (
  channel: keyof typeof import("local").Channels,
  ...args: any[]
) => window.invoke(channel, ...args);

app.paths = {
  settings: Path.join(
    window.paths.Dir_resources.path,
    "config",
    AppConfig.files.settings
  ),
};

/** @Description 关闭App */
app.close = async () => {
  await _sets.save();
  if (_sets.value().common.minWithTray) return await app("window_close");
  if (await dialog.confirm("确认退出？")) await app("app_close");
};

app.new = (url: string) => app(Channels.window_new, url);

app.copy = (text: string = window.getSelection()!.toString()) =>
  window.clipboard.writeText(text);

app.dev = () => app(Channels.window_toggleDevTools);

app.about = () =>
  dialog("版本:1.0.1\n作者:wangenius\n联系邮箱:wangenius@qq.com\n微博:Iynnz");

app.report = () => {
  Pop.modal(
    <Once style={{ maxWidth: "90vw", width: 600 }}>
      <TextInput
        placeholder={i18n.t("input what you want to report")}
        onClick={function (): void {}}
        button
      />
    </Once>
  );
};

app.search = async (strings?: string) =>
  await app.new(`https://quark.sm.cn/s?q=${strings || window.getSelection()}`);

app.dict = async () => {
  if (_sets.value().reading.dictionary === "online")
    return await app.new(
      `https://baike.baidu.com/search/word?fromModule=lemma_search-box&lemmaId=&word=${window.getSelection()}`
    );

  const content = await app(
    Channels.dict_search,
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
