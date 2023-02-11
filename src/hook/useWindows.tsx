import { useEffectOnce } from "react-use";
import { useState } from "react";
import { useEvent } from "./useEvent";

export function useWindows() {
  const docs = document.documentElement;
  const [size, setSize] = useState({
    w_width: docs.clientWidth,
    w_height: docs.clientHeight,
  });

  const onResize = useEvent(() => {
    setSize({
      w_width: docs.clientWidth,
      w_height: docs.clientHeight,
    });
  });

  useEffectOnce(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return {
    /** @Description client width*/
    w_width: size.w_width,
    /** @Description client height */
    w_height: size.w_height,
    /** @Description client size is or isn't > 900 */
    size: size.w_width > 900,
  };
}