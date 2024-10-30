import { IModelContextType, IReviewModel } from "interfaces/model";
import { createContext, useContext, useState } from "react";

const ModelContext = createContext<IModelContextType>({
  reviewModels: [],
  setReviewModels: () => {},
});

interface ModelStateProps {
  children: JSX.Element;
}

const ModelState = ({ children }: ModelStateProps) => {
  const [reviewModels, setReviewModels] = useState<IReviewModel[]>([]);

  const state: IModelContextType = {
    reviewModels,
    setReviewModels,
  };

  return (
    <ModelContext.Provider value={state}>{children}</ModelContext.Provider>
  );
};

export const useModelContext = () => useContext(ModelContext);

export default ModelState;
