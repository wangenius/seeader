import {Button, Once, Divider, Exp, Selector} from "@/component";
import React, {useState} from "react";
import {useSettings} from "@/hook/useSettings";
import {useTranslation} from "react-i18next";
import {useMethod} from "@/hook/useMethod";
import {Docker, Mainer} from "./Docker";
import {useEvent} from "@/hook/useEvent";
import {Settings} from "a_root";

/** @Description settings */
export const Setting = () => {
  const { t } = useTranslation();
  const {
    settings,
    saveSettings,
    changeLanguage,
    changeDictionaryOrigin,
    exportSettings,
    changeCloseMode,
    resetSettings,
    changeFontSize,
    changeLineHeight,
    changeParagraphSpacing,
  } = useSettings();
  const { devTools, about, report } = useMethod();
  /** @Description tab */
  const [tab, setTab] = useState<number>(
    parseInt(localStorage.getItem("settingTab") || "0")
  );
  /** @Description width of docker */
  const width = 180;
  /** @Description changeTab */
  const changeTab = useEvent<Fn>((val: number) => {
    setTab(val);
    localStorage.setItem("settingTab", val.toString());
  });
  return (
    <Once cs={"Setting"}>
      <Docker state={true} width={width}>
        <Button label={t("common")} value={0} lc={changeTab} />
        <Button label={t("preference")} value={1} lc={changeTab} />
        <Button label={t("reading")} value={2} lc={changeTab} />
        <Divider />
        <Button label={t("devTools")} lc={devTools} />
        <Button label={t("report issue")} lc={report} />
        <Button label={t("about")} lc={about} />
        <Exp />
        <Button label={t("save")} lc={saveSettings} />
        <Button label={t("export")} lc={exportSettings} />
        <Button label={t("reset")} lc={resetSettings} />
      </Docker>

      <Mainer width={width}>
        <Selector
          open={tab === 0}
          title={"close the main panel minimized to the tray"}
          value={settings.common.minWithTray}
          onClick={changeCloseMode}
          children={Settings.minWithTray}
        />
        <Selector
          title={"language"}
          open={tab === 1}
          value={settings.preference.language}
          onClick={changeLanguage}
          children={Settings.language}
        />
        <Selector
          open={tab === 2}
          title={"dictionary"}
          value={settings.reading.dictionary}
          onClick={changeDictionaryOrigin}
          children={Settings.dictionary}
        />
        <Selector
          open={tab === 2}
          title={"font size"}
          value={settings.reading.fontSize}
          onClick={changeFontSize}
          children={Settings.fontSize}
        />
        <Selector
          open={tab === 2}
          title={"line height"}
          value={settings.reading.lineHeight}
          onClick={changeLineHeight}
          children={Settings.lineHeight}
        />
        <Selector
          open={tab === 2}
          title={"paragraph space"}
          value={settings.reading.paragraphSpacing}
          onClick={changeParagraphSpacing}
          children={Settings.paragraphSpacing}
        />
      </Mainer>
    </Once>
  );
};
