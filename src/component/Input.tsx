import React, { forwardRef, LegacyRef, memo, useRef } from "react";
import { Once, IconButton } from "./index";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { fn } from "@/method";
import { useTranslation } from "react-i18next";
import { TFuncKey } from "i18next";
import _ from "lodash";
import { useEvent } from "@/hook/useEvent";

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
export const Selector = memo((props: Props.Input.Selector) => {
  const { onClick = fn, children, open = true } = props;
  const { t } = useTranslation();
  return (
    <Once style={{ display: open ? "block" : "none" }} cs={"SettingBox"}>
      <Once cs={"title"}>{t(props.title as TFuncKey)}</Once>
      <Once cs={"Options"}>
        {_.toPairsIn(children).map((item, key) => {
          return (
            <Once
              cs={"Option"}
              state={props.value === item[1] ? "actived" : undefined}
              lc={() => onClick(item[1])}
              key={key}
            >
              {t(item[0] as TFuncKey) || item}
            </Once>
          );
        })}
      </Once>
    </Once>
  );
});
