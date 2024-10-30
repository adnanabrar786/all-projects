import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CUSTOM_ASSESSMENTS_KEY } from "constants/react_query_keys";
import { CustomError, ICustomAssessments } from "interfaces/assessment";
import { useRouter } from "next/router";
import { useState } from "react";
import { getCustomAssessments } from "services/assessment.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useCustomAssessmentsData = (search: string) => {
  const token = getToken();
  const router = useRouter();

  const [assessmentData, setAssessmentData] = useState<ICustomAssessments[]>(
    []
  );

  const {
    data: customAssessments,
    refetch,
    isRefetching,
    error,
  }: UseQueryResult<{ data: { data: any } }, CustomError> = useQuery({
    queryKey: [CUSTOM_ASSESSMENTS_KEY],
    queryFn: () => getCustomAssessments(search),
    enabled: token ? true : false,
    keepPreviousData: true,
  });

  handleErrorPage(error, router);

  return {
    customAssessments: customAssessments ? customAssessments.data.data : null,
    refetch,
    isRefetching,
  };
};

export default useCustomAssessmentsData;
