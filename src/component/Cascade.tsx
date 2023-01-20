import { ReactNode, useMemo, useState } from "react";
import { useEvent } from "../hook/useEvent";
import { Fn } from "../@types/context";
import { ClickAwayListener } from "@mui/material";
import { Localizer } from "./Localizer";
import { LocalizerProps } from "../@types/localizer";

/** @Description cascade */
const useCascade = () => {
  /** @Description content */
  const [content, setContent] = useState<ReactNode>(null);
  /** @Description state */
  const [cascadeOpen, setCascadeOpen] = useState<boolean>(false);
  /** @Description change content */
  const cascade = (content: ReactNode, configs?: LocalizerProps) => {
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

export { useCascade };
