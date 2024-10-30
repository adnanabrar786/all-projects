import { useQuery } from "@tanstack/react-query";
import { DEFAULT_QUESTIONS_KEY } from "constants/react_query_keys";
import { CustomError, IDefaultQuestion } from "interfaces/assessment";
import { useParams, useRouter } from "next/navigation";
import { getDefaultQuestions } from "services/assessment.services";
import { handleErrorPage } from "utils/error";
import { getToken } from "utils/token";
const useDefaultQuestionsData = () => {
  const token = getToken();
  const router = useRouter();
  const {
    assessmentId,
  }: {
    assessmentId: string;
  } = useParams();

  const { data: defaultQuestions, error } = useQuery<
    {
      data: { data: IDefaultQuestion[] };
    },
    CustomError
  >({
    queryKey: [DEFAULT_QUESTIONS_KEY],
    queryFn: () => getDefaultQuestions(assessmentId),
    enabled: token ? true : false,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });

  handleErrorPage(error, router);

  return {
    defaultQuestions: defaultQuestions?.data
      ? defaultQuestions?.data.data
      : null,
  };
};

export default useDefaultQuestionsData;
