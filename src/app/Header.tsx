import {
  Button,
  Container,
  Hangover,
  IconButton,
  Menu,
  Pop,
} from "../component";
import React, { useRef } from "react";
import { remote } from "../method";
import { usePath } from "../hook/usePath";
import { useSettings } from "../hook/useSettings";
import {
  MdChangeCircle,
  MdClose,
  MdCropSquare,
  MdOutlineSettings,
  MdRemove,
} from "react-icons/md";
import { useEvent } from "../hook/useEvent";
import { useTranslation } from "react-i18next";

export function Header() {
  const { currentName, switchShelfAndReading, toReading, toShelf, toSetting } =
    usePath();
  const { closeApp } = useSettings();
  const ref = useRef<HTMLElement>();
  const { t } = useTranslation();
  const onContextMenu = useEvent(() => {
    Pop.set(
      <Menu>
        {{
          type: "menu",
          sub: [
            {
              type: "item",
              label: t("reading"),
              onClick: toReading,
            },
            {
              type: "item",
              label: t("shelf"),
              onClick: toShelf,
            },
          ],
        }}
      </Menu>,
      { position: "absolute", anchor: ref.current, base: "bottom" }
    ).open();
  });
  return (
    <Container cls={"Header"}>
      <Button
        ref={ref}
        startIcon={<MdChangeCircle />}
        onClick={switchShelfAndReading}
        onContextMenu={onContextMenu}
        label={currentName}
      />
      <Hangover cls={"draggable"} sx={{ height: "100%" }} />
      <IconButton icon={<MdOutlineSettings />} onClick={toSetting} />
      <IconButton icon={<MdRemove />} onClick={() => remote("window_min")} />
      <IconButton
        icon={<MdCropSquare />}
        onClick={() => remote("window_max")}
      />
      <IconButton icon={<MdClose />} onClick={closeApp} />
    </Container>
  );
}
