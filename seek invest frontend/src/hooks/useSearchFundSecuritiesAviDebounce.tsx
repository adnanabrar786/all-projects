import { ETickerType } from "enums/assessment";
import { ISecuritiesDetail } from "interfaces/client";
import { getSecuritiesAvi } from "services/client.services";
import { useDebouncedCallback } from "use-debounce";
import { toastError } from "utils/toaster";

const { FUND } = ETickerType;

interface Params {
  searchValue: string;
  setIsTyping: (isTyping: boolean) => void;
  setSearchResult: (searchResult: ISecuritiesDetail[]) => void;
  fundTicker?: boolean;
}

const useSearchFundSecuritiesAviDebounce = ({
  searchValue,
  setIsTyping,
  setSearchResult,
  fundTicker,
}: Params) => {
  const handleSearching = useDebouncedCallback(async () => {
    try {
      const { data } = await getSecuritiesAvi(searchValue);

      setIsTyping(false);

      if (data) {
        setSearchResult(
          fundTicker ? data.filter((i) => i.type === FUND) : data
        );
      } else {
        setSearchResult([]);
      }
    } catch (error: any) {
      setIsTyping(false);
      toastError(error?.message);
    }
  }, 1000);

  return { handleSearching };
};

export default useSearchFundSecuritiesAviDebounce;
