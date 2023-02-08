import {Once} from "@/component/Once";
import React, {memo, ReactNode, useState} from "react";
import i18next, {TFuncKey} from "i18next";
import {useEffectOnce} from "react-use";
import {EventHandler, TipEventEmit} from "@/component/event";
import {Localizer} from "@/component/Localizer";

/** @Description Pop Container */
const TipContainer = memo(() => {
  /** @Description content */
  const [content, setContent] = useState<ReactNode>(null);
  /** @Description 状态 */
  const [open, setOpen] = useState<true | null>(null);
  /** @Description init */
  useEffectOnce(() => {
    TipEvent.on(TipEventEmit.Open, tipChange).on(
      TipEventEmit.Close,
      tipClose
    );
  });
  /** @Description popChange */
  const tipChange = (content: ReactNode) => {
    tipClose();
    setContent(content);
    setTimeout(() => {
      setOpen(true);
    }, 10);
  };

  /** @Description 关闭pop */
  const tipClose = () => {
    setContent(null);
    setOpen(null);
  };

  return (
    <Once open={!!open} cs={"Tip"}>
      {content}
    </Once>
  );
});

/** @Description 事件管理器 */
const TipEvent = new EventHandler<TipEventEmit>();

/** @Description tip */
const tip =
  (label: Label, Ref: any, base: LocalizerBase = "right_middle") =>
  () => {
    TipEvent.emit(
      TipEventEmit.Open,
      <Localizer anchor={Ref.current} base={base} position={"absolute"}>
        <Once cs={"toolTip"}>{i18next.t(label as TFuncKey)}</Once>
      </Localizer>
    );
  };

tip.out = () => TipEvent.emit(TipEventEmit.Close);

export { TipContainer, tip };
