import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CREATE_ASSESSMENTS_KEY } from "constants/react_query_keys";
import { CustomError } from "interfaces/assessment";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { getAssessments } from "services/assessment.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";

const useAssessmentData = () => {
  const token = getToken();
  const searchParam = useSearchParams();
  const router = useRouter();

  const {
    data: newAssessments,
    error,
  }: UseQueryResult<{ data: { data: any } }, CustomError> = useQuery({
    queryKey: [CREATE_ASSESSMENTS_KEY, searchParam.get("search")?.toString()],
    queryFn: () => getAssessments(searchParam.get("search")?.toString() ?? ""),
    enabled: token ? true : false,
  });

  handleErrorPage(error, router);

  return {
    newAssessments: newAssessments?.data ? newAssessments?.data.data : null,
  };
};

export default useAssessmentData;
