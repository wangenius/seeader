import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function usePath() {
  const [isShelf, setIsShelf] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const param = useLocation();

  useEffect(() => {
    if (param.pathname === "/shelf") {
      setIsReading(false);
      setIsShelf(true);
    }
    if (param.pathname === "/") {
      setIsReading(true);
      setIsShelf(false);
    }
  }, [param]);

  return { isShelf, isReading };
}
