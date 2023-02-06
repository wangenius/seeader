declare namespace Props {
  import { SxProps, Theme } from "@mui/system";
  import * as React from "react";
  import { CSSProperties, ReactNode } from "react";
  import { SpringValues } from "react-spring";
  import { PickAnimated } from "@react-spring/web";
  import { TFuncKey } from "i18next";
  import {ReactDOMAttributes} from "@use-gesture/react/dist/declarations/src/types";


  type Original = import("@mui/system").BoxProps;
  type TextareaHTMLAttributes = import("react").TextareaHTMLAttributes;

  /** @Description 元素基本属性 */
  export interface Base extends Original {
    label?:TFuncKey;
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
      value?: string | number | boolean;
      startIcon?: ReactNode;
      state?: "active" | "none";
      label?: TFuncKey | string;
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

      placeholder?: string;
    }

    export interface Selector {
      /** @Description 是否显示 */
      open?:boolean;
      /** @Description 标题 */
      title?: TFuncKey | string;
      /** @Description 初始值 */
      value?: string | boolean | number;
      /** @Description 对象 */
      children: {
        [propsName:string]:string | number | boolean
      };

      onClick?(value?: string | boolean | number): void;
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
      label?: JSX.Element | TFuncKey;
      icon?: ReactNode;
      shortcuts?: string;
      cls?: string;
      sub?: Option[];
      check?: boolean;
      allowed?: boolean;
      value?: string | number | boolean;

      onClick?(...props: any): any;
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
    base?: "top" | "bottom" | "right_middle";
    /** @Description 绝对定位 相对定位 */
    position?: "relative" | "absolute";
  }

  export interface Spring {
    open?:boolean,
    children?:ReactNode,
    cls?:string,
    onClick?:Fn,
    onContextMenu?:Fn,
    spring?: SpringValues<PickAnimated<{}>>;
    style?: CSSProperties;
    bind?:(...args: any[]) => ReactDOMAttributes
  }


  export interface DragZone {
    width: number;
    height: number;
    left: number;
    top: number;
  }

  export interface BookCover {
    /** @Description bookItem */
    item: Book;
    /** @Description 序号 */
    index: number;
    /** @Description 对象目标位置 */
    DestAnchor?: Props.DragZone;
    /** @Description gesture 对象拖拽时触发 */
    onDrag?(): void;
    /** @Description gesture 对象 拖拽到目标位置并松开触发 */
    onDest?(): void;
  }
}
