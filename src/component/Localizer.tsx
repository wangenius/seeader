import * as React from "react";
import {memo, useCallback, useLayoutEffect, useRef, useState} from "react";
import {Container} from "./Container";
import {useWindows} from "../hook/useWindows";
import {LocalizerProps} from "../@types/localizer";

/** @Description 位置定位器 对于视窗而言 */
export const Localizer = memo(
  ({
    children,
    anchor,
    event,
    base,
    position = "relative",
  }: LocalizerProps) => {
    const [left, setLeft] = useState<number>();
    const [top, setTop] = useState<number>();
    const ref = useRef<HTMLElement>();
    const { win_height, win_width } = useWindows();
    useLayoutEffect(() => {
      /* 利用点击事件设置位置*/
      eventPosition(event as React.MouseEvent);
      /* 利用锚点元素设置位置*/
      anchorPosition(anchor as HTMLElement);
    }, [anchor, event]);

    /** @Description 事件定位方法 */
    const eventPosition = useCallback(
      (event: React.MouseEvent) => {
        if (!event) return;
        /*event 位置*/
        const x = event.clientX as number;
        const y = event.clientY as number;
        const width = ref.current?.clientWidth as number;
        const height = ref.current?.clientHeight as number;
        setTop(y);
        setLeft(x);
        if (x + width > win_width) setLeft(x - width);
        if (y + height > win_height) setTop(y - height);
      },
      [event]
    );

    /** @Description 锚点定位方法 */
    const anchorPosition = useCallback(
      (anchor: HTMLElement) => {
        if (!anchor) return;
        const width = ref.current?.clientWidth as number;
        const height = ref.current?.clientHeight as number;
        /*锚元素宽度*/
        const anchorWidth = anchor.clientWidth;
        const x =
          position === "absolute"
            ? anchor.getBoundingClientRect().x
            : anchor.clientWidth;

        const y =
          position === "absolute" && base === "bottom"
            ? anchor.getBoundingClientRect().y + anchor.clientHeight
            : 0;
        setLeft(x);
        setTop(y);
        if (anchor.getBoundingClientRect().x + anchorWidth + width > win_width)
          setLeft(-width);
        if (anchor.getBoundingClientRect().y + height > win_height)
          setTop(win_height - height);
      },
      [anchor]
    );

    return (
      <Container
        ref={ref}
        sx={{ overflow: "visible", position: "absolute", top: top, left: left }}
        children={children}
      />
    );
  }
);
