import { useTheme } from "../context/ThemeProvider";
import { useEffectOnce } from "react-use";
import { ReactNode, useCallback, useState } from "react";

export function useWindows() {
  const { theme } = useTheme();
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  }, []);
  useEffectOnce(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  });
  return {
    x: size.width,
    y: size.height,
    size: size.width > theme.breakpoints.md,
  };
}
