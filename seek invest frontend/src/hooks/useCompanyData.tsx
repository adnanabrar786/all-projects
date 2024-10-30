import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { COMPANY_KEY } from "constants/react_query_keys";
import { useCompanyContext } from "context/firm/CompanyContext";
import { CustomError } from "interfaces/assessment";
import { ICompany } from "interfaces/company";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getFirm } from "services/firm.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useCompanyData = () => {
  const token = getToken();
  const { company, setCompany } = useCompanyContext();
  const router = useRouter();

  const {
    data: companyData,
    refetch,
    error,
  }: UseQueryResult<{ data: { data: ICompany } }, CustomError> = useQuery({
    queryKey: [COMPANY_KEY],
    queryFn: () => getFirm(),
    enabled: token ? true : false,
  });

  useEffect(() => {
    if (companyData?.data?.data) {
      setCompany(companyData.data.data);
    }
  }, [companyData]);

  handleErrorPage(error, router);

  return { company, refetchCompany: refetch };
};

export default useCompanyData;
