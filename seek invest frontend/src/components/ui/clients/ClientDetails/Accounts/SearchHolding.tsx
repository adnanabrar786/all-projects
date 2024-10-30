import { Stack, SxProps } from "@mui/material";
import Chip from "components/common/Chip/Chip";
import SearchResultTextField from "components/common/Input/SearchResultTextField";
import TextXs from "components/common/Text/TextXs";
import { ETickerType } from "enums/assessment";
import useSearchFundSecuritiesAviDebounce from "hooks/useSearchFundSecuritiesAviDebounce";
import { ISecuritiesDetail } from "interfaces/client";
import { useEffect, useState } from "react";

const { FUND } = ETickerType;
interface Props {
  handleClickHolding: (clickHolding: any) => void;
  setAddHolding: (value: boolean) => void;
  sx?: SxProps;
  sxList?: SxProps;
  sxResult?: SxProps;
  placeholder?: string;
  fundTicker?: boolean;
  modelTickers?: any;
}

const SearchHolding = ({
  handleClickHolding,
  setAddHolding,
  sxList,
  sxResult,
  sx,
  placeholder = "Enter ticker or description to add company or fund",
  fundTicker,
  modelTickers,
}: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFundEmpty, setIsFundEmpty] = useState(false);
  const [searchResult, setSearchResult] = useState<ISecuritiesDetail[]>([]);

  const { handleSearching } = useSearchFundSecuritiesAviDebounce({
    searchValue,
    setIsTyping,
    setSearchResult,
    fundTicker,
  });

  useEffect(() => {
    if (fundTicker && !isTyping) {
      if (!searchResult.length) {
        setIsFundEmpty(true);
      }
    }
  }, [searchResult, searchValue]);

  return (
    <SearchResultTextField
      hideSearchResult
      placeholder={placeholder}
      searchValue={searchValue}
      setIsTyping={setIsTyping}
      setSearchValue={setSearchValue}
      handleSearching={() => {
        handleSearching();
        setIsFundEmpty(false);
      }}
      onClickAway={() => {
        if (!searchValue) {
          setAddHolding(false);
        }
      }}
      sx={{ mb: "2rem", ...sx }}
      sxResult={{ position: "initial", mt: "0.25rem", ...sxResult }}
    >
      {!isTyping && searchResult.length > 0 ? (
        searchResult?.map(({ name, type, ticker }, index) => {
          return (
            <>
              <Stack
                key={index}
                onClick={() => {
                  handleClickHolding({ name, ticker });
                  setAddHolding(false);
                  if (
                    modelTickers &&
                    modelTickers.find((row) => row.ticker === ticker)
                  ) {
                    setSearchValue(ticker);
                  } else {
                    setSearchValue(fundTicker ? name : "");
                  }
                }}
                direction={"row"}
                sx={{
                  display:
                    (fundTicker && type === FUND) || !fundTicker
                      ? "flex"
                      : "none",
                  alignItems: "center",
                  padding: "1rem",
                  justifyContent: "space-between",
                  ...sxList,
                }}
              >
                <Stack direction={"row"} sx={{ gap: "0.62rem" }}>
                  <TextXs text={ticker} sx={{ fontWeight: "600" }} />
                  <TextXs text={name} />
                </Stack>

                <Chip
                  text={type}
                  sx={{
                    textTransform: "capitalize",
                    backgroundColor:
                      type === "company"
                        ? "var(--lavender-blush)"
                        : "var(--magnolia)",
                    color:
                      type === "company"
                        ? "var(--magenta-dye)"
                        : "var(--han-purple)",
                  }}
                />
              </Stack>
            </>
          );
        })
      ) : (
        <TextXs
          text={!isFundEmpty ? "Searching..." : "Not found"}
          sx={{
            padding: "1rem",
            color: "var(--text-secondary)",
          }}
        />
      )}
    </SearchResultTextField>
  );
};

export default SearchHolding;
