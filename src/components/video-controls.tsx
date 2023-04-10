import { forwardRef, HTMLProps, MouseEvent } from "react";
import {
  FaExpand,
  FaImage,
  FaPause,
  FaPlay,
  FaStop,
  FaVideo,
} from "react-icons/fa";
import classes from "./video-controls.module.css";
import { ControlButton } from "@/components/control-button";
import { Timeline } from "@/components/timeline";
import { cn } from "@/utils/cn";
import { secondsToDuration } from "@/utils/duration-format";

type VideoControlsProps = Omit<HTMLProps<HTMLDivElement>, "children"> & {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onCameraTogglePress?: VoidFunction;
  onPeek: (ev: MouseEvent<HTMLElement>) => void;
  onResumePress?: VoidFunction;
  onStopPress?: VoidFunction;
  onToggleFullscreenPress?: VoidFunction;
  videoHidden: boolean;
};

export const VideoControls = forwardRef<HTMLDivElement, VideoControlsProps>(
  (
    {
      className,
      currentTime,
      duration,
      isPlaying,
      onCameraTogglePress,
      onPeek,
      onResumePress,
      onStopPress,
      onToggleFullscreenPress,
      videoHidden,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(classes.wrapper, className)}>
        <Timeline duration={duration} current={currentTime} onPeek={onPeek} />

        <div className={classes.controls}>
          <div className={classes.left}>
            {onResumePress && (
              <ControlButton onClick={onResumePress}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </ControlButton>
            )}

            {onStopPress && (
              <ControlButton onClick={onStopPress}>
                <FaStop />
              </ControlButton>
            )}

            <span className={classes.duration_span}>
              {secondsToDuration(currentTime)} / {secondsToDuration(duration)}
            </span>
          </div>

          <div className="right">
            {onToggleFullscreenPress && !videoHidden && (
              <ControlButton onClick={onToggleFullscreenPress}>
                <FaExpand />
              </ControlButton>
            )}

            {onCameraTogglePress && (
              <ControlButton onClick={onCameraTogglePress}>
                {videoHidden ? <FaVideo /> : <FaImage />}
              </ControlButton>
            )}
          </div>
        </div>
      </div>
    );
  }
);
VideoControls.displayName = "VideoControls";
