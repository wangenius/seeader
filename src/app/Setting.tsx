import { Container, Hangover } from "../component/Container";
import React, { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Button, FontButton } from "../component/Button";
import { initialSettings, settingsSlice } from "../store/slice_settings";
import { MdOutlineFileUpload, MdOutlineSave, MdRefresh } from "react-icons/md";
import { useSettings } from "../hook/useSettings";
import { MenuButton } from "../component/Menu";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Language } from "../@types/i18next";
import __ from "lodash";
import _ from "lodash";
import { SliderInput, ToggleInput } from "../component/Input";
import { toast } from "react-toastify";
import { err } from "../method/general";
import { useShelf } from "../context/ShelfProvider";
import { useWindows } from "../hook/useWindows";
import { SliderInstance } from "../@constant/slider";
import { File } from "../method/file";
import { Dialog } from "../method/dialog";

export const Setting = memo(() => {
  const settings = useAppSelector((state) => state.settings);
  const [tab, setTab] = useState<number>(
    parseInt(localStorage.getItem("setTab") || "0")
  );
  const dispatch = useAppDispatch();
  const { saveSettings, refreshSettings, changeLanguage } = useSettings();
  const { t } = useTranslation();
  const { backUpBook } = useShelf();
  const category = [t("common"), t("preference"), t("shelf"), t("reading")];
  useEffect(() => {
    localStorage.setItem("setTab", tab.toString());
  }, [tab]);
  const { win_width } = useWindows();
  const {
    changeFontSize,
    changeLineHeight,
    changeParagraphSpacing,
    changeDictionaryOrigin,
    changeSettings,
  } = useSettings();

  const common = [
    {
      start: t("starts at boot time"),
      end: (
        <ToggleInput
          onChange={(checked) =>
            changeSettings({
              common: { startWithWin: checked },
            })
          }
          defaultChecked={settings.common.startWithWin}
        />
      ),
    },
    {
      start: t(
        "close the main panel minimized to the tray (takes effect on next startup)"
      ),
      end: (
        <ToggleInput
          onChange={(checked) =>
            changeSettings({
              common: { minWithTray: checked },
            })
          }
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
            label: "gg",
            sub: [
              {
                type: "item",
                label: t("default"),
                onClick(): any {
                },
              },
              {
                type: "item",
                label: t("dark"),
                onClick(): any {

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
        <>
          <Button
            label={settings.shelf.coverUrl || t("default")}
            onClick={() => {
              Dialog.select({
                properties: ["openFile"],
                filters: [{ extensions: ["jpg", "png"], name: "picture" }],
              }).then(async (res) => {
                const a = await File.copyForce(res[0], "cover.jpg");
                changeSettings({
                  shelf: { coverUrl: "cover.jpg" },
                });
              });
            }}
          />
          <Button
            label={"还原默认"}
            onClick={() => {
              changeSettings({
                shelf: { coverUrl: "" },
              });
            }}
          />
        </>
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
                  changeSettings({
                    reading: { fontFamily: "Noto" },
                  });
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
        <SliderInput
          markLabel={true}
          args={SliderInstance.FontSize}
          defaultValue={settings.reading.fontSize}
          onChange={changeFontSize}
        />
      ),
    },

    {
      start: "line height",
      end: (
        <SliderInput
          markLabel={true}
          args={SliderInstance.LineHeight}
          defaultValue={settings.reading.lineHeight}
          onChange={changeLineHeight}
        />
      ),
    },

    {
      start: "paragraph spacing",
      end: (
        <SliderInput
          markLabel={true}
          args={SliderInstance.ParagraphSpacing}
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
        dispatch(settingsSlice.actions.changeSettings(initialSettings));
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
          await File.save(path, JSON.stringify(settings));
          toast.success("导出成功");
        } catch (e) {
          toast.error(e as string);
        }
      },
    },
  ];

  return (
    <Container cls={"Setting"}>
      <Container cls={"NavBar"}>
        <Container cls={"Title"} children={t("settings")} />
        {category.map((item, key) => (
          <FontButton
            onClick={() => {
              setTab(key);
            }}
            key={key}
            label={item}
          />
        ))}
        {handle.map((item, key) => (
          <FontButton key={key} label={item.label} onClick={item.onClick} />
        ))}
      </Container>
      <Container cls={"SetArea"}>
        {_.concat(common, preference, shelf, reading).map((item, key) => {
          return (
            <Container cls={"SetPair"} key={key}>
              <Hangover cls={"PairName"}>{__.capitalize(item.start)}</Hangover>
              {item.end}
            </Container>
          );
        })}
      </Container>
    </Container>
  );
});
