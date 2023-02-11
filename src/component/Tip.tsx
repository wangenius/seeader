import {Once} from "@/component/Once";
import React, {memo, ReactNode, RefObject, useState} from "react";
import i18next, {TFuncKey} from "i18next";
import {useEffectOnce} from "react-use";
import {EventHandler, TipEventEmit} from "@/component/event";
import {Localizer} from "@/component/Localizer";

/** @Description Tip Container */
const TipContainer = memo(() => {
  const [content, setContent] = useState<ReactNode>(null);
  useEffectOnce(() => {
    TipEvent.on(TipEventEmit.Open, (content: ReactNode) =>
      setContent(content)
    ).on(TipEventEmit.Close, () => setContent(null));
  });
  return <Once open={!!content} cs={"Tip"} children={content} />;
});

/** @Description 事件管理器 */
const TipEvent = new EventHandler<TipEventEmit>();

/** @Description tip */
const tip =
  (content: Label, Ref: RefObject<any>, base: LocalizerBase = "right_middle") =>
  () => {
    TipEvent.emit(
      TipEventEmit.Open,
      <Localizer
        base={base}
        cs={"toolTip"}
        anchor={Ref.current}
        children={i18next.t(content as TFuncKey)}
      />
    );
  };

tip.out = () => TipEvent.emit(TipEventEmit.Close);

export { TipContainer, tip };
