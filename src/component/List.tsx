import * as React from "react";
import { forwardRef, useEffect, useState } from "react";
import { Button, ButtonProperty } from "./Button";
import { Container } from "./Container";
import { ElementProps, voidFn } from "../interface";
import { scrollbarSx, sxAssigner } from "../style/sx";
import { useTheme } from "../context/ThemeProvider";
import { useEssay } from "../hook/useEssay";

export interface ListButtonValue extends ButtonProperty {
  index: number;
  isActive?: boolean;
}

export const ListButton = forwardRef((props: ListButtonValue, ref) => {
  const { theme } = useTheme();
  const { isActive, sx, ...other } = props;
  return (
    <Button
      {...other}
      sx={sxAssigner(
        [
          {
            width: "calc(100% - 10px)",
            mx: "auto",
            height: 40,
            borderRadius: 3,
            my: 0.6,
            justifyContent: "left",
          },
          isActive
            ? {
                backgroundColor: theme.palette.button.hover,
                color: theme.palette.primary.reverse,
              }
            : {},
        ],
        sx
      )}
      ref={ref}
    />
  );
});

interface ListProps extends ElementProps {
  listItems?: ListButtonValue[];
  index?: number;
}

export const ListContainer = forwardRef((props: ListProps, ref) => {
  const { index = 0 } = props;
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState<number>(index);

  useEffect(() => {
    setActiveIndex(0);
  }, [props.listItems]);

  useEffect(() => {
    setActiveIndex(index);
  }, [props.index]);

  return (
    <Container
      sx={sxAssigner(
        [
          {
            maxHeight: "100%",
            width: "100%",
            overflowY: "scroll",
            transition: "all 300ms ease",
            scrollBehavior: "smooth",
            pb: 2,
          },
        ],
        scrollbarSx
      )}
    >
      {props.listItems?.map((item) => {
        const { index, label, onClick = voidFn, ...other } = item;
        return (
          <ListButton
            index={item.index}
            key={item.index}
            label={item.label}
            onClick={() => {
              setActiveIndex(item.index);
              onClick();
            }}
            isActive={activeIndex === item.index}
            {...other}
          ></ListButton>
        );
      })}
    </Container>
  );
});
