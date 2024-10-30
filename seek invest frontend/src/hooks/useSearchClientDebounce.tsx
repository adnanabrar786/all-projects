import { IClient } from "interfaces/client";
import { searchClientByName } from "services/user.services";
import { useDebouncedCallback } from "use-debounce";

const useSearchClientDebounce = (
  searchValue: string,
  setIsTyping: (isTyping: boolean) => void,
  setSearchResult: (searchResult: IClient[]) => void
) => {
  const handleSearching = useDebouncedCallback(async () => {
    const { data } = await searchClientByName(searchValue);

    setIsTyping(false);

    if (data) {
      setSearchResult(data.data);
    }
  }, 500);

  return { handleSearching };
};

export default useSearchClientDebounce;
