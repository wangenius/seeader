import {Button, Exp, IconButton, icons, Once} from "@/component";
import React from "react";
import {useNav} from "@/hook/useNav";
import {MdClose, MdCropSquare, MdRemove} from "react-icons/md";
import {Channels} from "local";
import {app} from "@/method/app";

/** @Description 标题栏 */
export function Header() {
  const nav = useNav();
  return (
    <Once cs={"Header"}>
      <Button startIcon={icons.out} lc={nav.switch} rc={nav.switchSettings} label={nav.label} />
      <Exp cs={"draggable"} />
      <IconButton icon={icons.settings} lc={nav.switchSettings} />
      <IconButton icon={<MdRemove />} value={Channels.window_min} lc={app} />
      <IconButton
        icon={<MdCropSquare />}
        value={Channels.window_max}
        lc={app}
      />
      <IconButton icon={<MdClose />} lc={app.close} />
    </Once>
  );
}
