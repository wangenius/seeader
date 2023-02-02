import { Button, Container, Divider, Hangover, Selector } from "../component";
import React, { useState } from "react";
import { useSettings } from "../hook/useSettings";
import { useTranslation } from "react-i18next";
import { useMethod } from "../hook/useMethod";

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
  } = useSettings();
  const { devTools, about, report } = useMethod();
  const [tab, setTab] = useState<number>(0);

  return (
    <Container cls={"Setting"}>
      <Container cls={"SettingBar"}>
        <Button label={t("common")} onClick={() => setTab(0)} />
        <Button label={t("preference")} onClick={() => setTab(1)} />
        <Button label={t("reading")} onClick={() => setTab(2)} />
        <Divider />
        <Button label={t("devTools")} onClick={devTools} />
        <Button label={t("report issue")} onClick={report} />
        <Button label={t("about")} onClick={about} />
        <Hangover />
        <Button label={t("save")} onClick={saveSettings} />
        <Button label={t("export")} onClick={exportSettings} />
        <Button label={t("reset")} onClick={resetSettings} />
      </Container>

      <Container cls={"SettingPairs"} open={tab === 0}>
        {t("close the main panel minimized to the tray")}
        <Selector
            value={settings.common.minWithTray}
          onClick={changeCloseMode}
          children={[
            {
              item: t("minimize to tray"),
              value: true,
            },
            {
              item: t("close after confirm"),
              value: false,
            },
          ]}
        />
      </Container>
      <Container cls={"SettingPairs"} open={tab === 1}>
        {t("language")}
        <Selector
          value={settings.preference.language}
          onClick={changeLanguage}
          children={[
            {
              item: t("english"),
              value: "en",
            },
            {
              item: t("chinese"),
              value: "zh",
            },
          ]}
        />
      </Container>
      <Container cls={"SettingPairs"} open={tab === 2}>
        {t("dictionary")}
        <Selector
          value={settings.reading.dictionary}
          onClick={changeDictionaryOrigin}
          children={[
            {
              item: t("local"),
              value: "local",
            },
            {
              item: t("online"),
              value: "online",
            },
          ]}
        />
      </Container>
    </Container>
  );
};
