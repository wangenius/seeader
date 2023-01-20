import React, { useCallback, useLayoutEffect, useRef } from "react";

export function useEvent<
  Fn extends (event: React.MouseEvent, key: number) => any
>(handler: Fn): Fn {
  if (typeof window === "undefined") {
    // useLayoutEffect doesn't work on the server side, don't bother
    // trying to make callback functions stable
    return handler;
  }

  const handlerRef = useRef<Fn | null>(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((event: React.MouseEvent, key: number): any => {
    handlerRef.current?.(event, key);
  }, []) as Fn;
}