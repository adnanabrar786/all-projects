import { Skeleton, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import BorderCard from "components/common/Card/BorderCard";
import IconText from "components/common/IconText";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import ClientGroupsDialog from "components/ui/ShareAssessment/ClientGroupsDialog";
import ClientTextField from "components/ui/ShareAssessment/ClientTextField";
import Header from "components/ui/ShareAssessment/Header";
import LaunchTextField from "components/ui/ShareAssessment/LaunchTextField";
import ShareCard from "components/ui/ShareAssessment/ShareCard";
import ShareFHADialog from "components/ui/ShareAssessment/ShareFHADialog";
import { shareFHA } from "constants/data";
import {
  RemoveClientIcon,
  RocketIcon,
  UserIcon,
} from "constants/images.routes";
import { useUserContext } from "context/user/UserContext";
import useAssessmentByIdData from "hooks/useAssessmentByIdData";
import { selectedClientsProps } from "interfaces/common";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { publishAssessment } from "services/assessment.services";
import { stripCharacters } from "utils/string";
import { toastSuccess } from "utils/toaster";

const ShareAssessment = () => {
  const { assessmentId }: { assessmentId: string } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [clientId, setClientId] = useState<string>("");
  const { assessment } = useAssessmentByIdData(assessmentId);

  const {
    selectedClients: selectedClientsOverview,
    selectedClient: selectedClientOverview,
  } = useUserContext();
  const [openClientGroup, setOpenClientGroup] = useState(false);
  const searchParams = useSearchParams();
  const isSelectedClientOverview = searchParams.get("client");
  const isSelectedClientsOverview = searchParams.get("clients");
  const [selectedClients, setSelectedClients] = useState<
    Array<selectedClientsProps>
  >([]);
  const [modalData, setModalData] = useState<{
    link: string;
    desc: string;
    component: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    clients: false,
    shareLink: false,
    embedLink: false,
  });

  const { clients, shareLink, embedLink } = formData;

  const handleRemoveClient = (index: number) => {
    let tempSelectedClients = [...selectedClients];
    tempSelectedClients.splice(index, 1);
    setSelectedClients(tempSelectedClients);
  };

  const mutation = useMutation({
    mutationFn: () => publishAssessment(assessmentId, selectedClients),
    onSuccess: async ({ data }) => {
      toastSuccess("Assessment has been sent");
    },
    onError: () => {},
  });

  const handleShareFHA = () => {
    if (!mutation.isLoading) {
      if (selectedClients.length === 0) {
        return toastSuccess("No clients selected");
      }
      mutation.mutate();
    }
  };

  useEffect(() => {
    if (
      selectedClientsOverview &&
      selectedClientsOverview.length > 0 &&
      isSelectedClientsOverview
    ) {
      const requiredSelectedClients = selectedClientsOverview.map(
        ({ email, id, first_name, last_name }) => {
          return {
            email: `${first_name} ${last_name}`,
            id: id,
            name: `${first_name} ${last_name}`,
          };
        }
      );
      setSelectedClients(requiredSelectedClients);
    }
  }, []);

  useEffect(() => {
    if (isSelectedClientOverview && selectedClientOverview) {
      setSelectedClients([
        {
          email: `${selectedClientOverview.first_name} ${selectedClientOverview.last_name}`,
          id: selectedClientOverview.id,
          name: `${selectedClientOverview.first_name} ${selectedClientOverview.last_name}`,
        },
      ]);
      setSearchValue(
        `${selectedClientOverview.first_name} ${selectedClientOverview.last_name}`
      );
      setClientId(selectedClientOverview.id);
    }
  }, []);

  return (
    <>
      <Stack sx={{ paddingX: "2rem", mb: "2rem" }}>
        <Header name={assessment ? stripCharacters(assessment.name) : ""} />

        <BorderCard
          sx={{
            marginTop: "3.31rem",
            padding: "1rem",
            borderColor: "var(--gray-300)",
          }}
        >
          {assessment ? (
            <TextMd
              text={`Select a method to share ${stripCharacters(
                assessment.name
              )}`}
              sx={{ fontWeight: "700", marginBottom: "2.25rem" }}
            />
          ) : (
            <Skeleton
              sx={{ width: "20rem", height: "1.7rem", marginBottom: "2.25rem" }}
            />
          )}

          <Stack sx={{ gap: "1.25rem" }}>
            {shareFHA.map((share, index) => (
              <Stack
                key={index}
                sx={{
                  border: "1px solid var(--gray-200)",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  alignItems: "flex-start",
                }}
              >
                <ShareCard
                  key={index}
                  icon={
                    <Image
                      priority
                      src={share.icon}
                      alt={"icon"}
                      width={24}
                      height={25}
                    />
                  }
                  primaryText={share.primaryText}
                  secText={share.secText}
                />

                {share.component === "launch" && (
                  <>
                    <LaunchTextField
                      setSelectedClients={setSelectedClients}
                      selectedClients={selectedClients}
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                      clientId={clientId}
                      setClientId={setClientId}
                    />
                  </>
                )}

                {share.component === "clients" && (
                  <>
                    <ClientTextField
                      setOpenClientGroup={setOpenClientGroup}
                      selectedClients={selectedClients}
                      setSelectedClients={setSelectedClients}
                      setClientId={setClientId}
                      setSearchValueLaunch={setSearchValue}
                    />
                    <Stack
                      direction={"row"}
                      sx={{ gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}
                    >
                      {selectedClients.map((selectedClient, index) => (
                        <Stack
                          key={index}
                          direction={"row"}
                          sx={{
                            alignItems: "center",
                            gap: "1.38rem",
                            backgroundColor: "var(--gray-100)",
                            borderRadius: "1rem",
                            padding: "0.125rem 0.375rem 0.125rem 0.5rem",
                            cursor: "pointer",
                          }}
                        >
                          <IconText
                            text={selectedClient.email}
                            icon={UserIcon}
                            iconWidth={12}
                            iconHeight={12}
                            sxText={{ fontSize: "0.75rem", fontWeight: "500" }}
                          />
                          <Image
                            onClick={() => handleRemoveClient(index)}
                            priority
                            src={RemoveClientIcon}
                            alt={"icon"}
                            width={12}
                            height={12}
                          />
                        </Stack>
                      ))}
                    </Stack>

                    {selectedClients.length > 0 && (
                      <FilledButton
                        onClick={handleShareFHA}
                        loading={mutation.isLoading}
                        startIcon={
                          <Image
                            priority
                            src={RocketIcon}
                            alt={"icon"}
                            width={19}
                            height={19}
                          />
                        }
                        sx={{ mt: "1rem" }}
                        text={"Send"}
                      />
                    )}
                  </>
                )}

                {["shareLink", "embedLink"].includes(share.component) && (
                  <>
                    <TextXs
                      text="Coming soon"
                      sx={{
                        ml: "2.5rem",
                        marginTop: "1rem",
                        color: "var(--gray-500)",
                      }}
                    />
                  </>
                )}
              </Stack>
            ))}
          </Stack>
        </BorderCard>
      </Stack>

      {modalData && (
        <ShareFHADialog modalData={modalData} setModalData={setModalData} />
      )}

      {openClientGroup && (
        <ClientGroupsDialog
          open={openClientGroup}
          setOpen={setOpenClientGroup}
          selectedClients={selectedClients}
          setSelectedClients={setSelectedClients}
        />
      )}
    </>
  );
};

export default ShareAssessment;
