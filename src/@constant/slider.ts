import __ from "lodash";

/** @Description Slider组件的参数类 */
export class SliderClass {
  /** @Description 构造函数 最小值 步幅 标志 */
  constructor(min: number, step: number | number[], marks: string[]) {
    this.min = min;
    this.max =
        min + (__.sum(step as []) || (marks.length - 1) * (step as number));
    this.marks = [];
    marks.map((item, key) => {
      this.marks[key] = {
        value: min + key * (step as number) || (step as [])[key],
        label: item,
      };
    });
    this.step = (step as number) || null;
  }
  step: number | null;
  marks: { value: number; label: string }[];
  max: number;
  min: number;
}

/** @Description 一些slider实例 */
export namespace SliderInstance {
  export const FontSize = new SliderClass(0.96, 0.04, [
    "tiny",
    "small",
    "medium",
    "big",
    "large",
  ]);
  export const LineHeight = new SliderClass(1.32, 0.08, [
    "tiny",
    "small",
    "medium",
    "big",
    "large",
  ]);
  export const ParagraphSpacing = new SliderClass(0.2, 0.1, [
    "small",
    "medium",
    "big",
    "large",
  ]);
}
