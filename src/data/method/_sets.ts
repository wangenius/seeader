/** @Description settings method
 *
 *
 * */
import {paths} from "@/method/invoke";
import {settingsStore} from "@/data/store/settingsSlice";
import {store} from "@/data/store";
import {toast} from "react-toastify";
import {defaultSettings} from "local";
import i18n from "i18next";
import {json} from "@/method";
import {dialog} from "@/method/dialog";
import {file} from "@/method/file";

/** @Description default to set*/
export const _sets = (settings: Partial<Setting>) =>
  store.dispatch(settingsStore.actions.changeSettings(settings));

/** @Description 返回当前setting store */
_sets.value = (): Setting => store.getState().settings;
/** @Description constant path of settings abs */
_sets.path = paths.settings;
/** @Description save */
_sets.save = async () => {
  try {
    await json.save(_sets.path, _sets.value());
    toast.success("保存成功");
  } catch {
    toast.error("保存失败");
  }
};
/** @Description reset */
_sets.reset = () => {
  _sets(defaultSettings);
  toast.success(i18n.t("reset successfully"));
};
/** @Description export */
_sets.export = async () => {
  try {
    const path = await dialog.save("settings.config", "保存配置文件到");
    await file.save(path, JSON.stringify(_sets.value()));
    toast.success("导出成功");
  } catch (e) {
    toast.error(e as string);
  }
};
/** @Description toggle content docker */
_sets.contentDocker = () =>
  _sets({ reading: { chapterDocker: !_sets.value().reading.chapterDocker } });

/** @Description 改变字体大小 */
_sets.fontSize = (fontSize: number) =>
  _sets({ reading: { fontSize: fontSize } });

/** @Description 改变行高 */
_sets.lineHeight = (lineHeight: number) =>
  _sets({ reading: { lineHeight: lineHeight } });

/** @Description 改变段落高度 */
_sets.paragraphSpacing = (spacing: number) =>
  _sets({ reading: { paragraphSpacing: spacing } });

/** @Description 改变语言 */
_sets.language = async (language: Language = "en") => {
  await i18n.changeLanguage(language);
  _sets({ preference: { language: language } });
};

/** @Description 改变close mode */
_sets.closeMode = (value: boolean) => _sets({ common: { minWithTray: value } });

/** @Description 改变查词来源 */
_sets.dictionary = (to: "online" | "local") =>
  _sets({ reading: { dictionary: to } });
