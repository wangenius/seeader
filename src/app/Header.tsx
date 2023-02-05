import {
  Container,
  Hangover,
  IconButton,
  Menu,
  Pop,
  Spring,
} from "../component";
import React, { useEffect, useRef, useState } from "react";
import { remote } from "../method";
import { useNav } from "../hook/useNav";
import { useSettings } from "../hook/useSettings";
import { MdClose, MdCropSquare, MdMoreHoriz, MdRemove } from "react-icons/md";
import { useEvent } from "../hook/useEvent";
import { useTranslation } from "react-i18next";
import { CHANNELS } from "a_root";
import { useSpring } from "@react-spring/web";
import { ClickAwayListener } from "@mui/material";
import { config } from "react-spring";
import { STYLES } from "../@constant";
import  BookPerson from "../@static/book-person.svg";
import { useGesture } from "@use-gesture/react";

export function Header() {
  const { toReading, toShelf, toSetting } = useNav();
  const { closeApp } = useSettings();
  const ref = useRef<HTMLElement>();
  const { t } = useTranslation();
  /** @Description 右键菜单 */
  const menu: Props.Menu.Option = {
    type: "menu",
    sub: [
      {
        type: "item",
        label: "reading",
        onClick: toReading,
      },
      {
        type: "item",
        label: "shelf",
        onClick: toShelf,
      },
      {
        type: "item",
        label: "settings",
        onClick: toSetting,
      },
    ],
  };
  /** @Description 右键菜单方法 */
  const onContextMenu = useEvent(() => {
    Pop.set(<Menu>{menu}</Menu>, {
      position: "absolute",
      anchor: ref.current,
      base: "bottom",
    }).open();
  });

  const [expand, setExpand] = useState(false);
  const before = {
    width:60,
    height: 24,
    left: 0,
    top: 3,
    x: 0,
    y: 0,
    backgroundColor: "#494949",
    color: "#f1f1f1",
    borderRadius:12,
    boxShadow: STYLES.shadow.docker_hide,
    config: config.gentle,
    scale: 1,
  };
  const [spring, api] = useSpring(() => before);

  const after: Partial<typeof before> = {
    height: 200,
    width: 400,
    top: 13,
    left: 8,
    borderRadius: 12,
    boxShadow: STYLES.shadow.docker,
    backgroundColor: "#ffffff",
  };

  const toggle = () => {
    expand ? api.start(after) : api.start(before);
  };

  useEffect(toggle, [expand]);

  const bind = useGesture({
    onHover: () => {
      !expand
        ? api.start({
            backgroundColor: "#363636",
          })
        : api.start({
            scale: 0.96,
          });
    },
    onMouseLeave: () => {
      !expand
        ? api.start({
            backgroundColor: expand ? "#fff" : before.backgroundColor,
          })
        : api.start({
            scale: 1,
          });
    },
    onDrag: (state) => {
      const { active, movement } = state;
      api.start({
        x: active ? movement[0] : 0,
        y: active ? movement[1] : 0,
        delay: 0,
        config: active ? config.stiff : config.wobbly,
      });
    },
  });

  return (
    <Container cls={"Header"}>
      <ClickAwayListener
        onClickAway={() => {
          setExpand(false);
        }}
      >
        <Spring
          ref={ref}
          spring={spring}
          cls={"expandable"}
          onClick={() => {
            setExpand(true);
          }}
          onContextMenu={onContextMenu}
        >
          <Container {...bind()} state={expand?"expand":undefined} cls={"drag"}>
            <MdMoreHoriz />
          </Container>
          <Container>
            <BookPerson />
          </Container>
        </Spring>
      </ClickAwayListener>
      <Hangover cls={"draggable"} />
      <IconButton
        icon={<MdRemove />}
        value={CHANNELS.window_min}
        onClick={remote}
      />
      <IconButton
        icon={<MdCropSquare />}
        value={CHANNELS.window_min}
        onClick={remote}
      />
      <IconButton icon={<MdClose />} onClick={closeApp} />
    </Container>
  );
}
