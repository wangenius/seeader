import { useSnackbar } from "notistack";
import { feedState } from "../constant/state";

export function useTools() {
  const { enqueueSnackbar } = useSnackbar();
  function copyText(text: string) {
    try {
      window.clipboard.writeText(text);
      enqueueSnackbar("复制成功", feedState.SUCCESS);
    } catch (e) {}
  }

  return { copyText };
}
