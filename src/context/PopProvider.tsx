import React, { ReactNode, useContext, useRef, useState } from "react";
import { Container } from "../component/Container";
import { useWindows } from "../hook/useWindows";
import { CLASSNAMES } from "../@constant/theme";
import { voidFn } from "../method/general";
import { ElementProps, popProps } from "elementProperty";
import ClickAwayListener from "../component/ClickAwayListener";
import { useModal } from "./ModalProvider";

interface rootProps {
  anchor: {
    node?: HTMLElement;
    position?: {
      x: number;
      y: number;
    };
  };
  content: ReactNode;
}

const PopContext = React.createContext({
  setRoot: (prop: rootProps, callAway?: () => any) => voidFn(prop, callAway),
  rootOpen: voidFn,
  rootClose: voidFn,
});

const PopProvider = ({ children }: ElementProps) => {
  const { win_width } = useWindows();
  const popRef = useRef();
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode>();

  function setRoot(prop: rootProps, callAway?: () => any) {
    setContent(
      <Container ref={popRef} sx={{ overflow: "visible", zIndex: 1000 }}>
        <ClickAwayListener
          disableReactTree
          onClickAway={function (event: MouseEvent | TouchEvent): void {
            let g = event.target as HTMLElement;
            if (!g.classList.contains(CLASSNAMES.POP_BUTTON)) rootClose();
            if (callAway) {
              callAway();
            }
          }}
        >
          <Container
            sx={{
              position: "absolute",
              zIndex: 10000,
              overflow: "visible",
              top:
                prop.anchor.position?.y ||
                (prop.anchor.node?.getBoundingClientRect().y || 0) +
                  (prop.anchor.node?.getBoundingClientRect().height || 0),
              left:
                prop.anchor.position?.x ||
                prop.anchor.node?.getBoundingClientRect().x,
            }}
          >
            {prop.content}
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
    <PopContext.Provider value={{ setRoot, rootOpen, rootClose }}>
      {open && content}
      {children as ReactNode}
    </PopContext.Provider>
  );
};

/** @Description 弹出界面 */
function usePop(props?: popProps) {
  const { setRoot, rootClose, rootOpen } = useContext(PopContext);
  const [popOpen, setPopOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | undefined>("");
  function setStem(content: ReactNode): void {
    setContent(content);
  }
  function stemClose(): void {
    setPopOpen(false);
  }
  function stemOpen(): void {
    setPopOpen(true);
  }
  function onClickAway(event: MouseEvent | TouchEvent): void {
    if ((event.target as HTMLElement) !== props?.anchor) stemClose();
  }

  const stem = popOpen && (
    <ClickAwayListener onClickAway={onClickAway}>
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
    setStem,
    stemOpen,
    stemClose,
    setRoot,
    rootOpen,
    rootClose,
  };
}

export { PopProvider, PopContext, usePop };
