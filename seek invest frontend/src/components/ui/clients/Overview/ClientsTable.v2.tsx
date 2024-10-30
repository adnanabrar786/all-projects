import { Checkbox, FormControlLabel, Grid, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import IconText from "components/common/IconText";
import { CustomPagination } from "components/common/Pagination/CustomPagination";
import TextLg from "components/common/Text/TextLg";
import TextXs from "components/common/Text/TextXs";
import ClientsOverviewSkeleton from "components/ui/clients/ClientDetails/Sekeleton/ClientsOverviewSkeleton";
import ClientRow from "components/ui/clients/Overview/ClientRow.v2";
import {
  ArchiveIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  LoadingDarkIcon,
  MinusCheckboxIcon,
  RemoveClientIcon,
  SendPrimaryIcon,
  UnCheckboxIcon,
} from "constants/images.routes";
import {
  CLIENT_LIST_KEY,
  CLIENTS_OVERVIEW_KEY,
} from "constants/react_query_keys";
import { useUserContext } from "context/user/UserContext";
import useDefaultAssessmentData from "hooks/useDefaultAssessmentData";
import { IClient } from "interfaces/client";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { archiveClients } from "services/client.services";
import { getDefaultAssessmentsLink } from "utils/assessments";
import { toastSuccess } from "utils/toaster";

interface Props {
  clientsList: IClient[] | null;
  isFetched: boolean;
  hidePagination?: boolean;
  totalPage?: number;
  pageNo?: number;
  setPageNo?: Dispatch<SetStateAction<number>>;
}

const ClientsTable = ({
  clientsList,
  isFetched,
  hidePagination,
  totalPage,
  pageNo,
  setPageNo,
}: Props) => {
  const { selectedClients, setSelectedClients } = useUserContext();
  const [isSendAssessment, setIsSendAssessment] = useState(false);
  const { defaultAssessment } = useDefaultAssessmentData();
  const queryClient = useQueryClient();

  const handleNext = () => setPageNo && setPageNo((prev: number) => prev + 1);
  const handlePrevious = () =>
    setPageNo && setPageNo((prev: number) => prev - 1);

  const handlePageChange = (_: any, value: SetStateAction<number>) => {
    setPageNo && setPageNo(value);
  };

  const handleDeselectAll = () => {
    setSelectedClients([]);
  };

  const selectedActions = [
    {
      title: "Send Assessment",
      icon: SendPrimaryIcon,
    },
    {
      title: "Archive Clients",
      icon: ArchiveIcon,
    },
  ];

  const { riskAssessmentLink, valuesDeterminationLink } =
    getDefaultAssessmentsLink(defaultAssessment ?? []);

  const assessmentTypes = [
    {
      title: "Values Assessment",
      link: valuesDeterminationLink,
    },
    {
      title: "Risk Assessment",
      link: riskAssessmentLink,
    },
  ];

  useEffect(() => {
    if (selectedClients && selectedClients.length === 0) {
      setIsSendAssessment(false);
    }
  }, [selectedClients]);

  const archiveClientsMutation = useMutation({
    mutationFn: () => {
      const clientIds = selectedClients?.map(
        (selectedClient) => selectedClient.id
      );

      return archiveClients(clientIds);
    },
    onSuccess: async ({ data }) => {
      if (data && data.meta.current_page) {
        toastSuccess("Clients Deleted");
        setSelectedClients([]);
        if (setPageNo) setPageNo(data.meta.current_page);
        queryClient.invalidateQueries([CLIENT_LIST_KEY]);
        queryClient.invalidateQueries([CLIENTS_OVERVIEW_KEY]);
      }
    },
  });

  return (
    <Stack>
      {selectedClients && selectedClients.length > 0 && (
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "var(--gray-100)",
            padding: "0.75rem",
            borderRadius: "0.5rem",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              gap: "1.38rem",
              backgroundColor: "var(--gray-100)",
              mixBlendMode: "multiply",
              borderRadius: "1rem",
              padding: "0.125rem 0.375rem 0.125rem 0.5rem",
              cursor: "pointer",
            }}
          >
            <TextXs
              text={`${selectedClients.length} Selected`}
              sx={{ fontWeight: "500" }}
            />
            <Image
              onClick={() => {
                setIsSendAssessment(false);
                handleDeselectAll();
              }}
              priority
              src={RemoveClientIcon}
              alt={"icon"}
              width={12}
              height={12}
            />
          </Stack>

          {!isSendAssessment && (
            <Stack direction={"row"} sx={{ gap: "1.5rem" }}>
              {selectedActions.map((selectedAction) => (
                <Stack
                  key={selectedAction.title}
                  direction={"row"}
                  sx={{ gap: "0.5rem", alignItems: "center" }}
                >
                  <IconText
                    onClick={() => {
                      if (selectedAction.title === "Send Assessment") {
                        setIsSendAssessment(true);
                      } else if (
                        selectedAction.title === "Archive Clients" &&
                        !archiveClientsMutation.isLoading
                      ) {
                        archiveClientsMutation.mutate();
                      }
                    }}
                    text={selectedAction.title}
                    icon={selectedAction.icon}
                    iconWidth={16}
                    iconHeight={16}
                    sxRow={{ cursor: "pointer" }}
                    sxText={{ color: "var(--primary)" }}
                  />

                  {archiveClientsMutation.isLoading &&
                    selectedAction.title === "Archive Clients" && (
                      <Image
                        className={"rotating"}
                        priority
                        src={LoadingDarkIcon}
                        alt={"icon"}
                        width={18}
                        height={18}
                      />
                    )}
                </Stack>
              ))}
            </Stack>
          )}

          {isSendAssessment && (
            <Stack direction={"row"} sx={{ gap: "1.5rem" }}>
              <TextXs
                text="Select Assessment Type:"
                sx={{ fontWeight: "500" }}
              />
              <Stack direction={"row"} sx={{ gap: "1.5rem" }}>
                {assessmentTypes.map((assessmentType, index) => (
                  <Link
                    key={index}
                    href={`${assessmentType.link}?clients=true`}
                  >
                    <TextXs
                      onClick={() => {}}
                      text={assessmentType.title}
                      sx={{
                        cursor: "pointer",
                        color: "var(--primary)",
                        fontWeight: "500",
                      }}
                    />
                  </Link>
                ))}
              </Stack>
            </Stack>
          )}
        </Stack>
      )}

      <Grid
        container
        sx={{
          alignItems: "center",
          padding: "0.25rem 1rem",
          borderBottom: "2px solid black",
          ".MuiGrid-item": {
            color: "var(--text-secondary)",
            borderWidth: "2px",
            borderColor: "var(--text-primary)",
            fontWeight: "500",
            fontSize: "0.75rem",
            lineHeight: "1.125rem",
          },
        }}
      >
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                onClick={() => {
                  if (selectedClients && selectedClients.length > 0) {
                    handleDeselectAll();
                  } else {
                    setSelectedClients(clientsList);
                  }
                }}
                value={Boolean(selectedClients && selectedClients.length > 0)}
                checked={Boolean(selectedClients && selectedClients.length > 0)}
                icon={
                  <Image
                    priority
                    src={UnCheckboxIcon}
                    alt={"icon"}
                    width={20}
                    height={20}
                  />
                }
                checkedIcon={
                  <Image
                    priority
                    src={MinusCheckboxIcon}
                    alt={"icon"}
                    width={20}
                    height={20}
                  />
                }
              />
            }
            label={
              <TextXs
                text="Client"
                sx={{
                  ml: "1rem",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                  color: "var(--text-secondary)",
                }}
              />
            }
          />
        </Grid>

        <Grid item xs={2}>
          Total Account Value
        </Grid>

        <Grid item xs={2}>
          Risk Persona
        </Grid>

        <Grid item xs={3.5}>
          Key Values
        </Grid>
        <Grid item xs={1.5}></Grid>
      </Grid>

      {clientsList ? (
        clientsList.map((client, index) => (
          <ClientRow key={index} client={client} />
        ))
      ) : (
        <ClientsOverviewSkeleton />
      )}

      {!hidePagination && clientsList?.length === 0 && isFetched && (
        <TextLg
          text="No Clients"
          sx={{
            fontWeight: "400",
            textAlign: "center",
            padding: "1rem",
          }}
        />
      )}

      {!hidePagination && clientsList && clientsList.length > 0 && (
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mt: "0.2rem",
          }}
        >
          <FilledButton
            disabled={pageNo == 1 ? true : false}
            onClick={handlePrevious}
            sx={{ height: "2rem" }}
            secondary
            text="Previous"
            startIcon={
              <Image
                className="searchIcon"
                priority
                src={ArrowLeftIcon}
                alt={"icon"}
                width={20}
                height={20}
                style={{ opacity: 0.5 }}
              />
            }
          />
          <CustomPagination
            hidePrevButton
            hideNextButton
            onChange={handlePageChange}
            page={pageNo}
            count={totalPage}
          />
          <FilledButton
            disabled={pageNo == totalPage ? true : false}
            sx={{ height: "2rem" }}
            onClick={handleNext}
            secondary
            text="Next"
            endIcon={
              <Image
                className="searchIcon"
                priority
                src={ArrowRightIcon}
                alt={"icon"}
                width={20}
                height={20}
                style={{ opacity: 0.5 }}
              />
            }
          />
        </Stack>
      )}
    </Stack>
  );
};

export default ClientsTable;
