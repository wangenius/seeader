import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Container } from "../component/Container";
import { useTheme } from "./ThemeProvider";
import { Spring } from "../component/Spring";
import { voidFn } from "../method/general";
import { ElementProps } from "elementProperty";

const LoadingContext = React.createContext({
  ModalState: false,
  loading: (fn: () => any) => {},
  closeLoading: () => {},
});

const LoadingProvider = ({ children }: ElementProps) => {
  const [ModalState, setModalState] = useState(false);
  const [modalIn, setModalIn] = useState(false);
  const { theme } = useTheme();
  const [flowFn, setFlowFn] = useState<Function>(() => {});
  function loading(fn: () => any) {
    document.body.style.overflow = "hidden";
    setFlowFn(() => fn);
    setModalState(true);
    setModalIn(true);
  }

  useEffect(() => {
    if (ModalState)
      setTimeout(async () => {
        await flowFn();
        closeLoading();
      }, 200);
  }, [flowFn, ModalState]);

  function closeLoading() {
    setTimeout(() => setModalIn(false), 100);
  }

  return (
    <LoadingContext.Provider value={{ loading, closeLoading, ModalState }}>
      {ModalState && (
        <Spring
          cssString={`
          position: absolute;
          width: 100vw;
          z-index: 900;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
      `}
          onEnter={voidFn}
          onExit={() => {
            setModalState(false);
            document.body.style.overflow = "auto";
          }}
          from={{
            opacity: 0,
          }}
          to={{ opacity: modalIn ? 1 : 0 }}
          open={modalIn}
        >
          <Container
            flexLayout
            verticalCenter
            horizonCenter
            full
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              height: "100vh",
              backgroundColor: theme.palette.modal.default,
              color: theme.palette.container.default,
            }}
          >
            {"正在打开"}
          </Container>
        </Spring>
      )}
      <Container
        sx={{
          width: "100%",
          height: "100%",
          filter: ModalState ? "blur(2px)" : "none",
        }}
      >
        {children as ReactNode}
      </Container>
    </LoadingContext.Provider>
  );
};

const useLoading = () => useContext(LoadingContext);

export { LoadingProvider, useLoading };
