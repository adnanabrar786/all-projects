import { IUserContext } from "interfaces/user";
import { createContext, useContext } from "react";

const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  selectedClients: null,
  setSelectedClients: () => {},
  selectedClient: null,
  setSelectedClient: () => {},
  valuesRisk: "",
  setValuesRisk: () => {},
  refreshOverallRiskAlignment: false,
  setRefreshOverallRiskAlignment: () => {},
});

export const useUserContext = () => useContext(UserContext);

export default UserContext;
