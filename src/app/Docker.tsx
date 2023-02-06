import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWindows } from "../hook/useWindows";
import { animated, useSpring } from "@react-spring/web";
import { config } from "react-spring";
import { useDrag, useGesture } from "@use-gesture/react";
import { Container, Pop, Spring } from "../component";
import { MdMoreHoriz } from "react-icons/md";
import { voidFn } from "../method";
import { useTranslation } from "react-i18next";

export const Docker = forwardRef(
  (
    props: {
      children: ReactNode;
      /** @Description Docker显隐状态 */
      state: boolean;
      /** @Description 状态改变方法 */
      changeState?(): any;
      /** @Description Docker宽度 */
      width?: number;
    },
    ref: any
  ) => {
    const { children, changeState = voidFn, state, width = 250 } = props;
    const { w_height } = useWindows();
    const [position, setPosition] = useState<"left" | "bottom" | "right">(
      "left"
    );

    const post = {
      x: 0,
      y: 0,
      left: -(width + 20),
      top: 50,
      width: width ? width : "fit-content",
    };

    const [spring, api] = useSpring(() => post);

    /** @Description spring执行
     *  */
    useEffect(() => {
      api.start({
        left: !state && position === "left" ? post.left : 20,
        top: !state && position === "bottom" ? w_height + 20 : 50,
        config: state ? config.stiff : config.wobbly,
      });
    }, [state]);

    /** @Description gesture监听 */
    const bind = useDrag(
      ({ down, active, movement: [mx, my], initial, cancel }) => {
        if (initial[0] + mx > 400 || initial[1] + my < 0) cancel();

        if (initial[0] + mx < 100 && !down) {
          setPosition("left");
          changeState();
        }
        if (initial[1] + my > w_height / 2 && !down) {
          setPosition("bottom");
          changeState();
        }

        api.start({
          x: active ? mx : 0,
          y: active ? my : 0,
          delay: 0,
          config: active ? config.stiff : config.wobbly,
        });
      },
      {
        filterTaps: true,
        axis: "lock",
      }
    );

    return (
      <animated.div className={"Docker"} style={spring}>
        <Container {...bind()} cls={"drag"} ref={ref}>
          <MdMoreHoriz />
        </Container>
        <Container cls={"body"}>{children}</Container>
      </animated.div>
    );
  }
);

interface MainProps extends Props.Base {
  condition?: boolean;
  /** @Description 对应Docker宽度 */
  width?: number;
}

export const Mainer = forwardRef((props: MainProps, ref) => {
  const { condition = true, children, width = 250, ...other } = props;
  const { w_width } = useWindows();
  return (
    <Container
      ref={ref}
      className={"Body"}
      {...other}
      style={{
        maxWidth: condition ? w_width - width - 25 : "100%",
        left: condition ? width + 25 : 0,
      }}
    >
      {children}
    </Container>
  );
});
/** @Description DockerButton */
export const DockerButton = (props: Props.Base) => {
    const Ref = useRef<HTMLElement>();
    const {t} = useTranslation();

    const [spring, api] = useSpring(() => ({
        marginTop: 5,
        config: config.gentle,
    }));

    const bind = useGesture(
        {
            onHover: () =>
                Pop.set(
                    <Container cls={"toolTip"}>{t(props.label) || "toolTip"}</Container>,
                    {anchor: Ref.current, base: "right_middle", position: "absolute"}
                ).open(),
            onMouseLeave: Pop.close,
            onDrag: (state) => {
                api.start({
                    marginTop: state.active ? state.movement[1] : 5,
                });
            },
        },
        {
            drag: {
                filterTaps: true,
                bounds: {top: 0},
            },
        }
    );
    return (
        <Spring
            {...bind()}
            ref={Ref}
            spring={spring}
            onClick={props.onClick}
            cls={"svgButton"}
        >
            {props.children}
        </Spring>
    );
};