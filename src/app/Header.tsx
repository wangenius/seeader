import {Exp, IconButton, icons, Once, Spring} from "@/component";
import React, {createRef, useEffect, useState} from "react";
import {useNav} from "@/hook/useNav";
import {MdClose, MdCropSquare, MdMoreHoriz, MdRemove} from "react-icons/md";
import {Channels, Style} from "local";
import {useSpring} from "@react-spring/web";
import {config} from "react-spring";
import {useGesture} from "@use-gesture/react";
import ClickAwayListener from "react-click-away-listener";
import {invoke} from "@/method";
import {app} from "@/method/frag";
import {store} from "@/data/store";

/** @Description 标题栏 */
export function Header() {

  console.log(window.paths)
  console.log(store.getState())

  return (
    <Once cs={"Header"}>
      <ExpandDocker />
      <Exp cs={"draggable"} />
      <IconButton icon={<MdRemove />} value={Channels.window_min} lc={invoke} />
      <IconButton
        icon={<MdCropSquare />}
        value={Channels.window_max}
        lc={invoke}
      />
      <IconButton icon={<MdClose />} lc={app.close} />
    </Once>
  );
}

/** @Description expandDocker */
export const ExpandDocker = () => {
  const nav = useNav();
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
    { icon: icons.book, onClick: nav.reading },
    { icon: icons.folder, onClick: nav.shelf },
    { icon: icons.setting, onClick: nav.settings },
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
          !expand && nav.switch();
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
