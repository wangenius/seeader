import { THEME_CONSTANT } from "./theme";

export namespace Styles {
  export const chapterBar_sx: Style.SX = (theme: ThemeStandard) => ({
    paddingLeft: 2,
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    width: 250,
  });

  export const content_sx: Style.SX = (theme: ThemeStandard) => ({
    justifyContent: "left",
    height: "100%",
    width: "100%",
    overflowY: "scroll",
    transition: "all 300ms ease",
    scrollBehavior: "smooth",
    scrollbarWidth: "8px",
    position: "absolute",
    right: 0,
    top: 0,
  });

  export const chapterBarTitle_sx = {
    lineHeight: "60px",
    maxWidth: "60%",
    height: 60,
    pl: 2,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "1.4rem",
  };

  export const contentParagraph_sx: Style.SX = {
    transition: "all 300ms ease",
    userSelect: "text",
    textIndent: "2rem",

    letterSpacing: 0.4,
    cursor: THEME_CONSTANT.CURSORS.text,
    width: "100%",
    "::selection": {
      backgroundColor: "#fffaa6",
      padding: 1,
      color: "#000000",
    },
  };

  export const contentBody_sx = {
    m: 2,
    maxWidth: 900,
    width: "100%",
    textAlign: "justify",
    px: 3,
    fontSize: "1.62rem",
  };
}
