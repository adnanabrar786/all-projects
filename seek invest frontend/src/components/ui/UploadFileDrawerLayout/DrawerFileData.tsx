import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, ClickAwayListener, Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SaveAndCancelButton from "components/common/Button/SaveAndCancelButton";
import MenuCard from "components/common/Card/MenuCard";
import TextXs from "components/common/Text/TextXs";
import { clientUploadImageDrawerData } from "constants/data";
import { ChevronDownIcon } from "constants/images.routes";
import {
  CLIENT_ACCOUNTS_KEY,
  CLIENT_LIST_KEY,
  CLIENT_PROPOSAL_ACCOUNTS_KEY,
  CLIENTS_OVERVIEW_KEY,
  MODEL_PORTFOLIOS_KEY,
} from "constants/react_query_keys";
import { EClientAccount, MODEL_PORTFOLIO } from "enums/enums";
import { IBulkConfirm } from "interfaces/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { accountBulkUpload } from "services/accounts.services";
import { clientsBulkUpload } from "services/client.services";
import { toastError, toastSuccess } from "utils/toaster";

const { ACCOUNT, PROPOSAL_ACCOUNT } = EClientAccount;

interface Props {
  setOpenFileDialog: (openFileDialog: boolean) => void;
  columns: IBulkConfirm[];
  setProgressBar: (progressValue: number) => void;
  setImportFile: (importFile: File | null) => void;
  importFile: File | null;
  fetched: string;
  setCsvInfo?: (value: string) => void;
}

const DrawerFileData = ({
  setOpenFileDialog,
  columns,
  setProgressBar,
  setImportFile,
  importFile,
  fetched,
  setCsvInfo,
}: Props) => {
  const isClientAccounts = fetched === ACCOUNT;
  const isProposalAccounts = fetched === PROPOSAL_ACCOUNT;
  const isModel = fetched === MODEL_PORTFOLIO;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [columnsState, setColumnsState] = useState(columns);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    clientId,
    proposalId,
    modelId,
  }: { clientId: string; proposalId: string; modelId: string } = useParams();

  useEffect(() => {
    setColumnsState(columns);
  }, [columns]);

  const columnsValues = columns.map((column) => {
    return column.value;
  });

  const handleOpen = (id: number) => {
    setSelectedItemId(id);
    setShowDropdown(!showDropdown);
  };

  const handleSelectColumn = (
    columnIndex: number,
    selectedItemIndex: number
  ) => {
    let tempColumnsState = [...columnsState];
    tempColumnsState[selectedItemIndex].value = columnsValues[columnIndex];
    tempColumnsState[columnIndex].value = columnsValues[selectedItemIndex];
    setColumnsState(columns);
    setShowDropdown(false);
  };

  const handleImport = () => {
    if (!loading && !isModel) {
      return mutation.mutate();
    }

    if (isModel) {
      router.push("/review-models");
    }

    if (setCsvInfo) {
      setCsvInfo("");
    }
  };

  const mutation = useMutation({
    mutationFn: () => {
      if (isClientAccounts) {
        return accountBulkUpload(importFile, clientId);
      }

      return clientsBulkUpload(importFile, columnsState);
    },
    onSuccess: async () => {
      toastSuccess("Imported");
      queryClient.invalidateQueries([CLIENT_LIST_KEY]);
      queryClient.invalidateQueries([CLIENTS_OVERVIEW_KEY]);
      queryClient.invalidateQueries([CLIENT_ACCOUNTS_KEY, clientId]);
      queryClient.invalidateQueries([CLIENT_PROPOSAL_ACCOUNTS_KEY]);

      if (isModel) {
        queryClient.invalidateQueries([MODEL_PORTFOLIOS_KEY]);
        toastSuccess("Models added");
      }
      setOpenFileDialog(false);
      setLoading(false);
    },
    onError: (e: any) => {
      setLoading(false);
      toastError(e.message ?? "");
    },
  });

  return (
    <>
      <Stack sx={{ mt: "1rem" }}>
        <TextXs
          sx={{
            fontWeight: "700",
            lineHeight: "1.25rem",
          }}
          text="Configure Import Data"
        />
        <TextXs
          sx={{
            color: "var( --text-secondary)",
            lineHeight: "1.25rem",
          }}
          text="Match and confirm the respective fields to the column titles in your file"
        />
      </Stack>

      <Stack>
        {columnsState.map((item, index) => (
          <Stack
            key={index}
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              border: "1px solid var(--gray-500)",
              padding: "0.5rem 0.78rem 0.25rem 0.78rem",
              borderTopLeftRadius: index === 0 ? "0.5rem" : "0rem",
              borderTopRightRadius: index === 0 ? "0.5rem" : "0rem",
              borderBottomLeftRadius:
                index === clientUploadImageDrawerData.length - 1
                  ? "0.5rem"
                  : "0rem",
              borderBottomRightRadius:
                index === clientUploadImageDrawerData.length - 1
                  ? "0.5rem"
                  : "0rem",
            }}
          >
            <Stack>
              <TextXs
                sx={{
                  lineHeight: "1.25rem",
                }}
                text={item.title}
              />
            </Stack>
            <Stack>
              <Stack
                sx={{
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <Stack
                  onClick={() => handleOpen(index)}
                  direction={"row"}
                  sx={{
                    alignItems: "center",
                    width: "175px",
                    justifyContent: "space-between",
                    backgroundColor: "var(--gray-100)",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.8125rem",
                      fontStyle: "normal",
                      lineHeight: "1.25rem",
                      fontWeight: "400",
                      color: "var(--text-primary)",
                    }}
                  >
                    {item.value}
                  </Typography>
                  {showDropdown && selectedItemId === index ? (
                    <KeyboardArrowUpIcon
                      sx={{
                        width: "16px",
                        height: "16px",
                      }}
                    />
                  ) : (
                    <Image
                      priority
                      src={ChevronDownIcon}
                      alt={"icon"}
                      width={16}
                      height={16}
                    />
                  )}
                </Stack>

                {showDropdown && selectedItemId === index ? (
                  <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
                    <Box>
                      <MenuCard
                        sx={{
                          width: "175px",
                          right: 0,
                          top: 29,
                          padding: "0.25rem 0.5rem",
                          zIndex: "100",
                        }}
                      >
                        {columnsValues.map((listData, columnIndex) => (
                          <Stack
                            key={listData}
                            sx={{
                              gap: "0.25rem",
                              zIndex: "100",
                            }}
                            onClick={() =>
                              handleSelectColumn(columnIndex, index)
                            }
                          >
                            <TextXs
                              sx={{
                                lineHeight: "1.25rem",
                              }}
                              text={listData}
                            />
                          </Stack>
                        ))}
                      </MenuCard>
                    </Box>
                  </ClickAwayListener>
                ) : null}
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <SaveAndCancelButton
        loading={loading}
        onClickSave={handleImport}
        onClickCancel={() => {
          setImportFile(null);
          setProgressBar(0);
          setOpenFileDialog(false);
          if (setCsvInfo) {
            setCsvInfo("");
          }
        }}
        sx={{
          flexDirection: "row-reverse",
          marginTop: "2rem",
        }}
        save="Import"
        cancel="Cancel"
      />
    </>
  );
};

export default DrawerFileData;
