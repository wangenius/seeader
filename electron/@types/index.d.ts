/** @Description 返回值类型 */
declare type Reply =Promise<{
  code:-1|0|1,
  msg:string,
  body?:any
}>

declare interface ParseredBook {
  Chapters: { index: number; title: string; content: string[] }[];
  total: number;
  titles: { index: number; title: string }[];
}