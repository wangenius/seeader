import React, {memo, ReactNode, useCallback, useContext, useMemo, useState,} from "react";
import {Container} from "../component/Container";
import {ElementProps} from "elementProperty";

import {Fn} from "../@types/context";
import {ClickAwayListener} from "@mui/material";

/** @Description PopContainer 方法 */
interface PopContextProps {
  pop: PopType;
  closePop: Fn;
  openPop: Fn;
}

type PopType = (content: JSX.Element) => any;

// @ts-ignore
const PopContext = React.createContext<PopContextProps>({});

const PopContainer = memo(({ children }: ElementProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [popBody, setPopBody] = useState<JSX.Element>();

  /** @Description 打开pop */
  const pop = useCallback<PopType>((content) => {
    setPopBody(content);
  }, []);

  const openPop = useCallback<Fn>(() => {
    setOpen(true);
  }, []);

  /** @Description 关闭pop */
  const closePop = useCallback<Fn>(() => {
    setOpen(false);
    setPopBody(undefined);
  }, []);

  return (
    <PopContext.Provider value={{ pop, closePop, openPop }}>
      <Container open={open}>
        <ClickAwayListener
          disableReactTree
          onClickAway={(event: MouseEvent | TouchEvent) => {
            let g = event.target as HTMLElement;
            if (!g.classList.contains("MenuButton")) closePop();
          }}
        >
          <Container cls={"Pop"}>{popBody}</Container>
        </ClickAwayListener>
      </Container>
      {children as ReactNode}
    </PopContext.Provider>
  );
});

/** @Description 弹出界面 */
const usePop = () => {
  const context = useContext(PopContext);
  const [content, setContent] = useState<ReactNode>();
  const [cascadeOpen, setCascadeOpen] = useState<boolean>(false);
  const cascade = useCallback((con: JSX.Element) => {
    setContent(con);
  }, []);

  const closeCascade = useCallback<Fn>(() => {
    setCascadeOpen(false);
  }, []);

  const openCascade = useCallback<Fn>(() => {
    setCascadeOpen(true);
  }, []);

  const onClickAway = useCallback<(event: MouseEvent | TouchEvent) => void>(
    (event: MouseEvent | TouchEvent): void => {},
    []
  );

  const Cascade = useMemo(
    () =>
      cascadeOpen && (
        <ClickAwayListener onClickAway={onClickAway}>
          <> {content}</>
        </ClickAwayListener>
      ),
    [content, cascadeOpen]
  );

  return Object.assign({}, context, {
    cascade,
    Cascade,
    closeCascade,
    openCascade,
  });
};
export { PopContainer, PopContext, usePop };
