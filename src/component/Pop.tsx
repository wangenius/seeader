import React, {memo, ReactNode, useState} from "react";
import {Button, Once, Divider, Localizer, modal, Spring} from "./index";
import {useEffectOnce} from "react-use";
import {EventHandler, PopEventEmit} from "./event";
import i18next from "i18next";
import {useDrag} from "@use-gesture/react";
import {config} from "react-spring";
import {useSpring} from "@react-spring/web";
import ClickAwayListener from "react-click-away-listener";

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
  const popChange = (content: ReactNode) => {
    popClose();

    setContent(content);
  };
  /** @Description 打开pop */
  const popOpen = () => {
    setTimeout(() => {
      setOpen(true);
    }, 10);
  };
  /** @Description 关闭pop */
  const popClose = () => {
    setContent(null);
    setOpen(null);
  };

  return (
    open && (
      <ClickAwayListener onClickAway={Pop.close}>
        <Once cs={"Pop"}>{content}</Once>
      </ClickAwayListener>
    )
  );
});

/** @Description 事件管理器 */
const PopEvent = new EventHandler<PopEventEmit>();

abstract class Pop {
  static set(content: ReactNode, configs?: Props.Localizer) {
    PopEvent.emit(
      PopEventEmit.Content,
      <Localizer {...configs}>{content}</Localizer>
    );
    return this;
  }

  static modal = (content: ReactNode, configs?: Props.Localizer) => {
    modal();
    this.set(<Once cs={"modalBox"}>{content}</Once>, configs).open();
    return this;
  };

  static confirm(msg: string, next: Fn) {
    modal();
    this.set(
      <ConfirmBox
        msg={msg}
        next={() => {
          next();
          this.close();
        }}
        cancel={this.close}
      />
    ).open();
    return this;
  }

  static open() {
    PopEvent.emit(PopEventEmit.Open);
  }

  static close() {
    PopEvent.emit(PopEventEmit.Close);
    modal.close();
  }
}

const ConfirmBox = memo((props: { msg: string; next: Fn; cancel: Fn }) => {
  const [spring, api] = useSpring(() => ({
    from: {
      x: 0,
      y: 0,
      scale: 0,
    },
    to: {
      scale: 1,
    },
  }));
  const bind = useDrag(({ active, offset: [mx, my] }) => {
    api.start({
      x: mx,
      y: my,
      scale: active ? 0.9 : 1,
      config: active ? config.stiff : config.wobbly,
    });
  });

  return (
    <Spring spring={spring}>
      <Once cs={"confirmBox"}>
        <Spring {...bind()} cs={"title"}>
          {i18next.t("confirm")}
        </Spring>
        <Divider />
        <Once cs={"msg"}>{props.msg}</Once>
        <Once cs={"foot"}>
          <Button label={"cancel"} lc={props.cancel} />
          <Button label={"confirm"} lc={props.next} />
        </Once>
      </Once>
    </Spring>
  );
});

export { PopContainer, Pop };
