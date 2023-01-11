import { Browser, Clipboard, Shell } from "../method/remote";
import { toast } from "react-toastify";
import { useModal } from "../context/ModalProvider";
import { Container } from "../component/Container";
import { SX } from "../@constant/theme";
import { useTheme } from "../context/ThemeProvider";
import { useAppSelector } from "../store/store";

export function useMethod() {
  const { modal } = useModal();
  const { theme } = useTheme();
  const settings = useAppSelector((state) => state.settings);
  function copyText(strings?: string) {
    try {
      const text = window.getSelection();
      if (text !== null) Clipboard.copy(strings || text.toString());
      toast.success("复制成功");
    } catch (e) {
      toast.error("复制失败");
    }
  }

  async function searchWeb(strings?: string) {
    await Browser.create(
      `https://m.baidu.com/s?wd=${strings || window.getSelection()}`
    );
  }

  async function translate(strings?: string) {
    if (settings.reading.dictionary === "online")
      return await Browser.create(
        `https://www.youdao.com/result?word=${
          strings || window.getSelection()
        }&lang=en`
      );
    const content = await Shell.dict(
      strings || window.getSelection()?.toString() || ""
    );
    modal(
      <Container
        sx={[
          {
            width: 500,
            height: 500,
            backgroundColor: "#fff",
            borderRadius: 3,
            p: 3,
            boxShadow: theme.docker.shadow?.default,
            "*": {
              fontFamily: theme.default.font,
            },
          },
          SX.scrollbarSx,
          SX.overFlowY,
        ]}
      >
        <div dangerouslySetInnerHTML={{ __html: content.definition }}></div>
      </Container>
    );
  }

  return {
    copyText,
    searchWeb,
    translate,
  };
}
