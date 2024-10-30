import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PREFERENCE_KEY } from "constants/react_query_keys";
import { CustomError, IPreference } from "interfaces/assessment";
import { useRouter } from "next/router";
import { getPreferences } from "services/assessment.services";
import { handleErrorPage } from "utils/error";
const usePreferenceData = () => {
  const router = useRouter();
  const {
    data: preferences,
    error,
  }: UseQueryResult<{ data: { data: IPreference[] } }, CustomError> = useQuery({
    queryKey: [PREFERENCE_KEY],
    queryFn: () => getPreferences(),
  });

  handleErrorPage(error, router);

  return {
    preferences: preferences?.data ? preferences?.data.data : null,
  };
};

export default usePreferenceData;
