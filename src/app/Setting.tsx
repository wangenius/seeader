import {Button, Container, Divider, Hangover, Selector} from "../component";
import React, {useState} from "react";
import {useSettings} from "../hook/useSettings";
import {useTranslation} from "react-i18next";
import {useMethod} from "../hook/useMethod";
import {SETTINGS} from "../@constant";
import {Docker, Mainer} from "./Docker";
import {useEvent} from "../hook/useEvent";

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
    <Container cls={"Setting"}>
      <Docker state={true} width={width}>
        <Button label={t("common")} value={0} onClick={changeTab} />
        <Button label={t("preference")} value={1} onClick={changeTab} />
        <Button label={t("reading")} value={2} onClick={changeTab} />
        <Divider />
        <Button label={t("devTools")} onClick={devTools} />
        <Button label={t("report issue")} onClick={report} />
        <Button label={t("about")} onClick={about} />
        <Hangover />
        <Button label={t("save")} onClick={saveSettings} />
        <Button label={t("export")} onClick={exportSettings} />
        <Button label={t("reset")} onClick={resetSettings} />
      </Docker>

      <Mainer width={width}>
        <Selector
          open={tab === 0}
          title={"close the main panel minimized to the tray"}
          value={settings.common.minWithTray}
          onClick={changeCloseMode}
          children={SETTINGS.minWithTray}
        />
        <Selector
          title={"language"}
          open={tab === 1}
          value={settings.preference.language}
          onClick={changeLanguage}
          children={SETTINGS.language}
        />
        <Selector
          open={tab === 2}
          title={"dictionary"}
          value={settings.reading.dictionary}
          onClick={changeDictionaryOrigin}
          children={SETTINGS.dictionary}
        />
        <Selector
          open={tab === 2}
          title={"font size"}
          value={settings.reading.fontSize}
          onClick={changeFontSize}
          children={SETTINGS.fontSize}
        />
        <Selector
          open={tab === 2}
          title={"line height"}
          value={settings.reading.lineHeight}
          onClick={changeLineHeight}
          children={SETTINGS.lineHeight}
        />
        <Selector
          open={tab === 2}
          title={"paragraph space"}
          value={settings.reading.paragraphSpacing}
          onClick={changeParagraphSpacing}
          children={SETTINGS.paragraphSpacing}
        />
      </Mainer>
    </Container>
  );
};
