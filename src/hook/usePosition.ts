import { useWindows } from "./useWindows";
import { useState } from "react";

export function usePosition() {
  const { win_height, win_width } = useWindows();

  const [position, setPosition] = useState<{ top?: number; left?: number }>();

  return position;
}
