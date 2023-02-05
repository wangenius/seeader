import * as React from "react";
import {memo, useCallback, useLayoutEffect, useRef, useState} from "react";
import {Container} from "./Container";
import {useWindows} from "../hook/useWindows";


/** @Description 位置定位器 对于视窗而言 */
export const Localizer = memo(
  ({
    children,
    anchor,
    event,
    base,
    position = "relative",
  }: Props.Localizer) => {
    const [left, setLeft] = useState<number>();
    const [top, setTop] = useState<number>();
    const ref = useRef<HTMLElement>();
    const { w_height, w_width } = useWindows();
    useLayoutEffect(() => {
        if (!event && !anchor) return defaultPosition();

      /* 利用点击事件设置位置*/
      eventPosition(event as React.MouseEvent);
      /* 利用锚点元素设置位置*/
      anchorPosition(anchor as HTMLElement);
    }, [anchor, event]);

    const defaultPosition = useCallback(()=>{
        const width = ref.current?.clientWidth as number;
        const height = ref.current?.clientHeight as number;
       setTop((w_height  - height )/ 2)
       setLeft((w_width  - width )/ 2)
    },[])

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
        if (x + width > w_width) setLeft(x - width);
        if (y + height > w_height) setTop(y - height);
      },
      [event]
    );

    /** @Description 锚点定位方法 */
    const anchorPosition = useCallback(
      (anchor: HTMLElement) => {
        if (!anchor) return;
        /** @Description 目标元素尺寸 */
        const width = ref.current?.clientWidth as number;
        const height = ref.current?.clientHeight as number;

        /** @Description 锚元素坐标 */
        let ox = position === "absolute" ? anchor.getBoundingClientRect().x : 0;
        let oy = position === "absolute" ? anchor.getBoundingClientRect().y : 0;

        /** 锚元素宽度*/
        const aw = anchor.clientWidth;
        const ah = anchor.clientHeight;

        /** @Description 坐标 */
        let x = base === "bottom" ? ox : ox + aw;
        let y = base === "bottom" ? oy + ah : oy;

        /** @Description 判断位置 */
        if (anchor.getBoundingClientRect().x + aw + width > w_width)
          x = position === "absolute"? anchor.getBoundingClientRect().x + aw - width:-width;
        if (anchor.getBoundingClientRect().y + ah + height  > w_height) y = w_height - height;

        setLeft(x);
        setTop(y);
      },
      [anchor]
    );

    return (
      <Container
        ref={ref}
        sx={{ overflow: "visible", position: 'absolute', top: top, left: left }}
        children={children}
      />
    );
  }
);