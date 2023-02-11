import {Button, Once, Divider, Exp, Selector} from "@/component";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Docker, Mainer} from "./Docker";
import {useEvent} from "@/hook/useEvent";
import {SettingsOptions} from "a_root";
import {_sets} from "@/data/method/_sets";
import {useAppSelector} from "@/data/store";
import {about, devTools, report} from "@/method/frag";

/** @Description settings */
export const SettingsPage = () => {
  const { t } = useTranslation();
  const settings = useAppSelector((state) => state.settings);
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
        <Button label={t("save")} lc={_sets.save} />
        <Button label={t("export")} lc={_sets.export} />
        <Button label={t("reset")} lc={_sets.reset} />
      </Docker>

      <Mainer width={width}>
        <Selector
          open={tab === 0}
          title={"close the main panel minimized to the tray"}
          value={settings.common.minWithTray}
          onClick={_sets.closeMode}
          children={SettingsOptions.minWithTray}
        />
        <Selector
          title={"language"}
          open={tab === 1}
          value={settings.preference.language}
          onClick={_sets.language}
          children={SettingsOptions.language}
        />
        <Selector
          open={tab === 2}
          title={"dictionary"}
          value={settings.reading.dictionary}
          onClick={_sets.dictionary}
          children={SettingsOptions.dictionary}
        />
        <Selector
          open={tab === 2}
          title={"font size"}
          value={settings.reading.fontSize}
          onClick={_sets.fontSize}
          children={SettingsOptions.fontSize}
        />
        <Selector
          open={tab === 2}
          title={"line height"}
          value={settings.reading.lineHeight}
          onClick={_sets.lineHeight}
          children={SettingsOptions.lineHeight}
        />
        <Selector
          open={tab === 2}
          title={"paragraph space"}
          value={settings.reading.paragraphSpacing}
          onClick={_sets.paragraphSpacing}
          children={SettingsOptions.paragraphSpacing}
        />
      </Mainer>
    </Once>
  );
};
