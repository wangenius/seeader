import React from "react";
import {Channels, config, Projection} from "local";
import _ from "lodash";
import {toast} from "react-toastify";
import {Once, Pop} from "@/component";
import {_sets} from "@/method/_sets";

/** @Description base method abstract */
export abstract class v {
  /** @Description app config */
  static CONFIG = config;

  /** @Description 路径 */
  static PATHS = window.PATHS;

  /** @Description default is window.invoke */
  static i(channel: Channels, ...args: any[]) {
    return window.invoke(channel, ...args);
  }

  /** @Description 关闭App */
  static async close() {
    await _sets.save();
    if (_sets.value().common.minWithTray) return await v.i("close");
    await v.i("exit");
  }

  /** @Description browser a new windows */
  static new(url: string) {
    return v.i("window_new", url);
  }

  /** @Description toggle devtools */
  static dev() {
    return v.i("toggleDevtools");
  }

  /** @Description copy a string default is current selected */
  static copy(text: string = window.getSelection()!.toString()): Toa {
    window.clipboard.writeText(text);
    return { code: 1, msg: "复制成功" };
  }

  /** @Description open github issue page */
  static report() {
    return v.link("https://github.com/wangenius/seeader/issues/new");
  }

  /** @Description open a new url */
  static search(strings?: string) {
    return v.new(`https://quark.sm.cn/s?q=${strings || window.getSelection()}`);
  }

  /** @Description search a dict */
  static async dict() {
    if (_sets.value().reading.dictionary === "online")
      return await v.new(
        `https://baike.baidu.com/search/word?fromModule=lemma_search-box&lemmaId=&word=${window.getSelection()}`
      );

    const content = await v.i(
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
  }

  /** @Description open an external url */
  static link(url: string) {
    return v
      .i("confirm", `是否打开外部链接:${url}`)
      .then(() => window.shell.openExternal(url));
  }

  /** @Description confirm cancel throw and return rest value */
  static async confirm(msg: string, buttons?: string[], cancelId?: number) {
    return await v.i("confirm", msg, buttons, cancelId);
  }

  /** @Description fetch store from store */
  static fetchData<T = any>(
    store: string,
    query: Partial<T> = {},
    projection?: Projection<T>
  ): Promise<T[]> {
    return v.i("db_find", store, query, projection);
  }

  /** @Description update */
  static async updateData<T = any>(
    store: string,
    before: Partial<T>,
    after: Partial<T>
  ): Promise<T[]> {
    return v.i("db_update", store, before, { $set: after });
  }
}
