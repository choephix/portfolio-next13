import { useEffect, useState } from "react";

export function LiveValue(props: { cb: Function }) {
  const [v, set] = useState('');

  useEffect(() => {
    let handle: number;
    const animate = () => {
      set(props.cb());
      handle = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(handle);
  }, [props.cb]);

  return <>{v}</>;
}
