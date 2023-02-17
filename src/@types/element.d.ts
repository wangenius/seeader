declare namespace Props {
  import { TFuncKey } from "i18next";
  import { SxProps, Theme } from "@mui/system";
  import * as React from "react";
  import { ReactNode } from "react";
  import { SpringValues } from "react-spring";
  import { PickAnimated } from "@react-spring/web";
  import { DetailedHTMLProps, HTMLAttributes } from "react";
  /** @Description 元素初始信息 */
  type Original = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;

  /** @Description react */
  type TextareaHTMLAttributes = import("react").TextareaHTMLAttributes;

  /** @Description 元素基本属性 */
  export interface Once
    extends Omit<Original, "ref" | "className" | "onContextMenu" | "onClick"> {
    /** @Description TFuncKey 标签 */
    label?: Label;
    /** @Description 组件含值 */
    value?: Value;
    /** @define classname */
    cs?: string;
    /** @Description 是否处于加载状态 */
    loading?: boolean;
    /** @Description 是否显示元素 不显示返回null  默认显示*/
    open?: boolean;
    /** @Description state状态 */
    state?: string;

    /** @Description 左键点击 */
    lc?(event: MouseEvent<HTMLDivElement>, value: Value, ...rest: any[]): any;

    /** @Description 右键点击 */
    rc?(event: MouseEvent<HTMLDivElement>, value: Value, ...rest: any[]): any;
  }

  export interface Mainer extends Once {
    condition?: boolean;
    width?: number;
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
    export interface Default extends Once {
      /** @Description text */
      label?: TFuncKey;
      /** @Description icons */
      startIcon?: ReactNode;
      /** @Description icon */
      endIcon?: ReactNode;

      /** @Description 左键点击 */
      lc?(value?: Value, ...rest: any[]): any;

      /** @Description 右键点击 */
      rc?(value?: Value, ...rest: any[]): any;
    }

    /** @Description ListButtonProps */
    export interface InList extends Omit<Default, "label"> {
      isActive?: boolean;

      primary?: TFuncKey;
      secondary?: TFuncKey;
    }

    /** @Description IconBtn 基本属性 */
    export interface Icon
      extends Omit<Default, "startIcon" | "endIcon" | "children"> {
      /** @Description icon */
      icon: ReactNode;
      size?:number;
    }
  }

  /** @Description svgBtn base attr */
  export interface SvgIcon extends Once {
    icon: ReactNode;
    size?: number;
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
      open?: boolean;
      /** @Description 标题 */
      title?: TFuncKey | string;
      /** @Description 初始值 */
      value?: string | boolean | number;
      /** @Description 对象 */
      children: {
        [propsName: string]: string | number | boolean;
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
    export interface Main extends Button.Default {
      children: Option;
    }

    /** @Description MenuItem Props */
    export interface Item extends Button.Default {
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
  export interface Localizer extends Once{
    /** @Description 子元素 */
    children?: ReactNode;
    /** @Description 锚元素 鼠标事件和锚元素必须设置一个 */
    anchor?: HTMLElement;
    /** @Description 鼠标事件 */
    event?: React.MouseEvent;
    /** @Description 停靠位置线 */
    base?: LocalizerBase;
    /** @Description 绝对定位 相对定位 */
    position?: "relative" | "absolute";
  }

  /** @Description 动画组件 */
  export interface Spring extends Omit<Once, "style"> {
    /** @Description 动画spring */
    spring?: SpringValues<PickAnimated<{}>>;
  }

  export interface BookCover {
    /** @Description bookItem */
    item: Book;
    /** @Description selected 状态 */
    selected?: boolean;
    /** @Description 当有其他对象选中时 */
    selectedExist?: boolean;

    /** @Description 右键选择 当选中时 */
    onSelected(item: Book): void;

    /** @Description 取消选择 */
    onCancelSelected(item: Book): void;
  }

  export interface Docker {
    children: ReactNode;
    /** @Description Docker显隐状态 */
    state: boolean;

    /** @Description 状态改变方法 */
    changeState?(): any;

    /** @Description Docker宽度 */
    width?: number;
  }
}
