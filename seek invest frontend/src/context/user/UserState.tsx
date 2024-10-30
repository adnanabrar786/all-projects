import UserContext from "context/user/UserContext";
import { IClient } from "interfaces/client";
import { IUser, IUserContext } from "interfaces/user";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

const UserState = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [selectedClients, setSelectedClients] = useState<IClient[] | null>(
    null
  );
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);
  const [valuesRisk, setValuesRisk] = useState("");
  const [refreshOverallRiskAlignment, setRefreshOverallRiskAlignment] =
    useState(false);

  const state: IUserContext = {
    user,
    setUser,
    selectedClients,
    setSelectedClients,
    selectedClient,
    setSelectedClient,
    valuesRisk,
    setValuesRisk,
    refreshOverallRiskAlignment,
    setRefreshOverallRiskAlignment,
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export default UserState;
