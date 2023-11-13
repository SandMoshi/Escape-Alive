// Vendor imports
import React, { useState, useEffect } from "react";

// imports
import TabContext, { ITabContext } from "./TabContext.ts";

const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTabActive, setTabActive] = useState<boolean>(true);

  // value to be provided to consumers
  const value: ITabContext = {
    isTabActive,
    setTabActive,
  };

  const handleVisibilityChange = (blur: boolean | void): void => {
    if (document.hidden || blur) {
      setTabActive(false);
    } else {
      setTabActive(true);
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", () => handleVisibilityChange);
    document.addEventListener("visibilitychange", () => handleVisibilityChange);
    window.addEventListener("blur", () => handleVisibilityChange(true));
    window.addEventListener("focus", () => handleVisibilityChange(false));

    return () => {
      document.removeEventListener(
        "visibilitychange",
        () => handleVisibilityChange,
        false
      );
      document.removeEventListener("blur", () => handleVisibilityChange(true));
      document.removeEventListener("focus", () =>
        handleVisibilityChange(false)
      );
    };
  }, []);

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

export { TabProvider };
