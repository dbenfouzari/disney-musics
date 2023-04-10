import { RefObject, useCallback, useEffect, useRef, useState } from "react";

type UseControlsOptions = {
  avoidHidingUIOnFocusingElements?: RefObject<HTMLElement>[];
};

export function useControls(options: UseControlsOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const [controlsVisible, setControlsVisible] = useState(true);

  const onWrapperFocus = useCallback(
    function (event: Event) {
      const target = event.target as HTMLElement;

      if (
        !options.avoidHidingUIOnFocusingElements?.some((elmRef) =>
          elmRef.current?.contains(target)
        ) &&
        controlsRef.current &&
        !controlsRef.current.contains(target)
      ) {
        setControlsVisible((prev) => !prev);
      }
    },
    [options.avoidHidingUIOnFocusingElements]
  );

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
