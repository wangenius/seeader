import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function usePath() {
  const [isShelf, setIsShelf] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const param = useLocation();

  useEffect(() => {
    if (param.pathname === "/shelf") {
      setIsReading(false);
      setIsSetting(false);
      setIsShelf(true);
    }
    if (param.pathname === "/") {
      setIsReading(true);
      setIsShelf(false);
      setIsSetting(false);
    }
    if (param.pathname === "/setting") {
      setIsSetting(true);
      setIsShelf(false);
      setIsReading(false);
    }
  }, [param]);

  return { isShelf, isReading, isSetting };
}
