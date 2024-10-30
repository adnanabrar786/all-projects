import CompanyContext from "context/firm/CompanyContext";
import { ICompany, ICompanyContext } from "interfaces/company";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

const CompanyState = ({ children }: Props) => {
  const [company, setCompany] = useState<ICompany | null>(null);

  const state: ICompanyContext = {
    company,
    setCompany,
  };

  return (
    <CompanyContext.Provider value={state}>{children}</CompanyContext.Provider>
  );
};

export default CompanyState;
