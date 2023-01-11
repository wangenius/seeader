import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ElementProps } from "elementProperty";
import { useTheme } from "./ThemeProvider";
import { Spring } from "../component/Spring";
import { Container } from "../component/Container";
import { useSpring } from "@react-spring/web";
import { voidFn } from "../method/general";
import ClickAwayListener from "../component/ClickAwayListener";
import { THEME_CONSTANT } from "../@constant/theme";
import Z_INDEX = THEME_CONSTANT.Z_INDEX;

const ModalContext = React.createContext({
  closeModal: () => {},
  modal: (content: ReactNode, config?: { blur?: boolean }) =>
    voidFn(content, config),
});

const ModalProvider = ({ children }: ElementProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { theme } = useTheme();
  const [content, setContent] = useState<ReactNode>();

  const modal = (content: ReactNode, config?: { blur?: boolean }) => {
    setContent(content);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

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
      {modalOpen && (
        <Container
          sx={{ position: "absolute", width: "100%", height: "100vh" }}
          verticalCenter
          horizonCenter
          flexLayout
        >
          <ClickAwayListener onClickAway={closeModal}>
            <Container
              sx={{
                zIndex: Z_INDEX.POP,
                overflow: "visible",
                ".": {
                  boxShadow: theme.docker.shadow?.default,
                },
              }}
            >
              {content}
            </Container>
          </ClickAwayListener>
          <Spring
            spring={spring}
            style={`
               position: absolute;
              width: 100vw;
              height: 100vh;
              z-index:${Z_INDEX.MODAL};
              background-color:${theme.modal.backgroundColor?.default};
              display: flex;
              align-items: center;
              justify-content: center;
              backdrop-filter:${"blur(5px)"};
                        `}
          />
        </Container>
      )}

      {children as ReactNode}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalContext, ModalProvider, useModal };
