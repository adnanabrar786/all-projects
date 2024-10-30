import { Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import SearchResultTextField from "components/common/Input/SearchResultTextField";
import TextXs from "components/common/Text/TextXs";
import UserSearchResult from "components/common/UserSearchResult";
import useSearchClientDebounce from "hooks/useSearchClientDebounce";
import { IClient } from "interfaces/client";
import { selectedClientsProps } from "interfaces/common";
import { useState } from "react";
import { arrayContainObject } from "utils/array";

interface Props {
  setSearchValueLaunch: (value: string) => void;
  setOpenClientGroup: (open: boolean) => void;
  selectedClients: selectedClientsProps[];
  setSelectedClients: (selectedClients: selectedClientsProps[]) => void;
  setClientId: (value: string) => void;
}

const ClientTextField = ({
  setOpenClientGroup,
  selectedClients,
  setSelectedClients,
  setClientId,
  setSearchValueLaunch,
}: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<IClient[]>([]);

  const { handleSearching } = useSearchClientDebounce(
    searchValue,
    setIsTyping,
    setSearchResult
  );

  const handleClientClick = (client: selectedClientsProps) => {
    if (selectedClients.includes(client)) {
      setSelectedClients(
        selectedClients.filter((selectedClient) => {
          return selectedClient !== client;
        })
      );
    } else {
      //@ts-ignore
      setSelectedClients((old: selectedClientsProps) => [...old, client]);
    }
  };

  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "flex-start",
        gap: "1rem",
        marginTop: "1.38rem",
      }}
    >
      <SearchResultTextField
        placeholder="Enter Client or Prospect Name"
        searchValue={searchValue}
        setIsTyping={setIsTyping}
        setSearchValue={setSearchValue}
        handleSearching={handleSearching}
        sx={{ minWidth: "17rem" }}
        sxResult={{ position: "initial", mt: "0.25rem", overflow: "hidden" }}
        hideIconStartIcon
      >
        {isTyping ? (
          <TextXs text="Searching..." sx={{ p: "0.5rem", mt: "0.25rem" }} />
        ) : searchResult.length > 0 ? (
          searchResult.map((result, index: number) => (
            <UserSearchResult
              key={index}
              primaryText={`${result.first_name} ${result.last_name}`}
              onClickBox={() => {
                setSearchValue("");
                const client = {
                  email: `${result.first_name} ${result.last_name}`,
                  id: result.id,
                  name: `${result.first_name} ${result.last_name}`,
                };
                setSearchValueLaunch(
                  `${result.first_name} ${result.last_name}`
                );
                setClientId(client.id);
                if (!arrayContainObject(selectedClients, client, "id")) {
                  handleClientClick(client);
                }
              }}
            />
          ))
        ) : (
          <TextXs text="Not Result Found" sx={{ p: "0.5rem", mt: "0.25rem" }} />
        )}
      </SearchResultTextField>

      <TextXs
        text="OR"
        sx={{ fontSize: "0.75rem", fontWeight: "600", mt: "0.8rem" }}
      />

      <FilledButton
        disabled
        secondary
        text="Browse clients or prospects"
        onClick={() => setOpenClientGroup(true)}
      />
    </Stack>
  );
};

export default ClientTextField;
