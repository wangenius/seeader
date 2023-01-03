export const DefaultTheme: ThemeStandard = {
  mode: "default",
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
  typography: {
    fontFamily: `"Noto_Medium", "HarmonyOS Sans SC", "HarmonyOS Sans",
          "sans-serif"`,
  },
  palette: {
    background: {
      main: "#ffffff",
      reverse: "#000000",
    },
    primary: {
      main: "#f1a809",
      reverse: "#0e50e8",
    },
    darkPrimary: { main: "#ffd600", reverse: "#0e50e8" },

    container: {
      default: "#ffffff",
      hover: "rgba(220,220,220,0.16)",
      focus: "rgb(239,239,239)",
    },
    text: {
      body: "#49494f",
      title: "rgb(37,37,45)",
      subTitle: "#000000",
      tag: "#989898",
    },
    buttonChar: {
      default: "#7a7a80",
      hover: "rgb(37,37,45)",
      focus: "#000000",
    },
    link: {
      default: "#515156",
      hover: "rgb(56,56,56)",
      focus: "#000000",
    },
    border: {
      default: "1px solid rgba(255, 255, 255, 0.18)",
      hover: "#000000",
      focus: "#000000",
    },
    shadows: {
      default: "#000000",
      hover: "#000000",
      focus: "#000000",
    },
    snack: {
      default: "#000000",
      hover: "#000000",
      focus: "#000000",
    },
    logo: {
      default: "rgba(44,51,89,0.54)",
      hover: "rgba(56,57,58,0.73)",
      focus: "#263238",
    },
    modal: {
      default: "rgba(0,0,0,0.4)",
      hover: "#000000",
      focus: "#000000",
    },
    input: {
      default: "rgba(236,239,241,0.66)",
      hover: "rgba(236,238,241,0.92)",
      focus: "rgba(236,238,241,1)",
    },
    button: {
      default: "rgba(255,255,255,0)",
      hover: "rgba(136,138,141,0.12)",
      focus: "rgb(136,138,141,0.8)",
    },
  },
  shadows: {
    img: {
      default: " rgba(0, 0, 0, 0.1) 0px 10px 50px",
      hover: "",
      focus: "",
    },
    box: {
      default:
        " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      hover:
        "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
      focus:
        "rgba(17, 17,26, 0.15) 0px 10px 20px, rgba(17, 17, 26, 0.05) 0px 5px 10px",
    },
    pop: {
      default: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
      hover: "",
      focus: "",
    },
  },
  transitions: {
    default: "all 300ms ease",
  },
};

export const DarkTheme: ThemePrototype = {
  mode: "dark",
  palette: {
    primary: {
      main: "#f8ba72",
      reverse: "#0e50e8",
    },
    darkPrimary: { main: "#f1a809", reverse: "#0e50e8" },
    background: {
      main: "#2e3033",
      reverse: "#8d8d8d",
    },
    link: {
      default: "#9e9ea4",
      hover: "rgb(196,196,196)",
      focus: "#000000",
    },
    buttonChar: {
      default: "#9a9a9d",
      hover: "#c4c4c4",
      focus: "#37373d",
    },
    container: {
      default: "rgba(73,70,70,0.55)",
      hover: "#46484b",
      focus: "#afafaf",
    },
    text: {
      body: "#c9c9cc",
      title: "rgb(37,37,45)",
      subTitle: "#818181",
      tag: "#646464",
    },
    button: {
      default: "rgb(239,240,241)",
      hover: "rgb(71,73,79)",
      focus: "rgb(226,227,229)",
    },
    border: {
      default: "#5b5b5b",
      hover: "#000000",
      focus: "#000000",
    },
    shadows: {
      default: "#000000",
      hover: "#000000",
      focus: "#000000",
    },
    snack: {
      default: "#000000",
      hover: "#000000",
      focus: "#000000",
    },
    logo: {
      default: "#7a7a80",
      hover: "#c4c4c4",
      focus: "#000000",
    },
    modal: {
      default: "rgba(0,0,0,0.4)",
      hover: "#000000",
      focus: "#000000",
    },
    input: {
      default: "#34363a",
      hover: "#3e4146",
      focus: "#3e4146",
    },
  },
  shadows: {
    img: {
      default: " rgba(0, 0, 0, 0.1) 0px 10px 50px",
      hover: "",
      focus: "",
    },
    box: {
      default:
        " rgba(200, 200, 200, 0.05) 0px 6px 24px 0px, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px",
      hover:
        "rgba(0, 0,0, 0.05) 0px 4px 16px, rgba(0, 0, 0, 0.05) 0px 8px 32px",
      focus:
        "rgba(17, 17,26, 0.15) 0px 10px 20px, rgba(17, 17, 26, 0.05) 0px 5px 10px",
    },
    pop: {
      default:
        " rgba(200, 200, 200, 0.08) 0px 6px 24px, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px",
      hover: "",
      focus: "",
    },
  },
  var: {
    frostedBackgroundColor: "rgba(46,47,50,0.8)",
    frostedBorder: "1px solid rgba(255, 255, 255, 0.18)",
    frostedShadow: "rgba(0, 0, 0, 0.3) 0px 6px 15px 0px",
    frostedBlur: "blur(6px)",
    dockerShadow: " 0px 10px 30px -20px rgba(0,0,0,0.5) ",
  },
};
