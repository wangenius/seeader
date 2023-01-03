declare interface Menu_Options {
  type: "menu" | "item" | "divider" | "title";
  open?: boolean;
  label?: string;
  shortcuts?: string;
  sub?: Menu_Options[];
  onClick?(): any;
}

declare interface ShelfBook {
  name: string;
  path: string;
  progress: number;
}

declare interface Chapter {
  index: number;
  title: string;
  content: string;
}

declare interface Book {
  name: string;
  path: string;
  chapters: Chapter[];
  progress: number;
}
