import { useEffect, useRef } from "react";

export function useRequestAnimationFrame(callback: () => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let handle: number;
    const animate = () => {
      callbackRef.current();
      handle = requestAnimationFrame(animate);
    };
    handle = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(handle);
  }, [callback]);
}
