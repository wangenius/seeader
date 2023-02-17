import {settingsStore} from "@/store/settingsSlice";
import {store} from "@/store/store";
import {toast} from "react-toastify";
import i18n from "i18next";
import {Settings, SETTINGS} from "local";
import {v} from "@/method/v";

/** @Description default to set*/
export const _sets = (settings: Partial<Settings>) =>
  store.dispatch(settingsStore.actions.lap(settings));

_sets.ban = (settings: Settings) =>
  store.dispatch(settingsStore.actions.ban(settings));

/** @Description 返回当前setting store */
_sets.value = (): Settings => store.getState().settings;

/** @Description constant path of settings abs */
_sets.path = v.PATHS.config.settings

/** @Description default settings  config */
_sets.default = SETTINGS;

/** @Description value from local file */
_sets.localValue = (): Settings => window.req<Settings>(_sets.path);

/** @Description save */
_sets.save = () => v.i("sets_save", _sets.value());

/** @Description reset */
_sets.reset = async () => {
  await _sets.language();
  _sets.ban(SETTINGS);
  toast.success(i18n.t("reset successfully"));
};
/** @Description export */
_sets.export = async () => {
  try {
    await _sets.save();
    await v.i("sets_export");
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
_sets.language = async (language: string = "en") =>
  await i18n
    .changeLanguage(language)
    .then(() => _sets({ preference: { language: language } }));

_sets.webdav_server = (server: string) =>
  _sets({ sync: { webdav: { server: server } } });
_sets.webdav_account = (account: string) => {
  _sets({ sync: { webdav: { account: account } } });
};
_sets.webdav_password = (password: string) =>
  _sets({ sync: { webdav: { password: password } } });
_sets.webdav_root = (root: string) =>
  _sets({ sync: { webdav: { root: root } } });

/** @Description 改变close mode */
_sets.closeMode = (value: boolean) => _sets({ common: { minWithTray: value } });

/** @Description 改变查词来源 */
_sets.dictionary = (to: "online" | "local") =>
  _sets({ reading: { dictionary: to } });
