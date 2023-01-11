export const CLASSNAMES = {
  MENU_ANCHOR: "MENU_ANCHOR",
  MENU_SUB_ANCHOR: "MENU_SUB_ANCHOR",
  MENU_ITEM: "MENU_ITEM",
  BUTTON: "BUTTON",
  POP_BUTTON: "POP_BUTTON",
};

export namespace THEME_CONSTANT {
  export const breakpoints = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 };
  export const Z_INDEX = {
    BODY: 0,
    HEADER: 300,
    MODAL: 600,
    FocusItem: 700,
    POP: 800,
    SNACKBAR: 1000,
  };
  export const HEIGHT_VALUE = {
    HEADER: 34,
  };
  export const CURSORS = {
    pointer: "url(hand.png),pointer",
    arrow: "url(default.png),pointer",
    text: "url(text.png) 15 20,pointer",
  };
  export const FontSize = {
    min: 6,
    max: 14,
    step: 2,
    marks: [
      {
        value: 6,
        label: "tiny",
      },
      {
        value: 8,
        label: "small",
      },
      {
        value: 10,
        label: "medium",
      },
      {
        value: 12,
        label: "big",
      },
      {
        value: 14,
        label: "large",
      },
    ],
  };
  export const LineHeight = {
    min: 14,
    max: 22,
    step: 2,
    marks: [
      {
        value: 14,
        label: "tiny",
      },
      {
        value: 16,
        label: "small",
      },
      {
        value: 18,
        label: "medium",
      },
      {
        value: 20,
        label: "big",
      },
      {
        value: 22,
        label: "large",
      },
    ],
  };
  export const ParagraphSpacing = {
    min: 0.2,
    max: 2,
    step: 0.6,
    marks: [
      {
        value: 0.2,
        label: "small",
      },
      {
        value: 0.8,
        label: "medium",
      },
      {
        value: 1.4,
        label: "big",
      },

      {
        value: 2,
        label: "large",
      },
    ],
  };
}

export namespace SX {
  export const overFlowY: Style.SX = {
    overflowY: "scroll",
    scrollBehavior: "smooth",
  };
  export const scrollbarSx: Style.SX = {
    "::-webkit-scrollbar": {
      display: "block",
      width: "16px",
      backgroundColor: "transparent",
      backgroundClip: "content-box",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(140,140,140,0.5)",
      ":hover": {
        backgroundColor: "rgba(140,140,140,0.8)",
      },
      backgroundClip: "content-box",
      borderRadius: "12px",
      height: "60px",
      border: "solid 6px transparent",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  };
}
