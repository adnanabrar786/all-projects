import { ICompanyContext } from "interfaces/company";
import { createContext, useContext } from "react";

const CompanyContext = createContext<ICompanyContext>({
  company: null,
  setCompany: () => {},
});

export const useCompanyContext = () => useContext(CompanyContext);

export default CompanyContext;
