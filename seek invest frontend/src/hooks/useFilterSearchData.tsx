import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const useFilterSearchData = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramSearchValue = searchParams.get("search");
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(paramSearchValue);

  useEffect(() => {
    if (!paramSearchValue) {
      setSearchValue("");
    }
  }, [paramSearchValue]);

  const handleFilterSearch = useDebouncedCallback((searchValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchValue) {
      params.set("search", searchValue);
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    } else {
      params.delete("search");
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, 300);

  return { handleFilterSearch, searchValue, setSearchValue };
};

export default useFilterSearchData;
