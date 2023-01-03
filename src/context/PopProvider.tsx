import React, { ReactNode, useContext, useRef, useState } from "react";
import { Container } from "../component/Container";
import { useWindows } from "../hook/useWindows";
import { ClickAwayListener } from "@mui/base";
import { CLASSNAMES } from "../constant/theme";
import { voidFn } from "../method/general";
import { ElementProps, popProps } from "elementProperty";

const PopContext = React.createContext({
  rootPop: (anchor: HTMLElement, content: ReactNode) => {},
  rootOpen: voidFn,
  rootClose: voidFn,
});

const PopProvider = ({ children }: ElementProps) => {
  const { x } = useWindows();
  const popRef = useRef();
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode>();

  function rootPop(anchor: HTMLElement, content: ReactNode) {
    setContent(
      <Container ref={popRef} sx={{ overflow: "visible" }}>
        <ClickAwayListener
          disableReactTree
          onClickAway={function (event: MouseEvent | TouchEvent): void {
            let g = event.target as HTMLElement;
            if (!g.classList.contains(CLASSNAMES.MENU_ANCHOR)) rootClose();
          }}
        >
          <Container
            sx={{
              position: "absolute",
              zIndex: 10000,
              overflow: "visible",
              top: anchor?.getBoundingClientRect().height,
              left: anchor?.getBoundingClientRect().x,
            }}
          >
            {content}
          </Container>
        </ClickAwayListener>
      </Container>
    );
  }

  function rootOpen() {
    setOpen(true);
  }

  function rootClose() {
    setOpen(false);
  }
  return (
    <PopContext.Provider value={{ rootPop, rootOpen, rootClose }}>
      {open && content}
      {children as ReactNode}
    </PopContext.Provider>
  );
};

function usePop(props?: popProps) {
  const { rootPop, rootClose, rootOpen } = useContext(PopContext);
  const [popOpen, setPopOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | undefined>("");

  function stemPop(content: ReactNode): void {
    setContent(content);
  }

  function stemClose(): void {
    setPopOpen(false);
  }
  function stemOpen(): void {
    setPopOpen(true);
  }

  const stem = popOpen && (
    <ClickAwayListener
      onClickAway={function (event: MouseEvent | TouchEvent): void {
        if ((event.target as HTMLElement) !== props?.anchor) stemClose();
      }}
    >
      <Container
        sx={{
          position: "absolute",
          zIndex: 10000,
          overflow: "visible",
          top: 0,
          left: props?.anchor.getBoundingClientRect().width,
        }}
      >
        {content}
      </Container>
    </ClickAwayListener>
  );

  return {
    stem,
    stemPop,
    stemOpen,
    stemClose,
    rootPop,
    rootOpen,
    rootClose,
  };
}

export { PopProvider, PopContext, usePop };
