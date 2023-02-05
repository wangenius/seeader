import { Data, Dialog, err, File, remote } from "../method";
import { useAppDispatch, useAppSelector } from "../store/store";
import { toast } from "react-toastify";
import { initialSettings, settingsStore } from "../store/bookSettings";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { DataStore } from "a_root";

export function useSettings() {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  /** @Description 改变redux设置状态 */
  const changeSettings = (settings: Partial<Settings>) =>
    dispatch(settingsStore.actions.changeSettings(settings));

  /** @Description 关闭App */
  async function closeApp() {
    await Data.update(DataStore.settings, {}, settings);
    if (settings.common.minWithTray) return await remote("window_close");
    if (await Dialog.confirm("确认退出？")) await remote("app_close");
  }

  /** @Description 保存设置到数据库 */
  async function saveSettings() {
    try {
      const res = await Data.select<Settings>(DataStore.settings, {});
      res.length
        ? await Data.update(DataStore.settings, { _id: settings._id }, settings)
        : await Data.insert<Settings>(DataStore.settings, settings);
      toast.success("保存成功");
    } catch {
      toast.error("保存失败");
    }
  }

  /** @Description 改变close mode */
  function changeCloseMode(value: boolean) {
    changeSettings({
      common: {
        minWithTray: value,
      },
    });
  }

  /** @Description 刷新数据库设置 */
  async function refreshSettings() {
    const setting = await Data.select<Settings>(DataStore.settings, {});
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
  const toggleContentBar = () =>
    changeSettings({
      reading: {
        chapterDocker: !settings.reading.chapterDocker,
      },
    });

  /** @Description 改变查词来源 */
  function changeDictionaryOrigin(to: "online" | "local") {
    changeSettings({
      reading: {
        dictionary: to,
      },
    });
  }

  /** @Description export */
  async function exportSettings() {
    try {
      const res = await Dialog.save("settings.config", "保存配置文件到");
      if (res.canceled) err("取消导出");
      const path = res.filePath as string;
      await File.save(path, JSON.stringify(settings));
      toast.success("导出成功");
    } catch (e) {
      toast.error(e as string);
    }
  }

  function resetSettings() {
    changeLanguage(initialSettings.preference.language!).then(() =>
      changeSettings(initialSettings)
    );
    toast.success(t("reset successfully"));
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
    exportSettings,
    toggleContentBar,
    changeParagraphSpacing,
    changeDictionaryOrigin,
    changeCloseMode,
    resetSettings,
  };
}
