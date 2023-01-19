import { useEffectOnce } from "react-use";
import { useCallback, useState } from "react";

export function useWindows() {
  const [size, setSize] = useState({
    win_width: document.documentElement.clientWidth,
    win_height: document.documentElement.clientHeight,
  });
  const onResize = useCallback(() => {
    setSize({
      win_width: document.documentElement.clientWidth,
      win_height: document.documentElement.clientHeight,
    });
  }, []);
  useEffectOnce(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return {
    win_width: size.win_width,
    win_height: size.win_height,
    size: size.win_width > 900,
  };
}
