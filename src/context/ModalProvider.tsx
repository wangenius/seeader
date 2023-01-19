import React, {ReactNode, useCallback, useContext, useState,} from "react";
import {ElementProps} from "elementProperty";
import {Spring} from "../component/Spring";
import {Container} from "../component/Container";
import {useSpring} from "@react-spring/web";
import {voidFn} from "../method/general";
import {Fn, ModalContextProps} from "../@types/context";
import {ClickAwayListener} from "@mui/material";

// @ts-ignore
const ModalContext = React.createContext<ModalContextProps>({});

const ModalProvider = ({ children }: ElementProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>();

  const modal = useCallback<Fn>((content: ReactNode) => {
    setContent(content);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback<Fn>((content: ReactNode) => {
    setModalOpen(false);
  }, []);

  const spring = useSpring({
    onStart: voidFn,
    onRest: voidFn,
    from: { opacity: 0 },
    to: { opacity: modalOpen ? 1 : 0 },
    config: {
      duration: 300,
    },
  });

  return (
    <ModalContext.Provider value={{ closeModal, modal }}>
      <Container open={modalOpen} cls={"Modal"}>
        <ClickAwayListener onClickAway={closeModal}>
          <Container cls={"ContentBox"}>{content}</Container>
        </ClickAwayListener>
        <Spring
          spring={spring}
          style={`
               position: absolute;
              width: 100vw;
              height: 100vh;
              z-index:600;
              background-color:$bc_button_hover;
              display: flex;
              align-items: center;
              justify-content: center;
              backdrop-filter:${"blur(5px)"};
                        `}
        />
      </Container>

      {children as ReactNode}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalContext, ModalProvider, useModal };
