import { Stack } from "@mui/material";
import SearchResultTextField from "components/common/Input/SearchResultTextField";
import SearchResult from "components/common/SearchResult";
import TextLg from "components/common/Text/TextLg";
import TextXs from "components/common/Text/TextXs";
import ClientDrawer from "components/ui/clients/ClientDrawer/ClientDrawer";
import { CLIENTS_DETAILS } from "constants/pages.routes";
import { IClient } from "interfaces/client";
import Link from "next/link";
import { useState } from "react";
import { searchClientByName } from "services/user.services";
import { useDebouncedCallback } from "use-debounce";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchResult, setSearchResult] = useState<IClient[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<IClient | undefined>(
    undefined
  );

  const handleSearching = useDebouncedCallback(async () => {
    if (searchValue) {
      const { data } = await searchClientByName(searchValue);

      if (data) {
        setSearchResult(data.data);
      }
    }

    setIsTyping(false);
  }, 500);

  return (
    <Stack
      sx={{
        alignItems: "center",
        minHeight: "100vh",
        marginTop: "12rem",
      }}
    >
      <TextLg text="Create and send a proposal to your clients" />
      <TextXs text="Show them how their financial portfolio can align with their values and risk profiles" />

      <SearchResultTextField
        placeholder="Enter client name or email"
        searchValue={searchValue}
        setIsTyping={setIsTyping}
        setSearchValue={setSearchValue}
        handleSearching={handleSearching}
        sx={{
          marginTop: "2rem",
          width: "620px",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "var(--primary-300) !important",
              boxShadow: "0px 0px 0px 4px var(--primary-100) !important",
            },
          },
        }}
        sxResult={{
          mt: "0.25rem",
          left: "0",
          right: "0",
          zIndex: "0",
          padding: "0.2rem 0.5rem",
          justifyContent: "center",
        }}
      >
        {isTyping ? (
          <TextXs text="Searching..." />
        ) : searchResult.length > 0 ? (
          searchResult.map((result, index: number) => (
            <Link
              key={index}
              href={`${CLIENTS_DETAILS}/${result.id}/proposals`}
            >
              <SearchResult
                text={`${result.first_name} ${result.last_name}`}
                actionText="Client"
                onClickResult={() => {}}
                chip
                highlightTerm={searchValue}
                boldText={true}
              />
            </Link>
          ))
        ) : (
          <SearchResult
            text="Not an existing client. Add as client?"
            actionText="Add client"
            sx={{
              margin: "0rem",
            }}
            onClick={() => {
              setOpenDialog(true);
              //@ts-ignore
              setSelectedClient({
                first_name: searchValue.split(" ")[0],
                last_name: searchValue.split(" ")[1],
              });
            }}
          />
        )}
      </SearchResultTextField>

      <ClientDrawer
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        isNew
      />
    </Stack>
  );
};

export default Home;
