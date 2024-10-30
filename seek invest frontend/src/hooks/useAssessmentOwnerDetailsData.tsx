import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ASSESSMENT_OWNER_DETAILS_KEY } from "constants/react_query_keys";
import { CustomError, IAssessmentOwner } from "interfaces/assessment";
import { useRouter } from "next/router";
import { getAssessmentOwnerDetails } from "services/assessment.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";

const useAssessmentOwnerDetailsData = (assessmentId: string) => {
  const token = getToken();
  const router = useRouter();

  const {
    data: assessmentOwnerDetails,
    error,
  }: UseQueryResult<{ data: { data: IAssessmentOwner } }, CustomError> =
    useQuery({
      queryKey: [ASSESSMENT_OWNER_DETAILS_KEY],
      queryFn: () => getAssessmentOwnerDetails(assessmentId),
      enabled: token ? true : false,
    });

  handleErrorPage(error, router);

  return {
    assessmentOwnerDetails: assessmentOwnerDetails?.data
      ? assessmentOwnerDetails?.data.data
      : null,
  };
};

export default useAssessmentOwnerDetailsData;
