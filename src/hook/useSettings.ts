import { Clipboard, Data, Dialog, remote } from "../method/remote";
import { useAppDispatch, useAppSelector } from "../store/store";
import { toast } from "react-toastify";
import { settingsSlice } from "../store/slice_settings";
import { Language } from "../@types/i18next";
import i18n from "i18next";
import { Settings } from "../@types/object";
import { CHANNELS } from "a_root";

export function useSettings() {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const change = (settings: Partial<Settings>) =>
    dispatch(settingsSlice.actions.changeSettings(settings));

  async function closeApp() {
    try {
      await Data.update("settings", {}, settings);
      if (settings.common.minWithTray) return await remote("window_close");
      if (await Dialog.confirm("确认退出？")) await remote(CHANNELS.app_close);
    } catch (e) {
      toast.warning(e as string);
    }
  }

  function saveSettings() {
    Data.select("settings", {})
      .then((res) => {
        if (res.length)
          return Data.update("settings", { _id: settings._id }, settings);
        return Data.insert("settings", settings);
      })
      .then((res) => {
        toast.success("保存成功");
      });
  }
  function refreshSettings() {
    Data.select<Settings>("settings", {})
      .then((res) => {
        return change(res[0]);
      })
      .then(() => {
        toast.success("刷新成功");
      });
  }
  function changeFontSize(fontSize: number) {
    change({ reading: { fontSize: fontSize } });
  }
  function changeLineHeight(lineHeight: number) {
    change({
      reading: { lineHeight: lineHeight },
    });
  }
  function changeParagraphSpacing(spacing: number) {
    change({
      reading: { paragraphSpacing: spacing },
    });
  }

  function changeLanguage(language: Language) {
    i18n.changeLanguage(language).then(() => {
      localStorage.setItem("language", language);
      change({ preference: { language: language } });
    });
  }

  const toggleContentBar = (to?: boolean) => {
    change({
      reading: {
        contentOpen: (to as boolean) || !settings.reading.contentOpen,
      },
    });
  };

  function changeDictionaryOrigin(to: "online" | "local") {
    change({
      reading: {
        dictionary: to,
      },
    });
  }

  return {
    change,
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
