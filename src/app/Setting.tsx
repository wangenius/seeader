import { Container, Hangover } from "../component/Container";
import { Divider } from "../component/Accessory";
import React, { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useWindowSize } from "react-use";
import { Button, FontButton } from "../component/Button";
import { THEME_CONSTANT } from "../@constant/theme";
import { ElementProps } from "elementProperty";
import { useTheme } from "../context/ThemeProvider";
import { initialTheme, settingsSlice } from "../store/slice_settings";
import { MdOutlineFileUpload, MdOutlineSave, MdRefresh } from "react-icons/md";
import { useSettings } from "../hook/useSettings";
import { MenuButton } from "../component/Menu";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Language } from "../@types/i18next";
import __ from "lodash";
import { Dialog, FileInter } from "../method/remote";
import { Range, Toggle } from "../component/Input";
import { toast } from "react-toastify";
import { err } from "../method/general";
import { useShelf } from "../context/ShelfProvider";
import { useWindows } from "../hook/useWindows";
import { Simulate } from "react-dom/test-utils";
import change = Simulate.change;

export function Setting() {
  const settings = useAppSelector((state) => state.settings);
  const { width } = useWindowSize();
  const [tab, setTab] = useState<number>(
    parseInt(localStorage.getItem("setTab") || "0")
  );
  const dispatch = useAppDispatch();
  const { saveSettings, refreshSettings, changeLanguage } = useSettings();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { backUpBook } = useShelf();
  const category = [
    t("common"),
    t("preference"),
    t("shelf"),
    t("reading"),
    t("download"),
    t("sync"),
  ];
  const { changeTheme } = useTheme();
  useEffect(() => {
    localStorage.setItem("setTab", tab.toString());
  }, [tab]);
  const { win_width } = useWindows();
  const {
    changeFontSize,
    changeLineHeight,
    changeParagraphSpacing,
    changeDictionaryOrigin,
  } = useSettings();

  const common = [
    {
      start: t("starts at boot time"),
      end: (
        <Toggle
          onChange={(checked) => {
            dispatch(
              settingsSlice.actions.changeSettings({
                common: { startWithWin: checked },
              })
            );
          }}
          defaultChecked={settings.common.startWithWin}
        />
      ),
    },
    {
      start: t(
        "close the main panel minimized to the tray (takes effect on next startup)"
      ),
      end: (
        <Toggle
          onChange={(checked) => {
            dispatch(
              settingsSlice.actions.changeSettings({
                common: { minWithTray: checked },
              })
            );
          }}
          defaultChecked={settings.common.minWithTray}
        />
      ),
    },
  ];
  const preference = [
    {
      start: t("theme"),
      end: (
        <MenuButton
          context={{
            type: "menu",
            label: t(theme.name),
            sub: [
              {
                type: "item",
                label: t("default"),
                onClick(): any {
                  changeTheme("default");
                },
              },
              {
                type: "item",
                label: t("dark"),
                onClick(): any {
                  changeTheme("dark");
                },
              },
            ],
          }}
        />
      ),
    },
    {
      start: t("language"),
      end: (
        <MenuButton
          context={{
            type: "menu",
            label: t(i18n.language as Language),
            sub: [
              {
                type: "item",
                label: t("chinese"),
                onClick(): any {
                  changeLanguage("zh");
                },
              },
              {
                type: "item",
                label: t("english"),
                onClick(): any {
                  changeLanguage("en");
                },
              },
            ],
          }}
        />
      ),
    },
  ];
  const shelf = [
    {
      start: t("book cover"),
      end: (
        <Button
          label={settings.shelf.coverUrl || t("default")}
          onClick={() => {
            Dialog.select({
              properties: ["openFile"],
              filters: [{ extensions: ["jpg", "png"], name: "picture" }],
            }).then((res) => {
              dispatch(
                settingsSlice.actions.changeSettings({
                  shelf: { coverUrl: res[0] },
                })
              );
            });
          }}
        />
      ),
    },
  ];
  const reading = [
    {
      start: "font",
      end: (
        <MenuButton
          context={{
            type: "menu",
            label: settings.reading.fontFamily,
            sub: [
              {
                type: "item",
                label: "Noto",
                onClick(): any {
                  dispatch(
                    settingsSlice.actions.changeSettings({
                      reading: { fontFamily: "Noto" },
                    })
                  );
                },
              },
            ],
          }}
        />
      ),
    },
    {
      start: t("font size"),
      end: (
        <Range
          markLabel={true}
          args={THEME_CONSTANT.FontSize}
          defaultValue={settings.reading.fontSize}
          onChange={changeFontSize}
        />
      ),
    },

    {
      start: "line height",
      end: (
        <Range
          markLabel={true}
          args={THEME_CONSTANT.LineHeight}
          defaultValue={settings.reading.lineHeight}
          onChange={changeLineHeight}
        />
      ),
    },

    {
      start: "paragraph spacing",
      end: (
        <Range
          markLabel={true}
          args={THEME_CONSTANT.ParagraphSpacing}
          defaultValue={settings.reading.paragraphSpacing}
          onChange={changeParagraphSpacing}
        />
      ),
    },
    {
      start: "background",
      end: (
        <Button
          label={settings.reading.background || t("default")}
          onClick={async () => {
            await Dialog.select({
              title: "select a picture",
              filters: [{ extensions: ["jpg", "png"], name: "picture" }],
              properties: ["openFile"],
            });
            toast.warning("该功能暂未开放");
          }}
        />
      ),
    },
    {
      start: "dictionary",
      end: (
        <MenuButton
          context={{
            type: "menu",
            label: settings.reading.dictionary,
            sub: [
              {
                type: "item",
                label: "online",
                onClick(): any {
                  changeDictionaryOrigin("online");
                },
              },
              {
                type: "item",
                label: "local",
                onClick(): any {
                  changeDictionaryOrigin("local");
                },
              },
            ],
          }}
        />
      ),
    },
  ];
  const download = [
    {
      start: "download path",
      end: (
        <Button
          label={settings.reading.background || t("default")}
          onClick={async () => {
            await Dialog.directory();
            toast.warning("该功能暂未开放");
          }}
        />
      ),
    },
    {
      start: "cache path",
      end: (
        <Button
          label={settings.reading.background || t("default")}
          onClick={async () => {
            await Dialog.directory();
            toast.warning("该功能暂未开放");
          }}
        />
      ),
    },
    {
      start: "clear cache",
      end: (
        <Button
          label={"clear cache"}
          onClick={async () => {
            toast.warning("暂无可以清理的缓存");
          }}
        />
      ),
    },
  ];
  const sync = [
    {
      start: "server",
      end: <input defaultValue={"https://"} />,
    },
    {
      start: "cloud drive backup",
      end: (
        <Button
          label={"begin to synchronize"}
          onClick={async () => {
            toast.warning("该功能暂未开放");
          }}
        />
      ),
    },
    {
      start: "local drive backup",
      end: (
        <Button
          label={"select directory to back up books"}
          onClick={() => {
            backUpBook();
          }}
        />
      ),
    },
  ];
  const handle = [
    {
      type: "item",
      label: "save settings",
      icon: <MdOutlineSave />,
      onClick: saveSettings,
    },
    {
      type: "item",
      label: "refresh settings",
      icon: <MdRefresh />,
      onClick: refreshSettings,
    },
    {
      type: "item",
      label: "reset default settings",
      icon: <MdRefresh />,
      onClick: () => {
        dispatch(settingsSlice.actions.changeSettings(initialTheme));
        toast.success("还原成功");
      },
    },
    {
      type: "item",
      label: "export settings",
      icon: <MdOutlineFileUpload />,
      onClick: async () => {
        try {
          const res = await Dialog.save("settings.config", "保存配置文件到");
          if (res.canceled) err("取消导出");

          const path = res.filePath as string;
          await FileInter.save(path, JSON.stringify(settings));
          toast.success("导出成功");
        } catch (e) {
          toast.error(e as string);
        }
      },
    },
  ];

  return (
    <Container
      flexLayout
      col
      full
      sx={{
        px: 3,
        height: "100%",
        overflow: "visible",
      }}
    >
      <Container
        flexLayout
        sx={{
          mb: 15,
          width: width,
          maxWidth: 700,
          mt: 4,
          fontSize: "1.62rem",
          height: "100%",
          overflow: "visible",
        }}
      >
        <Container
          open={win_width > THEME_CONSTANT.breakpoints.md}
          sx={{
            height: "100%",
            position: "relative",
            width: 200,
            overflow: "visible",
          }}
        >
          <Container
            col
            full
            sx={{
              right: 20,
              position: "absolute",
              mb: 8,
              fontSize: 56,
              color: "#3d3d3d",
              textAlign: "right",
              overflow: "visible",
            }}
          >
            {t("settings")}
          </Container>
          <Container
            col
            full
            sx={{
              mt: 12,
              pr: 3,
            }}
          >
            {category.map((item, key) => (
              <FontButton
                sx={{ marginLeft: "auto" }}
                onClick={() => {
                  setTab(key);
                }}
                key={key}
                label={item}
              />
            ))}
          </Container>
        </Container>
        <Divider vertical open={win_width > THEME_CONSTANT.breakpoints.md} />

        <Hangover
          flexLayout
          col
          sx={{
            height: "100%",
            p: 3,
            overflow: "visible",
            ":>": { backgroundColor: "#000" },
          }}
        >
          <Container
            open={win_width <= THEME_CONSTANT.breakpoints.md}
            sx={{ mb: 5 }}
            flexLayout
          >
            {category.map((item, key) => (
              <FontButton
                sx={{ marginLeft: "auto" }}
                onClick={() => {
                  setTab(key);
                }}
                key={key}
                label={item}
              />
            ))}
          </Container>
          <SettingPair open={tab === 0} pairs={common} />
          <SettingPair open={tab === 1} pairs={preference} />
          <SettingPair open={tab === 2} pairs={shelf} />
          <SettingPair open={tab === 3} pairs={reading} />
          <SettingPair open={tab === 4} pairs={download} />
          <SettingPair open={tab === 5} pairs={sync} />
          <Hangover />
          <Container full col>
            {handle.map((item, key) => (
              <FontButton key={key} label={item.label} onClick={item.onClick} />
            ))}
          </Container>
        </Hangover>
      </Container>
    </Container>
  );
}

interface SettingPairProps extends ElementProps {
  pairs: {
    start: string;
    end: ReactNode;
  }[];
}

const SettingPair = (props: SettingPairProps) => {
  const { theme } = useTheme();
  return (
    <Container full open={props.open} sx={{ overflow: "visible" }}>
      {props.pairs.map((item, key) => (
        <Container
          sx={{
            my: 2,
            overflow: "visible",
          }}
          key={key}
          flexLayout
          full
        >
          <Hangover sx={{ color: theme.button.color?.default }}>
            {__.capitalize(item.start)}
          </Hangover>
          {item.end}
        </Container>
      ))}
    </Container>
  );
};
