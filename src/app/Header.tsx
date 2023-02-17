import {Button, Exp, IconButton, icons, Once} from "@/component";
import React, {useRef} from "react";
import {useNav} from "@/hook/useNav";
import {MdClose, MdCropSquare, MdRemove} from "react-icons/md";
import {_book} from "@/method/_book";
import {v} from "@/method/v";

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
      <IconButton icon={<MdRemove />} value={"window_min"} lc={v.i} />
      <IconButton icon={<MdCropSquare />} value={"window_max"} lc={v.i} />
      <IconButton icon={<MdClose />} lc={v.close} />
    </Once>
  );
}
