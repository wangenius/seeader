import React, {memo, useEffect, useState} from "react";
import {Spring} from "./index";
import {EventManager, ModalEmit} from "../@constant/event";
import {useSpring} from "@react-spring/web";
import {useEffectOnce} from "react-use";

/** @Description MODAL CONTAINER */
const ModalContainer = memo(() => {
  /** @Description 状态 open => visible => event =>!visible => onRest => !open */
  const [open, setOpen] = useState<true | null>(null);
  /** @Description 动画状态 */
  const [visible, setVisible] = useState<boolean>(false);
  /** @Description 监听外部event */
  useEffectOnce(() => {
    ModalEvent.on(ModalEmit.Open, openModal).on(ModalEmit.Close, clickAway)
  });
  /** @Description 关闭modal */
  const closeModal = () => setOpen(null);
  /** @Description 打开modal */
  const openModal = () => {
    setOpen(true);
    setVisible(true);
  };
  /** @Description clickAway */
  const clickAway = () => setVisible(false);
  /** @Description fade spring */
  const spring = useSpring({
    onRest: () => !visible && closeModal(),
    from: { opacity: 0 },
    to: { opacity: visible ? 1 : 0 },
    config: { duration: 300 },
  });

  return open && <Spring cls={"Modal"} onClick={clickAway} spring={spring} />;
});

/** @Description 事件管理器 */
const ModalEvent = new EventManager<ModalEmit>();
const modal = () => ModalEvent.emit(ModalEmit.Open);
modal.close = () => ModalEvent.emit(ModalEmit.Close);
export { ModalContainer, modal };
