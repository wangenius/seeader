import React, {
  EventHandler,
  FormEventHandler,
  forwardRef,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { Container } from "./Container";
import { ElementProps, TextInputProps } from "elementProperty";
import { useTheme } from "../context/ThemeProvider";
import { sxParser } from "../method/parser";
import { IconButton } from "./Button";
import {
  MdArrowRight,
  MdOutlineArrowRightAlt,
  MdSkipNext,
} from "react-icons/md";
import { voidFn } from "../method/general";
import { Slider, Switch } from "@mui/material";
import { useEffectOnce } from "react-use";

export const Input = forwardRef((props, ref) => {
  return (
    <Container>
      <input />
    </Container>
  );
});

export const TextInput = forwardRef(
  (props: TextInputProps, ref: LegacyRef<any>) => {
    const {
      onChange,
      placeholder,
      sx,
      init,
      button = false,
      onClick = voidFn,
      ...other
    } = props;
    const { theme } = useTheme();
    const Ref = useRef<HTMLInputElement>();

    return (
      <Container
        full
        sx={sxParser(
          [
            {
              position: "relative",
              transition: "all 300ms ease",
              maxWidth: 600,
              height: 120,
              p: "15px",
              borderRadius: 4,
              backgroundColor: theme.input.backgroundColor?.default,
              ":hover": {
                backgroundColor: theme.input.backgroundColor?.hover,
              },
              ":focus-within": {
                backgroundColor: theme.input.backgroundColor?.focus,
              },
            },
          ],
          sx
        )}
      >
        <IconButton
          open={button}
          onClick={() => onClick(Ref.current?.value)}
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: "#ffda00",
            borderRadius: 4,
            svg: {
              fill: "#3f3f3f",
            },
            ":hover": {
              backgroundColor: "#ffcb5a",
              svg: {
                fill: "#3f3f3f",
              },
            },
          }}
          size={30}
          icon={<MdOutlineArrowRightAlt />}
        />
        <textarea
          style={{
            flex: 1,
            border: "none",
            fontSize: "1rem",
            height: "100%",
            lineHeight: "20px",
            width: "100%",
            resize: "none",
            backgroundColor: "transparent",
            color: theme.input.color?.default,
            fontFamily: theme.default.font,
            letterSpacing: 0.2,
            outline: "none",
          }}
          rows={8}
          cols={4}
          defaultValue={init}
          {...other}
          placeholder={placeholder}
          ref={button ? Ref : ref}
        />
      </Container>
    );
  }
);

interface SliderArgs {
  max?: number;
  min?: number;
  step?: number;
  marks?: { value: number; label: string }[];
}

interface SliderProps {
  args?: SliderArgs;
  value?: number;
  defaultValue?: number;
  markLabel?: boolean;
  onChange: (value: number) => void;
  getAriaValueText?(value: number, index: number): string;
}

export const Range = forwardRef((props: SliderProps, ref: LegacyRef<any>) => {
  const { theme } = useTheme();
  const { onChange, defaultValue, args, markLabel, getAriaValueText } = props;
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const style: Style.SXs = [
    {
      color:
        theme.name === "dark" ? "#fff" : theme.button.backgroundColor?.hover,
      "& .MuiSlider-track": {
        minWidth: 20,
        px: -20,
        mx: -1.1,
        height: 20,
        borderRadius: 4,
        borderBottomRightRadius: value === args?.min ? 16 : 0,
        borderTopRightRadius: value === args?.min ? 16 : 0,
        "::after": {
          content: "''",
          borderRadius: 4,
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
          position: "absolute",
          height: 22,
          width: value === args?.min ? 0 : 22,
          left: "100%",
          top: -1,
          backgroundColor: theme.button.backgroundColor?.hover,
        },
      },
      "& .MuiSlider-mark": {
        width: 6,
        height: 6,
        borderRadius: 1,
      },
      "& .MuiSlider-markLabel": {
        display: markLabel ? "block" : "none",
        fontSize: "0.8rem",
        color: "#808080",
      },
      "& .MuiSlider-markLabelActive": {},
      "& .MuiSlider-thumb": {
        pl: -2,
        opacity: 0,

        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        "&:hover, &.Mui-focusVisible": {
          boxShadow: "none",
        },
      },
      "& .MuiSlider-rail": {
        height: 22,
        width: "calc(100% + 15px)",
        backgroundColor: "#dedede",
      },
    },
  ];
  return (
    <Container
      flexLayout
      verticalCenter
      sx={{
        width: "100%",
        maxWidth: 220,
        minWidth: 160,
        height: 60,
        p: 2,
        boxSizing: "border-box",
      }}
    >
      <Slider
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
        sx={style}
      />
    </Container>
  );
});
interface ToggleProps {
  defaultChecked?: boolean;
  onChange: (checked: boolean) => void;
}
export const Toggle = forwardRef((props: ToggleProps, ref) => {
  const { theme } = useTheme();
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
      sx={{
        width: 42,
        height: 26,
        padding: 0,
        "& .MuiSwitch-switchBase": {
          padding: 0,
          margin: 0.2,
          transitionDuration: "300ms",
          "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor: theme.icon.backgroundColor?.default,
              opacity: 1,
              border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              opacity: 0.5,
            },
          },
          "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: theme.icon.backgroundColor?.default,
            border: "6px solid #fff",
          },
          "&.Mui-disabled .MuiSwitch-thumb": {
            color: theme.button.color?.default,
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.name === "default" ? 0.7 : 0.3,
          },
        },
        "& .MuiSwitch-thumb": {
          boxSizing: "border-box",
          width: 22,
          height: 22,
        },
        "& .MuiSwitch-track": {
          borderRadius: 26 / 2,
          backgroundColor: theme.name === "default" ? "#E9E9EA" : "#39393D",
          opacity: 1,
        },
      }}
    />
  );
});
