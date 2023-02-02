declare namespace Props {
  import { SxProps, Theme } from "@mui/system";
  import * as React from "react";
  import { CSSProperties, ReactNode } from "react";
  import { SpringValues } from "react-spring";
  import { PickAnimated } from "@react-spring/web";

  type Original = import("@mui/system").BoxProps;
  type TextareaHTMLAttributes = import("react").TextareaHTMLAttributes;

  /** @Description 元素基本属性 */
  export interface Base extends Original {
    children?: ReactNode;
    id?: string;
    index?: number;
    sx?: SxProps<Theme>;
    cls?: string;
    loading?: boolean;
    open?: boolean;
    state?: string;
    focus?: boolean;

    onClick?(...props): any;

    onContextMenu?(...props): any;
  }

  /** @Description
   *
   *
   *
   *
   *
   *
   * Button */
  declare namespace Button {
    /** @Description Btn基本属性 */
    export interface Main extends Base {
      index?: number;
      value?: string;
      startIcon?: ReactNode;
      state?: "active" | "none";
      label?: string;
      endIcon?: ReactNode;
      href?: string;
      tip?: boolean;
      small?: boolean;
    }

    /** @Description ListButtonProps */
    export interface ListButton extends Main {
      value: number;
      isActive?: boolean;
    }

    /** @Description IconBtn 基本属性 */
    export interface IconButton extends Main {
      children?: SvgIconObject;
      icon?: SvgIconObject | string;
      SvgSx?: SxProps<Theme>;
      size?: number;
    }

    /** @Description SvgIcon 对象*/
    type SvgIconObject = JSX.Element;

    /** @Description svgBtn base attr */
    export interface SvgIcon extends Base {
      size?: number;
      icon?: ReactNode;
    }

    export interface MenuButton extends Button.Main {
      context: Menu.Option;
      size?: number;
    }
  }

  /** @Description
   *
   *
   *
   * 输入
   *
   * */
  declare namespace Input {
    /** @Description 开关props */
    export interface Toggle {
      defaultChecked?: boolean;
      onChange: (checked: boolean) => void;
    }

    /** @Description text基本属性 */
    export interface Text extends TextareaHTMLAttributes<HTMLTextAreaElement> {
      init?: string;
      children?: ReactNode;
      id?: string;
      sx?: SxProps<Theme>;
      loading?: boolean;
      open?: boolean;
      button?: boolean;

      onClick?(value: string): void;

      onChange?(value: string): void;

      placeholder: string;
    }

    export interface Selector{
      /** @Description 初始值 */
      value?: string | boolean | number;
      /** @Description 对象 */
      children: {
        /** @Description 对象结点 */
        item: ReactNode;
        /** @Description 对象属性值 */
        value?: string | boolean | number;
      }[];

      onClick?(value?: string | boolean | number): void;
    }

    /** @Description 滑块 */
    export interface Slider {
      args?: SliderArgs;
      value?: number;
      defaultValue?: number;
      markLabel?: boolean;
      onChange: (value: number) => void;

      getAriaValueText?(value: number, index: number): string;
    }

    interface SliderArgs {
      max?: number;
      min?: number;
      step?: number | null;
      marks?: { value: number; label: string }[];
    }
  }

  /** @Description
   *
   *
   * 菜单
   * */
  declare namespace Menu {
    /** @Description menu props */
    export interface Main extends Button.Main {
      children: Option;
    }

    /** @Description MenuItem Props */
    export interface Item extends Button.Main {
      children: Option;
      base?: string | number | boolean;
      type?: "item" | "menu" | "divider" | "title";
    }

    /** @Description Menu options attr */
    export interface Option {
      type: "menu" | "item" | "divider" | "title";
      open?: boolean;
      label?: ReactNode;
      icon?: ReactNode;
      shortcuts?: string;
      cls?: string;
      sub?: Option[];
      check?: boolean;
      allowed?: boolean;
      value?:string | number | boolean;
      onClick?(...props:any): any;
    }
  }

  /** @Description LocalizerProps */
  export interface Localizer {
    /** @Description 子元素 */
    children?: ReactNode;
    /** @Description 锚元素 鼠标事件和锚元素必须设置一个 */
    anchor?: HTMLElement;
    /** @Description 鼠标事件 */
    event?: React.MouseEvent;
    /** @Description 停靠位置线 */
    base?: "top" | "bottom";
    /** @Description 绝对定位 相对定位 */
    position?: "relative" | "absolute";
  }

  export interface Spring extends Base {
    spring?: SpringValues<PickAnimated<{}>>;
    style?: CSSProperties;
  }
}
