import { useRef, useEffect } from 'react';

function usePrevious(value) {
  const prevValueRef = useRef();
  useEffect(() => {
    prevValueRef.current = value;
  });
  return prevValueRef.current;
}

export default usePrevious;
