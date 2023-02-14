/** @Description settings method
 *
 *
 * */
import {settingsStore} from "@/data/store/settingsSlice";
import {store} from "@/data/store";
import {toast} from "react-toastify";
import i18n from "i18next";
import {dialog} from "@/method/dialog";
import {file} from "@/method/file";
import {path} from "@/method/path";
import {SETTINGS} from "local";

/** @Description default to set*/
export const _sets = (settings: Partial<Setting>) =>
  store.dispatch(settingsStore.actions.changeSettings(settings));

/** @Description 返回当前setting store */
_sets.value = (): Setting => store.getState().settings;
/** @Description constant path of settings abs */
_sets.path = path.sub.settings;

/** @Description default settings  config */
_sets.default = SETTINGS;

/** @Description save */
_sets.save = () => file.json_save(_sets.path, _sets.value());

/** @Description reset */
_sets.reset = async () => {
  await _sets.language();
  _sets(_sets.default);
  toast.success(i18n.t("reset successfully"));
};
/** @Description export */
_sets.export = async () => {
  try {
    const path = await dialog.save("settings.json", "保存配置文件到");
    await file.json_save(path, _sets.value());
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
_sets.language = async (language: Language = "en") =>
  await i18n
    .changeLanguage(language)
    .then(() => _sets({ preference: { language: language } }));

/** @Description 改变close mode */
_sets.closeMode = (value: boolean) => _sets({ common: { minWithTray: value } });

/** @Description 改变查词来源 */
_sets.dictionary = (to: "online" | "local") =>
  _sets({ reading: { dictionary: to } });
