import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

export function usePlayer<T extends HTMLVideoElement | HTMLAudioElement>() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<T>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const onPlayPress = useCallback(async function onPlayPress() {
    if (ref.current) {
      if (ref.current.paused) {
        await ref.current.play();
      } else {
        ref.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  const onStopPress = useCallback(function onStopPress() {
    if (ref.current) {
      ref.current.pause();
      setIsPlaying(false);
      ref.current.currentTime = 0;
    }
  }, []);

  const onPeek = useCallback(
    function onPeek(event: MouseEvent<HTMLElement>) {
      const totalWidth = window.innerWidth;
      const clickedWidth = event.clientX;

      const percentage = (clickedWidth / totalWidth) * 100;
      const nextDuration = (duration * percentage) / 100;

      if (ref.current) {
        ref.current.currentTime = nextDuration;
      }
    },
    [duration]
  );

  const onTimeUpdate = useCallback(function onTimeUpdate() {
    if (ref.current) {
      setCurrentTime(
        parseInt(ref.current.currentTime as unknown as string, 10)
      );
    }
  }, []);

  const onDataLoaded = useCallback(function onDataLoaded(event: Event) {
    const target = event.target as HTMLVideoElement;
    setDuration(target.duration);
  }, []);

  const onPlaying = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const onPause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.load();
    }
  }, []);

  useEffect(() => {
    const curr = ref.current;

    if (curr) {
      curr.addEventListener("timeupdate", onTimeUpdate);
      curr.addEventListener("canplaythrough", onDataLoaded);
      curr.addEventListener("play", onPlaying);
      curr.addEventListener("pause", onPause);
    }

    return () => {
      curr?.removeEventListener("timeupdate", onTimeUpdate);
      curr?.removeEventListener("canplaythrough", onDataLoaded);
      curr?.removeEventListener("play", onPlaying);
      curr?.removeEventListener("pause", onPause);
    };
  }, [onDataLoaded, onPause, onPlaying, onTimeUpdate]);

  useEffect(() => {
    (async () => {
      if (ref.current) {
        ref.current.muted = false;
      }
    })();
  }, [ref]);

  return [
    ref,
    {
      currentTime,
      duration,
      isPlaying,
      onPlayPress,
      onStopPress,
      onPeek,
    },
  ] as const;
}
