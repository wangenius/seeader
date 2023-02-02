import React, {
  forwardRef,
  LegacyRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IconButton,Container } from "./index";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { voidFn } from "../method";
import { Slider, Switch } from "@mui/material";

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
    const next = useCallback(() => {
      onClick(Ref.current?.value);
    }, []);

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
    const { onClick = voidFn } = props;
    return (
        <Container cls={"SettingBox"}>
            {props.children.map((item, key) => {
                return (
                    <Container
                        cls={"Option"}
                        state={props.value === item.value ? "actived" : undefined}
                        onClick={() => {
                            onClick(item.value);
                        }}
                        key={key}
                    >
                        {item.item}
                    </Container>
                );
            })}
        </Container>
    );
});

export const SliderInput = forwardRef((props: Props.Input.Slider, ref: LegacyRef<any>) => {
  const { onChange, defaultValue, args, markLabel, getAriaValueText } = props;
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Container
      state={value === args?.min ? "min" : undefined}
      cls={"SliderContainer"}
    >
      <Slider
        className={"Slider"}
        min={args?.min}
        max={args?.max}
        step={args?.step}
        marks={markLabel && args?.marks}
        getAriaValueText={getAriaValueText}
        value={value}
        onChange={(event, value, activeThumb) => {
          setValue(value as number);
        }}
        onChangeCommitted={(event, value) => onChange(value as number)}
      />
    </Container>
  );
});
export const ToggleInput = forwardRef((props: Props.Input.Toggle, ref) => {
  const { defaultChecked, onChange } = props;
  const [value, setValue] = useState(defaultChecked);
  useEffect(() => {
    setValue(defaultChecked);
  }, [defaultChecked]);

  return (
    <Switch
      checked={value}
      onChange={(event, checked) => {
        setValue(checked);
        onChange(checked);
      }}
      className={"Switch"}
    />
  );
});