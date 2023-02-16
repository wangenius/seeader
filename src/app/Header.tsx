import {Button, Exp, IconButton, icons, Once} from "@/component";
import React, {useRef} from "react";
import {useNav} from "@/hook/useNav";
import {MdClose, MdCropSquare, MdRemove} from "react-icons/md";
import {app} from "@/method/app";
import {_book} from "@/data/method/_book";

/** @Description 标题栏 */
export function Header() {
  const nav = useNav();
  const Ref = useRef();
  return (
    <Once cs={"Header"}>
      <Button
        ref={Ref}
        startIcon={icons.out}
        lc={nav.switch}
        rc={() => _book.info(_book())}
        label={nav.label}
      />
      <Exp cs={"draggable"} />
      <IconButton icon={icons.settings} lc={nav.switchSettings} />
      <IconButton icon={<MdRemove />} value={"window_min"} lc={app} />
      <IconButton icon={<MdCropSquare />} value={"window_max"} lc={app} />
      <IconButton icon={<MdClose />} lc={app.close} />
    </Once>
  );
}
