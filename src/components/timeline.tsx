import { HTMLProps, MouseEvent } from "react";
import classes from "./timeline.module.css";

export type TimelineProps = Omit<HTMLProps<HTMLDivElement>, "children"> & {
  duration: number;
  current: number;
  onPeek: (ev: MouseEvent<HTMLElement>) => void;
};

export function Timeline({
  current,
  duration,
  className,
  onPeek,
  ...props
}: TimelineProps) {
  const percent = (current / duration) * 100;

  return (
    <div className={classes.wrapper} onClick={onPeek} {...props}>
      <div className={classes.inner} style={{ width: `${percent}%` }}></div>
    </div>
  );
}
