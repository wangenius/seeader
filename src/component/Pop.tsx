import React, { memo, ReactNode, useState } from "react";
import { Container, Localizer, modal } from "./index";
import { ClickAwayListener } from "@mui/material";
import { useEffectOnce } from "react-use";
import { EventManager, PopEventEmit } from "../@constant/event";
import { LocalizerProps } from "../@types/localizer";

/** @Description Pop Container */
const PopContainer = memo(() => {
  /** @Description content */
  const [content, setContent] = useState<ReactNode>(null);
  /** @Description 状态 */
  const [open, setOpen] = useState<true | null>(null);
  /** @Description init */
  useEffectOnce(() => {
    PopEvent.on(PopEventEmit.Content, popChange)
      .on(PopEventEmit.Close, popClose)
      .on(PopEventEmit.Open, popOpen);
  });
  /** @Description popChange */
  const popChange = (content: ReactNode) => setContent(content);
  /** @Description 打开pop */
  const popOpen = () => setOpen(true);
  /** @Description 关闭pop */
  const popClose = () => {
    setContent(null);
    setOpen(null);
  };

  return (
    open && (
      <ClickAwayListener disableReactTree onClickAway={pop.close}>
        <Container cls={"Pop"}>{content}</Container>
      </ClickAwayListener>
    )
  );
});

/** @Description 事件管理器 */
const PopEvent = new EventManager<PopEventEmit>();
const pop = (content: ReactNode, configs?: LocalizerProps) => {
  PopEvent.emit(
    PopEventEmit.Content,
    <Localizer {...configs}>{content}</Localizer>
  );
};

pop.modal = (content: ReactNode, configs?: LocalizerProps) => {
  modal();
  pop(content, configs);
  pop.open();
};
pop.open = () =>  PopEvent.emit(PopEventEmit.Open);
pop.close = () => {
  PopEvent.emit(PopEventEmit.Close);
  modal.close()
};
export { PopContainer, pop };
