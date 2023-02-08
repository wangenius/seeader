import {Exp, IconButton, Icons, Once, Spring} from "@/component";
import React, {createRef, useEffect, useState} from "react";
import {remote} from "@/method";
import {useNav} from "@/hook/useNav";
import {useSettings} from "@/hook/useSettings";
import {MdClose, MdCropSquare, MdMoreHoriz, MdRemove} from "react-icons/md";
import {Channels, Style} from "a_root";
import {useSpring} from "@react-spring/web";
import {config} from "react-spring";
import {useGesture} from "@use-gesture/react";
import ClickAwayListener from "react-click-away-listener";

/** @Description 标题栏 */
export function Header() {
  const { closeApp } = useSettings();
  return (
    <Once cs={"Header"}>
      <ExpandDocker />
      <Exp cs={"draggable"} />
      <IconButton icon={<MdRemove />} value={Channels.window_min} lc={remote} />
      <IconButton
        icon={<MdCropSquare />}
        value={Channels.window_max}
        lc={remote}
      />
      <IconButton icon={<MdClose />} lc={closeApp} />
    </Once>
  );
}

/** @Description expandDocker */
export const ExpandDocker = () => {
  const { toReading, toShelf, toSetting, switchShelfAndReading } = useNav();
  const ref = createRef();
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
    boxShadow: Style.shadow.docker_hide,
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
    boxShadow: Style.shadow.docker,
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
    onClick: () => {
      setExpand(true);
    },
  });

  /** @Description content item */
  const items = [
    { icon: Icons.Book, onClick: toReading },
    { icon: Icons.Folder, onClick: toShelf },
    { icon: Icons.Setting, onClick: toSetting },
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
        cs={"expandable"}
        rc={() => {
          !expand && switchShelfAndReading();
        }}
      >
        <Once {...bind()} state={expand ? "expand" : undefined} cs={"drag"}>
          <MdMoreHoriz />
        </Once>
        {items.map((item, key) => {
          return (
            <Once
              key={key}
              cs={"item"}
              lc={(event) => {
                event.stopPropagation();
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
