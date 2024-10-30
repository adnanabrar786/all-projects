import {
  Box,
  ClickAwayListener,
  Grid,
  ListItemButton,
  Stack,
} from "@mui/material";
import { usePDF } from "@react-pdf/renderer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import MenuCard from "components/common/Card/MenuCard";
import Chip from "components/common/Chip/Chip";
import IconText from "components/common/IconText";
import EditTextField from "components/common/Input/EditTextField";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import AccountPDF from "components/ui/clients/ClientDetails/Accounts/AccountPDF";
import { COPY_TO_JSON } from "constants/environment";
import {
  ChevronRightIcon,
  CopyIcon,
  CrossRedRoundIcon,
  DotsVerticalIcon,
  ExportPDFIcon,
  LoadingDarkIcon,
  RefreshLargeIcon,
} from "constants/images.routes";
import {
  CLIENT_ACCOUNT_COUNT_KEY,
  CLIENT_ACCOUNTS_KEY,
} from "constants/react_query_keys";
import { EClientAccount } from "enums/enums";
import {
  IClient,
  IClientsAccount,
  IClientsAccountData,
} from "interfaces/client";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  accountRiskTargetScore,
  addClientAccount,
  copyAccountToJson,
  deleteAccount,
  getClientAccountValuesChart,
  updateClientAccountName,
} from "services/accounts.services";
import {
  deleteProposalAccount,
  updateClientProposalAccountName,
} from "services/proposal.services";
import { getDateThFormat } from "utils/date";

import { refetchAccountsQueries } from "utils/refetchQueries";
import { truncateStringIfNeeded } from "utils/string";
import { toastError, toastSuccess } from "utils/toaster";
import { getValueAlignmentBg } from "utils/valueAlignment";
const { ACCOUNT } = EClientAccount;

interface Props {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  selectedRow: string;
  setSelectedRow: (value: string) => void;
  account: IClientsAccount;
  toggleOverallRiskRefresh: (val?: boolean) => void;
  fetched: string;
  client: IClient | null;
  clientAccounts: IClientsAccountData | null;
}

const AccountNo = ({
  isOpened,
  setIsOpened,
  account,
  fetched,
  selectedRow,
  setSelectedRow,
  toggleOverallRiskRefresh,
  client,
  clientAccounts,
}: Props) => {
  const isClientAccounts = fetched === ACCOUNT;
  const { clientId, proposalId }: { clientId: string; proposalId: string } =
    useParams();
  const [downloadFile, setDownloadFile] = useState(false);

  const [tempAccountName, setTempAccountName] = useState(account.name);
  const [tempTotalAmount, setTempTotalAmount] = useState<string>(
    `${account.total_amount}`
  );
  const queryClient = useQueryClient();
  const [editName, setEditName] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    setTempAccountName(account.name);
  }, [account]);

  const handleSaveAccountName = async () => {
    if (!mutation.isLoading) {
      if (!tempAccountName) {
        toastError("Enter account name");
        return;
      }

      if (!account.modelId) {
        const accountDetails = account.holdings[0];
        const data = {
          name: tempAccountName,
          client_id: clientId,
          details: [
            {
              description: "",
              ticker: accountDetails.ticker,
              amount: 0,
            },
          ],
        };

        await mutation.mutateAsync(data);
      } else {
        if (!tempTotalAmount || parseInt(tempTotalAmount) === 0) {
          toastError("Enter amount");
          return;
        }
        const data = {
          name: tempAccountName,
          client_id: clientId,
          total_amount: parseInt(tempTotalAmount),
          model_id: account.modelId,
        };

        await mutation.mutateAsync(data);
      }

      account.name = tempAccountName;
      account.isEdit = false;
    }
  };

  const mutation = useMutation({
    mutationFn: (data: any) => {
      if (account.isNew) {
        if (isClientAccounts) {
          return addClientAccount(data);
        }
      }
      if (isClientAccounts) {
        return updateClientAccountName(account.id, tempAccountName);
      }
      return updateClientProposalAccountName(account.id, tempAccountName);
    },
    onSuccess: async () => {
      refetchAccountsQueries(queryClient, clientId);
      toggleOverallRiskRefresh(false);
      queryClient.invalidateQueries([CLIENT_ACCOUNT_COUNT_KEY]);
      if (account.isNew) {
        toastSuccess("Account added");
      } else {
        setEditName(false);
        toastSuccess("Account updated");
      }

      if (account.modelId) {
        router.replace(pathname);
      }
    },
    onError: (e: any) => {
      if (e.message) {
        toastError(e.message);
      }
    },
  });

  const handleDoubleClickName = () => {
    if (!account.isNew) {
      setEditName(true);
    }
  };

  const deleteAccountMutation = useMutation({
    mutationFn: () => {
      if (isClientAccounts) {
        return deleteAccount(account.id);
      }
      return deleteProposalAccount(account.id);
    },
    onSuccess: async () => {
      refetchAccountsQueries(queryClient, clientId);
      toggleOverallRiskRefresh(
        clientAccounts?.accounts.length === 0 ? true : false
      );
      queryClient.invalidateQueries([CLIENT_ACCOUNT_COUNT_KEY]);
      toastSuccess("Account Deleted");
    },
    onError: () => {},
  });

  const handleDeleteAccount = () => {
    if (!deleteAccountMutation.isLoading) {
      deleteAccountMutation.mutate();
    }
  };

  const copyToJsonMutation = useMutation({
    mutationFn: () => {
      const type = isClientAccounts ? "ACCOUNT" : "PROPOSAL";
      return copyAccountToJson(account.id, type);
    },
    onSuccess: async ({ data }) => {
      if (data && data.data) {
        navigator.clipboard.writeText(JSON.stringify(data.data, undefined, 2));
        toastSuccess("Json Copied");
        setSelectedRow("");
      }
    },
    onError: () => {},
  });

  const handleCopyToJson = () => {
    if (!copyToJsonMutation.isLoading) {
      copyToJsonMutation.mutate();
    }
  };

  const PDFdata = {
    accountName: account.name,
    riskScore:
      account.current_risk !== null && account.target_risk !== null
        ? `Risk Score ${account.current_risk} / Target Risk ${account.target_risk}`
        : null,
    valueScore: account.values_alignment
      ? `${account.values_alignment.value_score}`
      : "",
    valueStatus: account.values_alignment
      ? account.values_alignment.value_status
      : null,
    amount: account.total_amount,
    accountSummary: account.holdings,
    clientName: `${client?.first_name} ${client?.last_name}`,
  };

  const [instance, updateInstance] = usePDF();

  const accountValuesChartMutation = useMutation({
    mutationFn: () => getClientAccountValuesChart(account.id),
    onSuccess: async ({ data }) => {
      if (data) {
        updateInstance(
          <AccountPDF {...PDFdata} valuesAlignments={data.data} />
        );

        setDownloadFile(true);
      }
    },
    onError: (e: any) => {
      setDownloadFile(true);

      if (e.message) {
        toastError(e.message);
      }
    },
  });

  const isAccountCreated = !account.isEdit && account.created_at;

  const handleDownloadPdf = async () => {
    accountValuesChartMutation.mutate();
  };

  useEffect(() => {
    if (instance.url && downloadFile) {
      const link = document.createElement("a");
      link.href = instance.url;
      link.download = `${account.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadFile(false);
    }
  }, [downloadFile, instance]);

  const accountRefreshMutation = useMutation({
    mutationFn: () => {
      return accountRiskTargetScore(account.id);
    },
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries([CLIENT_ACCOUNTS_KEY, clientId]);
      toggleOverallRiskRefresh(true);
      setIsRefreshing(false);
    },
    onError: (err: AxiosError) => {
      if (err && err.message) {
        toastError(err.message);
      }
      setIsRefreshing(false);
    },
  });

  return (
    <Grid
      container
      onClick={() => {
        if (!account.isEdit && !account.isNew) {
          setIsOpened(!isOpened);
        }
      }}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        py: "1.5rem",
      }}
    >
      <Grid item xs={4.5}>
        <Stack
          direction={"row"}
          sx={{
            gap: "1.25rem",
            cursor: "pointer",
            alignItems: "center",
          }}
        >
          <Stack
            onDoubleClick={handleDoubleClickName}
            direction={"row"}
            sx={{ gap: "0.5rem" }}
          >
            {!account.isEdit && !editName ? (
              <TextMd
                noWrap
                text={truncateStringIfNeeded(
                  account.name,
                  42 - account.total_amount.toLocaleString().length
                )}
                sx={{
                  color: "var(--text-primary)",
                  minWidth: "5.3rem",
                  fontSize: "1rem",
                }}
              />
            ) : (
              <ClickAwayListener
                onClickAway={() => {
                  setEditName(false);
                  if (account.isNew) {
                    handleSaveAccountName();
                  }
                }}
              >
                <Box>
                  <EditTextField
                    value={tempAccountName}
                    placeholder={"Enter Account name"}
                    onChange={(e) => {
                      setTempAccountName(e.target.value);
                    }}
                    onPressEnter={(e) => {
                      if (e.key === "Enter") {
                        handleSaveAccountName();
                      }
                    }}
                    endAdornment={
                      mutation.isLoading && (
                        <Image
                          className={"rotating"}
                          priority
                          src={LoadingDarkIcon}
                          alt={"icon"}
                          width={16}
                          height={16}
                        />
                      )
                    }
                  />
                </Box>
              </ClickAwayListener>
            )}
          </Stack>

          {!account.modelId ? (
            <TextXs
              text={`$${account.total_amount.toLocaleString()}`}
              sx={{
                lineHeight: "1.25rem",
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
              }}
            />
          ) : (
            <EditTextField
              value={tempTotalAmount}
              autoFocus={false}
              placeholder={"Enter Amount"}
              type="number"
              onChange={(e) => {
                setTempTotalAmount(e.target.value);
              }}
              onPressEnter={(e) => {
                if (e.key === "Enter") {
                  handleSaveAccountName();
                }
              }}
              endAdornment={
                mutation.isLoading && (
                  <Image
                    className={"rotating"}
                    priority
                    src={LoadingDarkIcon}
                    alt={"icon"}
                    width={21}
                    height={20}
                  />
                )
              }
              sx={{ width: "8rem" }}
            />
          )}
        </Stack>
      </Grid>

      <Grid item xs={5}>
        <Stack direction={"row"} sx={{ gap: "0.5rem", alignItems: "center" }}>
          {isAccountCreated && account.target_risk !== null && (
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                width: "fit-content",
                gap: "0.25rem",
                backgroundColor: "var(--gray-100)",
                borderRadius: "1rem",
                padding: "0.125rem 0.5rem",
                ">p": {
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  fontWeight: "500",
                },
              }}
            >
              {!account.risk_response || account.risk_response.stale ? (
                <IconText
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isRefreshing) {
                      setIsRefreshing(true);
                      accountRefreshMutation.mutate();
                    }
                  }}
                  icon={RefreshLargeIcon}
                  iconWidth={14}
                  iconHeight={14}
                  text={"Refresh Score"}
                  iconClassName={isRefreshing ? "rotating" : ""}
                  sxText={{
                    cursor: "pointer",
                    color: "var(--primary)",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                  sxRow={{
                    cursor: "pointer",
                    gap: "0.37rem",
                    alignItems: "center",
                    justifyContent: "start",
                    flexDirection: "row-reverse",
                    paddingX: "0.5rem",
                  }}
                />
              ) : (
                <TextXs text={`Risk Score ${account.current_risk}`} />
              )}
              <TextXs text="/" sx={{ color: "var(--gray-800) !important" }} />
              <TextXs text={`Target Risk ${account.target_risk}`} />
            </Stack>
          )}
          {account.values_alignment && (
            <Chip
              text={`Values Alignment ${account.values_alignment.value_score}`}
              sx={{
                padding: "0.35rem 0.5rem",
                ...getValueAlignmentBg(account.values_alignment.value_status),
              }}
            />
          )}
        </Stack>
      </Grid>

      <Grid item xs={2.5}>
        {isAccountCreated && (
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "end",
              gap: "1.5rem",
              ".chevron": {
                transform: isOpened ? "rotate(90deg)" : "rotate(0deg)",
                transition: "all 0.3s",
              },
            }}
          >
            <TextXs
              text={`Created ${getDateThFormat(account.created_at)}`}
              sx={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
            />
            <ClickAwayListener onClickAway={() => setSelectedRow("")}>
              <Box sx={{ position: "relative", img: { cursor: "pointer" } }}>
                <Image
                  className="dotIcon"
                  priority
                  src={DotsVerticalIcon}
                  alt={"icon"}
                  width={20}
                  height={20}
                  onClick={(e) => {
                    if (account.id === selectedRow) {
                      setSelectedRow("");
                    } else {
                      setSelectedRow(account.id);
                    }

                    setOpenMenu(!openMenu);
                    e.stopPropagation();
                  }}
                />

                {account.id === selectedRow && (
                  <MenuCard sx={{ minWidth: "12rem" }}>
                    {account.values_alignment && (
                      <ListItemButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadPdf();
                        }}
                      >
                        <Stack
                          direction={"row"}
                          sx={{ alignItems: "center", gap: "0.5rem" }}
                        >
                          <Image
                            priority
                            src={ExportPDFIcon}
                            alt={"icon"}
                            width={14}
                            height={16}
                          />

                          <TextXs
                            sx={{ fontWeight: "500" }}
                            text="Export to PDF"
                          />

                          {accountValuesChartMutation.isLoading && (
                            <Image
                              className={"rotating"}
                              priority
                              src={LoadingDarkIcon}
                              alt={"icon"}
                              width={15}
                              height={15}
                            />
                          )}
                        </Stack>
                      </ListItemButton>
                    )}
                    {COPY_TO_JSON && (
                      <ListItemButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyToJson();
                        }}
                      >
                        <Stack
                          direction={"row"}
                          sx={{ alignItems: "center", gap: "0.5rem" }}
                        >
                          <Image
                            priority
                            src={CopyIcon}
                            alt={"icon"}
                            width={14}
                            height={16}
                          />

                          <TextXs
                            sx={{ fontWeight: "500" }}
                            text="Copy to Json"
                          />

                          {copyToJsonMutation.isLoading && (
                            <Image
                              className={"rotating"}
                              priority
                              src={LoadingDarkIcon}
                              alt={"icon"}
                              width={15}
                              height={15}
                            />
                          )}
                        </Stack>
                      </ListItemButton>
                    )}
                    <ListItemButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAccount();
                      }}
                    >
                      <Stack
                        direction={"row"}
                        sx={{ alignItems: "center", gap: "0.5rem" }}
                      >
                        <Image
                          priority
                          src={CrossRedRoundIcon}
                          alt={"icon"}
                          width={14}
                          height={16}
                        />

                        <TextXs
                          sx={{
                            fontWeight: "500",
                            color: "var(--carnelian)",
                          }}
                          text="Delete account"
                        />

                        {deleteAccountMutation.isLoading && (
                          <Image
                            className={"rotating"}
                            priority
                            src={LoadingDarkIcon}
                            alt={"icon"}
                            width={15}
                            height={15}
                          />
                        )}
                      </Stack>
                    </ListItemButton>
                  </MenuCard>
                )}
              </Box>
            </ClickAwayListener>

            <Image
              className="chevron"
              priority
              src={ChevronRightIcon}
              alt={"icon"}
              width={20}
              height={20}
            />
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export default AccountNo;
