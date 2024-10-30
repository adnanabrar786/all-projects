import SearchTextField from "components/common/Input/SearchTextField";
import { SearchOutlinedIcon } from "constants/images.routes";
import { FHAS } from "constants/pages.routes";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((searchValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchValue) {
      params.set("search", searchValue);
      router.replace(`${pathname}?${params.toString()}`);
    } else {
      params.delete("search");
      router.replace(FHAS);
    }
  }, 300);

  return (
    <>
      <SearchTextField
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": { backgroundColor: "var(--gray-100)" },
        }}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Search FHA by name"
        defaultValue={searchParams.get("search")?.toString()}
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
      />
    </>
  );
};

export default Search;
