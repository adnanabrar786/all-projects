import { Drawer, Stack } from "@mui/material";
import TextButton from "components/common/Button/TextButton";
import SearchResultTextField from "components/common/Input/SearchResultTextField";
import TextXs from "components/common/Text/TextXs";
import { IClient, IHouseholdClient } from "interfaces/client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { searchClientByName } from "services/user.services";

import TextMd from "components/common/Text/TextMd";
import CustomToaster from "components/common/Toaster/CustomToaster";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  openAddClient: boolean;
  setOpenAddClient: (openAddClient: boolean) => void;
}

const SearchProposal = ({ openAddClient, setOpenAddClient }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchResult, setSearchResult] = useState<IClient[]>([]);
  const [householdClients, setHouseholdClients] = useState<IHouseholdClient[]>(
    []
  );
  const { type }: { type: string } = useParams();

  const handleSearching = useDebouncedCallback(async () => {
    const { data } = await searchClientByName(searchValue);
    const searchParams = new URLSearchParams();

    setIsTyping(false);

    if (data) {
      setSearchResult(data.data);
    }
  }, 500);

  const handleAddToHousehold = () => {};

  return (
    <Drawer
      anchor={"right"}
      open={openAddClient}
      onClose={() => setOpenAddClient(false)}
    >
      <Stack
        sx={{ padding: "2rem 2rem 0rem 2rem", gap: "0.5rem", width: "789px" }}
      >
        <Stack
          direction={"row"}
          sx={{
            gap: "0.8rem",
            justifyContent: "space-between",
          }}
        >
          <TextMd
            sx={{
              lineHeight: "1.25rem",
              fontWeight: "700",
            }}
            text="Add existing clients to this household"
          />

          <TextXs
            sx={{
              lineHeight: "1.25rem",
              fontWeight: "500",
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
            onClick={() => setOpenAddClient(false)}
            text="Cancel"
          />
        </Stack>

        <SearchResultTextField
          placeholder="Search for existing client"
          searchValue={searchValue}
          setIsTyping={setIsTyping}
          setSearchValue={setSearchValue}
          handleSearching={handleSearching}
          sx={{ marginTop: "2rem", width: "85%" }}
          sxResult={{ position: "initial", mt: "0.25rem" }}
        >
          {isTyping ? (
            <TextXs text="Searching..." sx={{ p: "1rem" }} />
          ) : searchResult.length > 0 ? (
            searchResult.map((result, index: number) => (
              <Stack
                key={index}
                direction={"row"}
                sx={{
                  justifyContent: "space-between",
                  margin: "0.75rem 0.5rem",
                  gap: "1.5rem",
                  alignItems: "center",
                }}
              >
                <TextXs
                  sx={{
                    lineHeight: "1.25rem",
                  }}
                  text={`${result.first_name} ${result.last_name}`}
                />
                <TextButton
                  disabled={result.linked}
                  onClick={() => {
                    setHouseholdClients((old) => [
                      ...old,
                      {
                        client_id: result.id,
                        head_of_house: householdClients.length === 0,
                        household_relationship_id: 1,
                        clientName: `${result.first_name} ${result.last_name}`,
                      },
                    ]);

                    setSearchValue("");
                  }}
                  text="Add"
                  sx={{
                    color: "var(--primary)",
                    fontWeight: "500",
                    lineHeight: "1.25rem",
                  }}
                />
              </Stack>
            ))
          ) : (
            <TextXs text="Not Result Found" sx={{ p: "1rem" }} />
          )}
        </SearchResultTextField>
      </Stack>
      <CustomToaster />
    </Drawer>
  );
};

export default SearchProposal;
