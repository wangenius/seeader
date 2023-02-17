import {Button, Divider, Exp, IconButton, icons, InputSuit, Once, Selector,} from "@/component";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Docker, Mainer} from "@/compace/Docker";
import {useEvent} from "@/hook/useEvent";
import {useAppSelector} from "@/store/store";
import {toa} from "@/method/common";
import {config, options} from "local";
import {_sets} from "@/method/_sets";
import {v} from "@/method/v";

/** @Description settings */
export const Settings = () => {
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
        <Button label={t("sync")} value={4} lc={changeTab} />
        <Divider />
        <Button
          label={t("devTools")}
          open={!v.PATHS.isPackaged}
          lc={v.dev}
        />
        <Button label={t("report issue")} lc={v.report} />
        <Button label={t("about")} value={3} lc={changeTab} />
        <Exp />
        <Button
          label={t("save")}
          lc={toa(_sets.save, "保存成功", "保存失败")}
        />
        <Button label={t("export")} lc={_sets.export} />
        <Button label={t("reset")} lc={_sets.reset} />
      </Docker>

      <Mainer width={width}>
        <Selector
          open={tab === 0}
          title={"close the main panel minimized to the tray"}
          value={settings.common.minWithTray}
          onClick={_sets.closeMode}
          children={options.minWithTray}
        />
        <Selector
          title={"language"}
          open={tab === 1}
          value={settings.preference.language}
          onClick={_sets.language}
          children={options.language}
        />
        <Selector
          open={tab === 2}
          title={"dictionary"}
          value={settings.reading.dictionary}
          onClick={_sets.dictionary}
          children={options.dictionary}
        />
        <Selector
          open={tab === 2}
          title={"font size"}
          value={settings.reading.fontSize}
          onClick={_sets.fontSize}
          children={options.fontSize}
        />
        <Selector
          open={tab === 2}
          title={"line height"}
          value={settings.reading.lineHeight}
          onClick={_sets.lineHeight}
          children={options.lineHeight}
        />
        <Selector
          open={tab === 2}
          title={"paragraph space"}
          value={settings.reading.paragraphSpacing}
          onClick={_sets.paragraphSpacing}
          children={options.paragraphSpacing}
        />
        <Once open={tab === 3}>
          <IconButton
            size={30}
            lc={() => v.link(config.author.weibo)}
            icon={icons.weibo}
          />
          <IconButton
            size={30}
            lc={() => v.link(config.github)}
            icon={icons.github}
          />
          <IconButton
            size={30}
            lc={toa(() => v.copy(config.author.email), "已复制邮箱地址")}
            icon={icons.mail}
          />
        </Once>
        <Once open={tab === 4}>
          <InputSuit
            title={"server"}
            onDone={_sets.webdav_server}
            defaultValue={_sets.value().sync.webdav.server}
          />
          <InputSuit
            title={"account"}
            onDone={_sets.webdav_account}
            defaultValue={_sets.value().sync.webdav.account}
          />
          <InputSuit
            type={"password"}
            title={"password"}
            onDone={_sets.webdav_password}
            defaultValue={_sets.value().sync.webdav.password}
          />
          <InputSuit
            title={"root"}
            onDone={_sets.webdav_root}
            defaultValue={_sets.value().sync.webdav.root}
          />
        </Once>
      </Mainer>
    </Once>
  );
};