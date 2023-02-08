import React, { forwardRef, memo, useEffect, useRef, useState } from "react";
import { useWindows } from "@/hook/useWindows";
import { animated, useSpring } from "@react-spring/web";
import { config } from "react-spring";
import { useDrag, useGesture } from "@use-gesture/react";
import { Once, Spring } from "@/component";
import { MdMoreHoriz } from "react-icons/md";
import { fn } from "@/method";
import { useTranslation } from "react-i18next";
import { tip } from "@/component/Tip";

export const Docker = forwardRef((props: Props.Docker, ref) => {
  const { children, changeState = fn, state, width = 250 } = props;
  const { w_height } = useWindows();
  const [position, setPosition] = useState<"left" | "bottom" | "right">("left");
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
      left: !state && position === "left" ? -(width + 20) : 20,
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
      <Once {...bind()} cs={"drag"} ref={ref}>
        <MdMoreHoriz />
      </Once>
      <Once cs={"body"}>{children}</Once>
    </animated.div>
  );
});

export const Mainer = memo(
  forwardRef((props: Props.Mainer, ref) => {
    const { condition = true, children, width = 250, ...rest } = props;
    const { w_width } = useWindows();
    return (
      <Once
        ref={ref}
        cs={"Body"}
        style={{
          maxWidth: condition ? w_width - width - 25 : "100%",
          left: condition ? width + 25 : 0,
        }}
        {...rest}
      >
        {children}
      </Once>
    );
  })
);
/** @Description DockerButton */
export const DockerButton = (props: Props.Once) => {
  const Ref = useRef<HTMLElement>();
  const { t } = useTranslation();

  const [spring, api] = useSpring(() => ({
    marginTop: 5,
    config: config.gentle,
  }));

  const bind = useGesture(
    {
      onMouseEnter: tip(props.label, Ref),
      onMouseLeave: tip.out,
      onDrag: (state) => {
        api.start({
          marginTop: state.active ? state.movement[1] : 5,
        });
      },
    },
    {
      drag: {
        filterTaps: true,
        bounds: { top: 0 },
      },
    }
  );
  return (
    <Spring
      {...bind()}
      ref={Ref}
      spring={spring}
      lc={props.lc}
      cs={"DockerButton"}
    >
      {props.children}
    </Spring>
  );
};
