import { RefObject, useCallback, useLayoutEffect, useState } from "react";

export function useFullscreenStatus(videoRef: RefObject<HTMLVideoElement>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const setFullScreen = useCallback(async () => {
    if (videoRef.current === null) return;

    try {
      await videoRef.current.requestFullscreen();
      setIsFullscreen(
        (document as any)[getBrowserFullscreenElementProp()] !== null
      );
    } catch (e) {
      setIsFullscreen(false);
    }
  }, [videoRef]);

  useLayoutEffect(() => {
    document.onfullscreenchange = () =>
      setIsFullscreen(
        (document as any)[getBrowserFullscreenElementProp()] !== null
      );

    return () => {
      document.onfullscreenchange = null;
    };
  });

  return [isFullscreen, setFullScreen] as const;
}

function getBrowserFullscreenElementProp() {
  if (!document) throw new Error("Not on browser");

  if (typeof document.fullscreenElement !== "undefined") {
    return "fullscreenElement";
  } else if (typeof (document as any).mozFullScreenElement !== "undefined") {
    return "mozFullScreenElement";
  } else if (typeof (document as any).msFullscreenElement !== "undefined") {
    return "msFullscreenElement";
  } else if (typeof (document as any).webkitFullscreenElement !== "undefined") {
    return "webkitFullscreenElement";
  } else {
    throw new Error("fullscreenElement is not supported by this browser");
  }
}
