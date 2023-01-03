import * as React from "react";
import { forwardRef } from "react";
import { Button } from "./Button";
import { Container } from "./Container";
import { useTheme } from "../context/ThemeProvider";
import { voidFn } from "../method/general";
import { ElementProps, ListButtonValue } from "elementProperty";
import { scrollbarSx } from "../constant/theme";
import { sxParser } from "../method/parser";

export const ListButton = forwardRef((props: ListButtonValue, ref) => {
  const { theme } = useTheme();
  const { isActive, sx, ...other } = props;
  return (
    <Button
      {...other}
      sx={sxParser(
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
  listItems: ListButtonValue[];
  activeIndex: number;
}

export const ListContainer = forwardRef((props: ListProps, ref) => {
  const { activeIndex = 0 } = props;
  const { theme } = useTheme();
  return (
    <Container
      sx={sxParser(
        [
          {
            overflowY: "scroll",
            transition: "all 300ms ease",
            scrollBehavior: "smooth",
            pb: 2,
          },
          scrollbarSx,
        ],
        props.sx
      )}
      ref={ref}
    >
      {props.listItems.map((item, key) => {
        const { index, label, onClick = voidFn, ...other } = item;
        return (
          <ListButton
            index={item.index}
            key={key}
            label={item.label}
            onClick={() => {
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
