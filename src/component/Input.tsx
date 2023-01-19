import React, {
  forwardRef,
  LegacyRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Container } from "./Container";
import { TextInputProps } from "elementProperty";
import { IconButton } from "./Button";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { voidFn } from "../method/general";
import { Slider, Switch } from "@mui/material";
import { SliderProps, ToggleProps } from "../@types/slider";

export const TextInput = memo(
  forwardRef((props: TextInputProps, ref: LegacyRef<any>) => {
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

export const SliderInput = forwardRef((props: SliderProps, ref: LegacyRef<any>) => {
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
        valueLabelDisplay="on"
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
export const ToggleInput = forwardRef((props: ToggleProps, ref) => {
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
