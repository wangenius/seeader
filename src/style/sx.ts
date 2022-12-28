import { SxProps } from "@mui/system";

export type Style<Theme extends object = {}> = SxProps<Theme>;
export type Styles<Theme extends object = {}> = Style<Theme>[];

export function sxAssigner(sxList: Styles, newSx: any): [] {
  let result: [];
  if (newSx === undefined) return sxList as [];
  result = sxList.concat([...(Array.isArray(newSx) ? newSx : [newSx])]) as [];
  return result;
}

export const scrollbarSx: Style = {
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

export const AppSx: Style = {
  height: "100vh",
  width: "100vw",
  maxWidth: "100vw",
  maxHeight: "100vh",
  overflow: "hidden",
  position: "relative",
};

export const overFlowY: Style = {
  overflowY: "scroll",
  transition: "all 300ms ease",
  scrollBehavior: "smooth",
};
