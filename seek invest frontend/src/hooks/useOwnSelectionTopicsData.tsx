import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { OWN_SELECTION_TOPICS_KEY } from "constants/react_query_keys";
import { CustomError, ISelectionTopic } from "interfaces/assessment";
import { useRouter } from "next/router";
import { getOwnSelectionTopics } from "services/assessment.services";
import { handleErrorPage } from "utils/error";
const useOwnSelectionTopicsData = () => {
  const router = useRouter();
  const {
    data: ownSelectionTopics,
    error,
  }: UseQueryResult<{ data: { data: ISelectionTopic[] } }, CustomError> =
    useQuery({
      queryKey: [OWN_SELECTION_TOPICS_KEY],
      queryFn: () => getOwnSelectionTopics(),
    });

  handleErrorPage(error, router);

  return {
    ownSelectionTopics: ownSelectionTopics?.data
      ? ownSelectionTopics?.data.data
      : null,
  };
};

export default useOwnSelectionTopicsData;
