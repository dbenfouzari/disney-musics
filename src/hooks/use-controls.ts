import { useCallback, useEffect, useRef, useState } from "react";

export function useControls() {
  const ref = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const [controlsVisible, setControlsVisible] = useState(true);

  const onWrapperFocus = useCallback(function (event: Event) {
    const target = event.target as HTMLElement;
    console.log(target.contains(controlsRef.current));
    if (controlsRef.current && !controlsRef.current.contains(target)) {
      setControlsVisible((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    const curr = ref.current;
    if (curr) {
      curr?.addEventListener("click", onWrapperFocus);
    }

    return () => {
      curr?.removeEventListener("click", onWrapperFocus);
    };
  }, [onWrapperFocus]);

  return [ref, { controlsVisible, controlsRef }] as const;
}
