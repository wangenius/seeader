export const DefaultTheme: ThemeStandard = {
  name: "default",
  default: {
    font: `"Noto_Medium", "HarmonyOS Sans SC", "HarmonyOS Sans",
          "sans-serif"`,
    backgroundColor: { default: "#fff", hover: "#ddd", focus: "#aaa" },
    shadow: {
      default: "rgba(0, 0, 0, 0.54)" + "0px 0px 60px -20px",
    },
  },
  button: {
    backgroundColor: {
      default: "#fff",
      hover: "rgb(61,76,239)",
      focus: "#aaa",
    },
    color: {
      default: "rgb(124,122,122)",
      hover: "#f1f1f1",
    },
  },
  docker: {
    background: {
      default: `linear-gradient(45deg, ${"hsl(269,34%,58%)"} 0%,${"hsl(230,72%,68%)"} 100%)`,
    },
    backgroundColor: { default: "rgb(255,255,255)", hover: "rgb(192,192,192)" },
    color: { default: "#f5f5f5" },
    shadow: {
      default:
        "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
      hover:
        "rgba(0, 0, 0, 0.16) 0px 20px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
    },
  },
  input: {
    backgroundColor: {
      default: "#ffffff",
      hover: "#ffffff",
      focus: "#ffffff",
    },
  },
  modal: {
    backgroundColor: {
      default: "rgba(0,0,0,0.23)",
    },
  },
  icon: {
    backgroundColor: { hover: "#eeecec", default: "rgb(105,135,252)" },
    color: { default: "#6c6a6a", hover: "#202021" },
  },
  divider: { border: { default: `1px solid ${"#d9e0e1"}` } },
};

export const DarkTheme: Partial<ThemeStandard> = {
  name: "dark",
  default: {
    font: `"Noto_Medium", "HarmonyOS Sans SC", "HarmonyOS Sans",
          "sans-serif"`,
    backgroundColor: {
      default: "rgb(43, 43, 43)",
      hover: "#111",
      focus: "#222",
    },
    shadow: {
      default: "rgba(0, 0, 0, 0.54)" + "0px 0px 60px -20px",
    },
    color: { default: "#d7d5d5" },
  },
  docker: {
    backgroundColor: { default: "rgb(51,51,54)" },
    shadow: {
      default:
        "rgba(10, 10, 10, 0.8) 0px 4px 16px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
    },
  },
  button: {
    backgroundColor: {
      default: "rgb(43, 43, 43)",
      hover: "rgb(24,24,24)",
    },
    color: { default: "#a8a3a3" },
  },
  divider: { border: { default: `1px solid ${"#4e5050"}` } },
};

export const themes: { [propName: string]: Partial<ThemeStandard> } = {
  default: DefaultTheme,
  dark: DarkTheme,
};
