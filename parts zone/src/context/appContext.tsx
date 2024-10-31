import { createContext, useContext, useState } from "react";
import { IAppContextType } from "@/utils/interfaces/IApp";

const AppContext = createContext<IAppContextType>({
  loader: false,
  setLoader: () => {},
});

interface AppStateProps {
  children: JSX.Element;
}

const AppState = ({ children }: AppStateProps) => {
  const [loader, setLoader] = useState<boolean>(false);
  const state: IAppContextType = {
    loader,
    setLoader,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppState;
