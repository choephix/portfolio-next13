import { useEffect, useState } from 'react';

export function useWatchReturnValue<T>(getValue: () => T) {
  const [value, setValue] = useState(getValue);
  useEffect(() => {
    function loop() {
      handle = requestAnimationFrame(loop);
      const newValue = getValue();
      if (newValue !== value) {
        setValue(newValue);
      }
    }
    let handle = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(handle);
  }, [getValue]);
  return value;
}
