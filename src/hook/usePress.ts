import { useCallback, useRef, useState } from "react";
import { fn } from "@/method";

interface Press {
  onPress?(...props: any): any;

  onClick?(...props: any): any;

  delay?: number;
}

export const usePress = ({
  onPress = fn,
  delay = 500,
  onClick = fn,
}: Press) => {
  const [longPress, setLongPress] = useState(false);
  const timeout: any = useRef();

  const onMouseDown = useCallback<Fn>(
    (event) => {
      event.stopPropagation();
      timeout.current = setTimeout(() => {
        onPress(event);
        setLongPress(true);
      }, delay);
    },
    [onPress, delay]
  );

  const onMouseUp = useCallback<Fn>(
    (event: MouseEvent) => {
      event.stopPropagation();
      timeout.current && clearTimeout(timeout.current);
      event.button === 0 && !longPress && onClick();
      setLongPress(false);
    },
    [longPress]
  );

  return {
    onMouseDown,
    onMouseUp,
  };
};
