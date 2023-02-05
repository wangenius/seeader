import {Container, Hangover, IconButton, Spring} from "../component";
import React, {useEffect, useRef, useState} from "react";
import {remote} from "../method";
import {useNav} from "../hook/useNav";
import {useSettings} from "../hook/useSettings";
import {MdClose, MdCropSquare, MdMoreHoriz, MdRemove} from "react-icons/md";
import {CHANNELS} from "a_root";
import {useSpring} from "@react-spring/web";
import {ClickAwayListener} from "@mui/material";
import {config} from "react-spring";
import {STYLES} from "../@constant";
import {useGesture} from "@use-gesture/react";
import BookIcon from "../@static/book.svg";
import ShelfIcon from "../@static/shelf.svg";
import SettingIcon from "../@static/setting.svg";

/** @Description 标题栏 */
export function Header() {
  const { closeApp } = useSettings();
  return (
    <Container cls={"Header"}>
      <ExpandDocker />
      <Hangover cls={"draggable"} />
      <IconButton
        icon={<MdRemove />}
        value={CHANNELS.window_min}
        onClick={remote}
      />
      <IconButton
        icon={<MdCropSquare />}
        value={CHANNELS.window_max}
        onClick={remote}
      />
      <IconButton icon={<MdClose />} onClick={closeApp} />
    </Container>
  );
}

/** @Description expandDocker */
export const ExpandDocker = () => {
  const { toReading, toShelf, toSetting, switchShelfAndReading } = useNav();
  const ref = useRef<HTMLElement>();
  /** @Description state toggle */
  const [expand, setExpand] = useState(false);
  /** @Description init state */
  const before = {
    width: 50,
    height: 24,
    left: 0,
    top: 3,
    x: 0,
    y: 0,
    backgroundColor: "#03033a",
    color: "#f1f1f1",
    borderRadius: 12,
    boxShadow: STYLES.shadow.docker_hide,
    config: config.gentle,
    scale: 1,
  };
  /** @Description expanded state */
  const after: Partial<typeof before> = {
    height: 200,
    width: 400,
    top: 13,
    left: 8,
    borderRadius: 12,
    boxShadow: STYLES.shadow.docker,
    backgroundColor: "#ffffff",
  };
  /** @Description generate spring */
  const [spring, api] = useSpring(() => before);

  /** @Description change expand trigger api */
  useEffect(() => {
    api.start(expand ? after : before);
  }, [expand]);

  /** @Description gesture bind */
  const bind = useGesture({
    onHover: () => {
      expand
        ? api.start({
            scale: 0.96,
          })
        : api.start({
            backgroundColor: "#2b7eea",
          });
    },
    onMouseLeave: () => {
      expand
        ? api.start({
            scale: 1,
          })
        : api.start({
            backgroundColor: before.backgroundColor,
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

  /** @Description content item */
  const items = [
    { icon: <BookIcon />, onClick: toReading },
    { icon: <ShelfIcon />, onClick: toShelf },
    { icon: <SettingIcon />, onClick: toSetting },
  ];

  return (
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
        onContextMenu={()=>!expand && switchShelfAndReading() }
      >
        <Container
          {...bind()}
          state={expand ? "expand" : undefined}
          cls={"drag"}
        >
          <MdMoreHoriz />
        </Container>
        {items.map((item, key) => {
          return (
            <Container
              key={key}
              cls={"item"}
              onClick={(e) => {
                e.stopPropagation();
                setExpand(false);
                item.onClick();
              }}
              children={item.icon}
            />
          );
        })}
      </Spring>
    </ClickAwayListener>
  );
};
