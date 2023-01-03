const Z_INDEX = {
  BODY: 0,
  HEADER: 300,
  MODAL: 600,
  POP: 800,
  SNACKBAR: 1000,
};
const HEIGHT_VALUE = {
  HEADER: 34,
};
const CLASSNAMES = {
  MENU_ANCHOR: "MENU_ANCHOR",
  MENU_SUB_ANCHOR: "MENU_SUB_ANCHOR",
  MENU_ITEM: "MENU_ITEM",
  BUTTON: "BUTTON",
};

export { Z_INDEX, HEIGHT_VALUE, CLASSNAMES };
export const scrollbarSx: Style.SX = {
  "::-webkit-scrollbar": {
    display: "block",
    width: "18px",
    backgroundColor: "transparent",
    backgroundClip: "content-box",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#555",
    backgroundClip: "content-box",
    borderRadius: "12px",
    height: "60px",
    border: "solid 6px transparent",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: "#f5f5f5",
    backgroundClip: "content-box",

    borderRadius: "12px",
    // "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.3)",
    border: "solid 4px transparent",
  },
};
export const AppSx: Style.SX = {
  height: "100vh",
  width: "100vw",
  maxWidth: "100vw",
  maxHeight: "100vh",
  overflow: "hidden",
  position: "relative",
};
export const overFlowY: Style.SX = {
  overflowY: "scroll",
  transition: "all 300ms ease",
  scrollBehavior: "smooth",
};
