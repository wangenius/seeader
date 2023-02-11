import React, {memo, ReactNode, useEffect, useState} from "react";
import {Localizer, modal, Once} from "./index";
import {useEffectOnce} from "react-use";
import {EventHandler, PopEventEmit} from "./event";
import ClickAwayListener from "react-click-away-listener";

/** @Description Pop Container */
const PopContainer = memo(() => {
  /** @Description content */
  const [content, setContent] = useState<ReactNode>(null);
  /** @Description 状态 */
  const [exist, setExist] = useState<boolean>(false);

  /** @Description init */
  useEffectOnce(() => {
    PopEvent.on(PopEventEmit.Content, set)
      .on(PopEventEmit.Close, close)
      .on(PopEventEmit.Open, open);
  });

  useEffect(() => {
    !exist && setContent(null);
  }, [exist]);

  /** @Description setPop */
  const set = (content: ReactNode) => setContent(content);
  /** @Description 打开pop */
  const open = () => setExist(true);
  /** @Description 关闭pop */
  const close = () => setExist(false);

  if (!exist) return null;
  return (
    <ClickAwayListener onClickAway={close}>
      <Once cs={"Pop"}>{content}</Once>
    </ClickAwayListener>
  );
});

/** @Description 事件管理器 */
const PopEvent = new EventHandler<PopEventEmit>();

abstract class Pop {
  static set(content: ReactNode, configs?: Props.Localizer) {
    PopEvent.emit(
      PopEventEmit.Content,
      <Localizer {...configs} children={content} />
    );
    return this;
  }

  static open() {
    PopEvent.emit(PopEventEmit.Open);
  }

  static close() {
    PopEvent.emit(PopEventEmit.Close);
  }

  static modal(content: ReactNode, configs?: Props.Localizer) {
    modal();
    this.set(<Once cs={"modalBox"}>{content}</Once>, configs).open();
  }
}

export { PopContainer, Pop };
