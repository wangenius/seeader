import React, { forwardRef, LegacyRef, memo, useEffect, useRef } from "react";
import { IconButton, Once, Spring } from "./index";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { fn } from "@/method";
import { useTranslation } from "react-i18next";
import { TFuncKey } from "i18next";
import _ from "lodash";
import { useEvent } from "@/hook/useEvent";
import { useSpring } from "@react-spring/web";

export const TextInput = memo(
  forwardRef((props: Props.Input.Text, ref: LegacyRef<any>) => {
    const {
      onChange,
      placeholder,
      sx,
      init,
      button = false,
      onClick = fn,
      ...other
    } = props;
    const Ref = useRef<HTMLInputElement>();
    const next = useEvent(() => onClick(Ref.current?.value));
    return (
      <Once cs={"TextInput"}>
        <IconButton
          open={button}
          lc={next}
          cs={"TextButton"}
          icon={<MdOutlineArrowRightAlt />}
        />
        <textarea
          rows={8}
          cols={4}
          defaultValue={init}
          {...other}
          placeholder={placeholder}
          ref={button ? Ref : ref}
        />
      </Once>
    );
  })
);

/** @Description 选择器 */
export const Selector = (props: Props.Input.Selector) => {
  const { onClick = fn, value, title, children, open = true } = props;
  const { t } = useTranslation();
  const Ref = useRef<HTMLDivElement>();

  const [spring, api] = useSpring(() => ({
    from: {
      height: "86%",
      top: "7%",
      borderRadius: "11px",
      position: "absolute",
      width: 0,
      left: 0,
      opacity: 0,
    },
    to: {
      opacity: 1,
      width: Ref.current?.clientWidth,
      left: Ref.current?.offsetLeft,
    },
    config: {
      duration: 0,
    },
  }));

  useEffect(() => {
    let left = Ref.current?.offsetLeft;
    let width = Ref.current?.clientWidth;
    api.start({ left: left, width: width, config: { duration: 200 } });
  });

  return (
    <Once style={{ display: open ? "block" : "none" }} cs={"SettingBox"}>
      <Once cs={"title"}>{t(title as TFuncKey)}</Once>
      <Once cs={"Options"}>
        {_.toPairsIn(children).map((item, key) => {
          return (
            <Once
              ref={value === item[1] ? Ref : undefined}
              cs={"Option"}
              state={value === item[1] ? "selected" : undefined}
              lc={() => {
                onClick(item[1]);
              }}
              key={key}
            >
              {t(item[0] as TFuncKey) || item}
            </Once>
          );
        })}
        <Spring spring={spring} cs={"actived"} />
      </Once>
    </Once>
  );
};
