import { ReactNode, useMemo, useState } from "react";
import { useEvent } from "@/hook/useEvent";
import { Localizer } from "./Localizer";
import ClickAwayListener from "react-click-away-listener";

/** @Description cascade */
export const useCascade = () => {
  /** @Description content */
  const [content, setContent] = useState<ReactNode>(null);
  /** @Description state */
  const [cascadeOpen, setCascadeOpen] = useState<boolean>(false);
  /** @Description change content */
  const cascade = (content: ReactNode, configs?: Props.Localizer) => {
    setContent(<Localizer {...configs}>{content}</Localizer>);
    openCascade();
  };

  const closeCascade = useEvent<Fn>(() => {
    setCascadeOpen(false);
  });

  const openCascade = useEvent<Fn>(() => {
    setCascadeOpen(true);
  });

  const onClickAway = useEvent<Fn>(() => {
    closeCascade();
  });

  const container = useMemo(
    () =>
      cascadeOpen && (
        <ClickAwayListener onClickAway={onClickAway}>
          <>{content}</>
        </ClickAwayListener>
      ),
    [content, cascadeOpen]
  );

  return {
    container,
    cascade,
    closeCascade,
  };
};