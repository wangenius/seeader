import React, { forwardRef, LegacyRef, memo, useRef } from "react";
import { Container, IconButton } from "./index";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { voidFn } from "../method";
import { useTranslation } from "react-i18next";
import { TFuncKey } from "i18next";
import _ from "lodash";
import { useEvent } from "../hook/useEvent";

export const TextInput = memo(
  forwardRef((props: Props.Input.Text, ref: LegacyRef<any>) => {
    const {
      onChange,
      placeholder,
      sx,
      init,
      button = false,
      onClick = voidFn,
      ...other
    } = props;
    const Ref = useRef<HTMLInputElement>();
    const next = useEvent(() => onClick(Ref.current?.value));
    return (
      <Container cls={"TextInput"}>
        <IconButton
          open={button}
          onClick={next}
          cls={"TextButton"}
          size={30}
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
      </Container>
    );
  })
);

/** @Description 选择器 */
export const Selector = memo((props: Props.Input.Selector) => {
  const { onClick = voidFn, children, open = true } = props;
  const { t } = useTranslation();
  return (
    <Container sx={{ display: open ? "block" : "none" }} cls={"SettingBox"}>
      <Container cls={"title"}>{t(props.title as TFuncKey)}</Container>
      <Container cls={"Options"}>
        {_.toPairsIn(children).map((item, key) => {
          return (
            <Container
              cls={"Option"}
              state={props.value === item[1] ? "actived" : undefined}
              onClick={() => onClick(item[1])}
              key={key}
            >
              {t(item[0] as TFuncKey) || item}
            </Container>
          );
        })}
      </Container>
    </Container>
  );
});
