import { remote } from "../method/remote";
import { useAppDispatch, useAppSelector } from "../store/store";
import { toast } from "react-toastify";
import { settingsSlice } from "../store/slice_settings";
import { Language } from "../@types/i18next";
import i18n from "i18next";
import { Settings } from "../@types/object";
import { Data } from "../method/data";
import { Dialog } from "../method/dialog";

export function useSettings() {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  /** @Description 改变redux设置状态 */
  const changeSettings = (settings: Partial<Settings>) =>
    dispatch(settingsSlice.actions.changeSettings(settings));

  /** @Description 关闭App */
  async function closeApp() {
    await Data.update("settings", {}, settings);
    if (settings.common.minWithTray) return await remote("window_close");
    if (await Dialog.confirm("确认退出？")) await remote("app_close");
  }

  /** @Description 保存设置到数据库 */
  async function saveSettings() {
    try {
      const res = await Data.select<Settings>("settings", {});
      res.length
        ? await Data.update("settings", { _id: settings._id }, settings)
        : await Data.insert<Settings>("settings", settings);
      toast.success("保存成功");
    } catch {
      toast.error("保存失败");
    }
  }

  /** @Description 刷新数据库设置 */
  async function refreshSettings() {
    const setting = await Data.select<Settings>("settings", {});
    changeSettings(setting[0]);
    toast.success("刷新成功");
  }

  /** @Description 改变字体大小 */
  const changeFontSize = (fontSize: number) =>
    changeSettings({ reading: { fontSize: fontSize } });

  /** @Description 改变行高 */
  const changeLineHeight = (lineHeight: number) =>
    changeSettings({
      reading: { lineHeight: lineHeight },
    });

  /** @Description 改变段落高度 */
  const changeParagraphSpacing = (spacing: number) =>
    changeSettings({
      reading: { paragraphSpacing: spacing },
    });

  /** @Description 改变语言 */
  const changeLanguage = (language: Language) =>
    i18n.changeLanguage(language).then(() => {
      localStorage.setItem("language", language);
      changeSettings({ preference: { language: language } });
    });

  /** @Description 开关目录 */
  const toggleContentBar = (to?: boolean) => {
    changeSettings({
      reading: {
        contentOpen: (to as boolean) || !settings.reading.contentOpen,
      },
    });
  };

  /** @Description 改变查词来源 */
  function changeDictionaryOrigin(to: "online" | "local") {
    changeSettings({
      reading: {
        dictionary: to,
      },
    });
  }

  return {
    settings,
    changeSettings,
    closeApp,
    saveSettings,
    refreshSettings,
    changeFontSize,
    changeLineHeight,
    changeLanguage,
    toggleContentBar,
    changeParagraphSpacing,
    changeDictionaryOrigin,
  };
}
