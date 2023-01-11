import { Language } from "./i18next";

declare interface Chapter {
  index: number;
  title: string;
  content: string;
}

declare interface Book {
  _id?: string;
  name: string;
  path: string;
  titles: chapterTitle[];
  total: number;
  progress: number;
}

declare interface BookBody {
  _id?: string;
  [propsName: string]: Chapter;
}

declare interface chapterTitle {
  index: number;
  title: string;
}

declare interface Settings {
  _id?: string;
  common: {
    startWithWin?: boolean;
    minWithTray?: boolean;
  };
  preference: {
    theme?: string;
    language?: Language;
  };
  shelf: {
    coverUrl?: string;
  };
  reading: {
    contentOpen?: boolean;
    fontSize?: number;
    fontFamily?: string;
    lineHeight?: number;
    paragraphSpacing?: number;
    background?: string;
    dictionary?: "online" | "local";
  };
  download: {
    downloadPath: string;
    cachePath: string;
  };
  sync: {
    [propsName: string]: string;
  };
}
