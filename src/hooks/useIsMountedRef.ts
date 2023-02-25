import { useRef, useEffect } from "react";

export default function useIsMountedRef() {
  const isMounted = useRef(true);

  useEffect(() => {
    //cleanup function
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
