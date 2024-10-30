import { Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import SearchResultTextField from "components/common/Input/SearchResultTextField";
import TextXs from "components/common/Text/TextXs";
import UserSearchResult from "components/common/UserSearchResult";
import { EClientAccount } from "enums/enums";
import useSearchClientDebounce from "hooks/useSearchClientDebounce";
import { IClient } from "interfaces/client";
import { selectedClientsProps } from "interfaces/common";
import { useParams } from "next/navigation";
import { useState } from "react";
import { launchFHA, publishAssessment } from "services/assessment.services";
import { arrayContainObject } from "utils/array";
import { toastSuccess } from "utils/toaster";

const { ACCOUNT } = EClientAccount;

interface Props {
  searchValue: string;
  setSelectedClients?: (selectedClients: selectedClientsProps[]) => void;
  setSearchValue: (value: string) => void;
  clientId: string;
  setClientId: (value: string) => void;
  selectedClients?: selectedClientsProps[];
  sendEmail?: boolean;
  clientAssessment?: boolean;
  clientAssessmentId?: string;
  onSuccessApi?: () => void;
  setIsDisabled?: (value: boolean) => void;
  from?: string;
}

const LaunchTextField = ({
  setSelectedClients,
  searchValue,
  setSearchValue,
  clientId,
  setClientId,
  selectedClients,
  onSuccessApi,
  clientAssessment,
  clientAssessmentId,
  sendEmail,
  setIsDisabled,
  from,
}: Props) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<IClient[]>([]);
  const queryClient = useQueryClient();

  const { assessmentId }: { assessmentId: string } = useParams();
  const { handleSearching } = useSearchClientDebounce(
    searchValue,
    setIsTyping,
    setSearchResult
  );

  const mutation = useMutation({
    mutationFn: () => {
      return sendEmail
        ? publishAssessment(clientAssessmentId ?? "", [
            { name: "", id: clientId, email: "" },
          ])
        : launchFHA(clientId, assessmentId ?? clientAssessmentId);
    },

    onSuccess: async () => {
      if (onSuccessApi) {
        onSuccessApi();
      }

      if (from === ACCOUNT) {
        queryClient.invalidateQueries(["client-account-overview"]);
      }

      if (sendEmail) {
        toastSuccess("Assessment has been sent");
      }

      if (setIsDisabled) {
        setIsDisabled(false);
      }
    },
    onError: () => {
      if (setIsDisabled) {
        setIsDisabled(false);
      }
    },
  });

  const handleClickLaunch = () => {
    if (!mutation.isLoading) {
      if (setIsDisabled) {
        setIsDisabled(true);
      }
      mutation.mutate();
    }
  };

  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "flex-start",
        gap: "1rem",
        marginTop: "0.75rem",
      }}
    >
      <SearchResultTextField
        readOnly={clientAssessment}
        placeholder="Enter Client Name"
        searchValue={searchValue}
        setIsTyping={setIsTyping}
        setSearchValue={setSearchValue}
        handleSearching={handleSearching}
        sxResult={{ position: "initial", mt: "0.25rem", overflow: "hidden" }}
        hideIconStartIcon
        hideSearchResult
        sx={{ minWidth: "20rem" }}
      >
        {isTyping ? (
          <TextXs
            text="Searching..."
            sx={{ p: "0.5rem 0.75rem", mt: "0.25rem" }}
          />
        ) : searchResult.length > 0 ? (
          searchResult.map((result, index: number) => (
            <UserSearchResult
              key={index}
              primaryText={`${result.first_name} ${result.last_name}`}
              onClickBox={() => {
                setSearchValue(`${result.first_name} ${result.last_name}`);
                setClientId(result.id);
                if (setSelectedClients && selectedClients) {
                  const client = {
                    email: `${result.first_name} ${result.last_name}`,
                    id: result.id,
                    name: `${result.first_name} ${result.last_name}`,
                  };
                  if (!arrayContainObject(selectedClients, client, "id")) {
                    setSelectedClients([...selectedClients, client]);
                  }
                }
              }}
            />
          ))
        ) : (
          <TextXs text="Not Result Found" sx={{ p: "0.5rem", mt: "0.25rem" }} />
        )}
      </SearchResultTextField>

      <FilledButton
        onClick={handleClickLaunch}
        disabled={!clientId}
        secondary={clientAssessment ? false : true}
        text={sendEmail ? "Send" : "Launch"}
        loading={mutation.isLoading}
      />
    </Stack>
  );
};

export default LaunchTextField;
