// Vendor imports
import React from "react";

interface ITabContext {
  isTabActive: boolean;
  setTabActive: (value: boolean) => void;
}

const TabContext = React.createContext<ITabContext>({
  isTabActive: true,
  setTabActive: () => {},
});

export default TabContext;
export { ITabContext };
