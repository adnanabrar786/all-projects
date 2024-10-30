import { ClickAwayListener, Stack, SxProps } from "@mui/material";
import LabelTopTextField from "components/common/Input/LabelTopTextField";
import { SearchOutlinedIcon } from "constants/images.routes";
import Image from "next/image";
import { ReactNode, useState } from "react";

interface Props {
  placeholder: string;
  children: ReactNode;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  setIsTyping: (isTyping: boolean) => void;
  sx?: SxProps;
  sxResult?: SxProps;
  handleSearching: () => void;
  hideIconStartIcon?: boolean;
  hideSearchResult?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  onClickAway?: (event: MouseEvent | TouchEvent) => void;
}

const SearchResultTextField = ({
  placeholder,
  children,
  searchValue,
  setIsTyping,
  setSearchValue,
  sx,
  sxResult,
  handleSearching,
  hideIconStartIcon,
  hideSearchResult,
  autoFocus,
  onClickAway,
  readOnly,
}: Props) => {
  const [openSearchResult, setOpenSearchResult] = useState(false);

  return (
    <ClickAwayListener
      onClickAway={(e) => {
        setOpenSearchResult(false);
        if (onClickAway) {
          onClickAway(e);
        }
      }}
    >
      <Stack sx={{ position: "relative", ...sx }}>
        <LabelTopTextField
          sx={{
            "& .MuiInputBase-input": {
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
          readOnly={readOnly}
          autoFocus={autoFocus}
          label=""
          name=""
          value={searchValue}
          onFocus={() => {
            if (searchValue) {
              setOpenSearchResult(true);
            }
          }}
          onChange={(e) => {
            setOpenSearchResult(true);
            setIsTyping(true);
            handleSearching();
            setSearchValue(e.target.value);
          }}
          startIcon={
            !hideIconStartIcon && (
              <Image
                className="searchIcon"
                priority
                src={SearchOutlinedIcon}
                alt={"icon"}
                width={20}
                height={20}
              />
            )
          }
          placeholder={placeholder}
        />

        {searchValue && openSearchResult && !readOnly && (
          <Stack
            className="displayScrollBar"
            onClick={() => {
              if (hideSearchResult) {
                setOpenSearchResult(false);
              }
            }}
            sx={{
              borderRadius: "0.5rem",
              border: "1px solid var(--gray-300)",
              minHeight: "2.75rem",
              position: "absolute",
              top: "2.7rem",
              background: "white",
              cursor: "pointer",
              flexWrap: "wrap",
              gap: "0.25rem",
              zIndex: "10000",
              ...sxResult,
            }}
          >
            {children}
          </Stack>
        )}
      </Stack>
    </ClickAwayListener>
  );
};

export default SearchResultTextField;
