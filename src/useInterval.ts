import { useRef, useEffect } from 'react';

function useInterval(callback: VoidFunction, delay: number) {
  const savedCallback = useRef<VoidFunction>(callback);
  savedCallback.current = callback;

  useEffect(() => {
    if (!delay) {
        return;
    }
    const id = setInterval(() => {
         savedCallback.current();
    }, delay);
    return () => {
        clearInterval(id);
    };
  }, [delay]);
}

export default useInterval;
