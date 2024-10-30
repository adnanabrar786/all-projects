import SearchTextField from "components/common/Input/SearchTextField";
import { LoadingDarkIcon, SearchOutlinedIcon } from "constants/images.routes";
import Image from "next/image";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  placeholder?: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  setHouseholdPage: (value: number) => void;
}

const SearchHousehold = ({
  placeholder,
  searchValue,
  setSearchValue,
  setHouseholdPage,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterSearch = useDebouncedCallback((searchValue: string) => {
    setIsLoading(false);
    setHouseholdPage(1);
    setSearchValue(searchValue);
  }, 300);

  return (
    <SearchTextField
      onChange={(e) => {
        setIsLoading(true);
        handleFilterSearch(e.target.value);
      }}
      defaultValue={searchValue || ""}
      placeholder={placeholder || "Search"}
      startIcon={
        <Image
          className="searchIcon"
          priority
          src={SearchOutlinedIcon}
          alt={"icon"}
          width={20}
          height={20}
        />
      }
      endIcon={
        isLoading && (
          <Image
            className={"rotating"}
            priority
            src={LoadingDarkIcon}
            alt={"icon"}
            width={18}
            height={18}
          />
        )
      }
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "white",
        },
      }}
    />
  );
};

export default SearchHousehold;
