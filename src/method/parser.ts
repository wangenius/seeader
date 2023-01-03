import jschardet from "jschardet";
import iconvLite from "iconv-lite";

export const bufferDecode = (text: Buffer): string => {
  if (jschardet.detect(text).encoding !== "UTF-8")
    return iconvLite.decode(text, "gbk");
  return text.toString();
};

export const textDecode = (buffer: BufferSource) => {
  return new TextDecoder().decode(buffer);
};

export const jsonParse = (text: string) => {
  return JSON.parse(text);
};
export const pathParser = (path: string) => {
  const array = path.split(/\\/g);
  return { name: array[array.length - 1] };
};

export function sxParser(sxList: Style.SXs, newSx: any): [] {
  let result: [];
  if (newSx === undefined) return sxList as [];
  result = sxList.concat([...(Array.isArray(newSx) ? newSx : [newSx])]) as [];
  return result;
}
