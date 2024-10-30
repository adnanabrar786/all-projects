import {
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import IconText from "components/common/IconText";
import TextXs from "components/common/Text/TextXs";
import HoldingCashRow from "components/ui/clients/ClientDetails/Accounts/HoldingCashRow.v2";
import HoldingRow from "components/ui/clients/ClientDetails/Accounts/HoldingRow.v2";
import HoldingTotalRow from "components/ui/clients/ClientDetails/Accounts/HoldingTotalRow";
import SearchHolding from "components/ui/clients/ClientDetails/Accounts/SearchHolding";
import ComparisonReportModal from "components/ui/tickers/Comparison/ComparisonReportModal";
import { CheckCircleGreen2, InfoCircleIconRed } from "constants/images.routes";
import { ALIGNMENTS_SCORE_LABEL, EClientAccount, ETicker } from "enums/enums";
import { EPreference } from "enums/framework";
import useClientAccountValuesFilter from "hooks/useClientAccountHoldingsFilter";
import {
  IAccountValuesAlignment,
  IClient,
  IClientsAccountDetails,
  IKeyAreas,
  IProductExposure,
  IProductWeights,
  ISecuritiesDetail,
} from "interfaces/client";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  addAccountHolding,
  copyAccountTickerToJson,
  deleteAccountHolding,
  updateAccountHoldingAmount,
} from "services/accounts.services";
import {
  addProposalAccountHolding,
  deleteProposalAccountHolding,
  updateProposalAccountHoldingAmount,
} from "services/proposal.services";
import { invertFormattedNumber } from "utils/maths";
import { refetchAccountsQueries } from "utils/refetchQueries";
import { sortAndMoveCashToEnd } from "utils/tickers";
import { toastSuccess } from "utils/toaster";

const HoldingReportModal = dynamic(
  () =>
    import("components/ui/clients/ClientDetails/Accounts/HoldingReportModal"),
  {
    ssr: false,
  }
);

const { OPPOSE } = EPreference;
const { ACCOUNT } = EClientAccount;

interface Props {
  accountId: string;
  showValueAlignment: boolean;
  accountDetails: IClientsAccountDetails[];
  percentage: string;
  fetched: string;
  tickerId: string;
  filterAccountHolding: IKeyAreas | null;
  setTickerId: (tickerId: string) => void;
  setFilterAccountHolding: (value: IKeyAreas | null) => void;
  accountsValueAlignment: IAccountValuesAlignment | null;
  toggleOverallRiskRefresh: (val?: boolean) => void;
  client: IClient | null;
}

const HoldingTable = ({
  accountDetails,
  percentage,
  accountId,
  fetched,
  tickerId,
  setTickerId,
  showValueAlignment,
  filterAccountHolding,
  accountsValueAlignment,
  setFilterAccountHolding,
  toggleOverallRiskRefresh,
  client,
}: Props) => {
  const isClientAccounts = fetched === ACCOUNT;

  const [addHolding, setAddHolding] = useState(false);
  const [openComparisonReport, setOpenComparisonReport] = useState<{
    id: string;
    ticker: string;
    name: string;
  } | null>(null);
  const [holdingReport, setHoldingReport] = useState<string | null>(null);
  const { clientId, proposalId }: { clientId: string; proposalId: string } =
    useParams();
  const queryClient = useQueryClient();
  const { valuesFilter, isLoading, showValuesAlignment } =
    useClientAccountValuesFilter(
      accountId,
      filterAccountHolding ? filterAccountHolding?.topic_code : ""
    );

  const toggleRowSelection = (rowId: string) => {
    if (tickerId === rowId) {
      setTickerId("");
    } else {
      setTickerId(rowId);
    }
  };

  function createData(
    id: string,
    name: string,
    description: string,
    amount: string,
    percentageValue: string,
    isEdit: boolean,
    isNew: boolean,
    product_weights: IProductWeights[],
    product_exposure: IProductExposure[],
    risk_score: number | null,
    values_alignment: {
      value_score: number;
      value_status: ALIGNMENTS_SCORE_LABEL;
    } | null,
    label: string
  ) {
    return {
      id,
      name,
      description,
      amount,
      percentageValue,
      isEdit,
      isNew,
      product_weights,
      product_exposure,
      risk_score,
      values_alignment,
      label,
    };
  }

  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (accountDetails && !filterAccountHolding) {
      setRows(
        accountDetails.map(
          ({
            id,
            ticker,
            description,
            amount,
            percentage,
            product_weights,
            risk_score,
            values_alignment,
            label,
          }) => {
            return createData(
              id,
              ticker,
              description || "",
              amount,
              percentage,
              false,
              false,
              product_weights,
              [],
              risk_score,
              values_alignment,
              label
            );
          }
        )
      );
    } else if (filterAccountHolding && valuesFilter) {
      setRows(
        valuesFilter.map(
          ({
            id,
            ticker,
            description,
            amount,
            percentage,
            product_weights,
            product_exposure,
            risk_score,
            values_alignment,
            label,
          }) => {
            return createData(
              id,
              ticker,
              description || "",
              amount,
              percentage,
              false,
              false,
              product_weights,
              product_exposure,
              risk_score,
              values_alignment,
              label
            );
          }
        )
      );
    }
  }, [accountDetails, valuesFilter, filterAccountHolding]);

  const handleClickHolding = ({ ticker, name }: ISecuritiesDetail) => {
    let tempRows = [...rows];
    tempRows.push(
      createData(
        "",
        ticker,
        name,
        "",
        "0.00",
        true,
        true,
        [],
        [],
        null,
        null,
        ""
      )
    );

    setRows(tempRows);
  };

  const handleChangeAmount = (value, index: number) => {
    let tempRows = [...rows];
    tempRows[index].amount = value;
    setRows(tempRows);
  };

  const handleSaveHolding = async (index: number, isNew?: boolean) => {
    let tempRows = [...rows];
    let desiredRow = tempRows[index];
    desiredRow.isNew = isNew;

    const data = await mutation.mutateAsync(desiredRow);

    if (data && data.data) {
      if (isNew) {
        desiredRow.id = data.data.external_holding_id;
      }

      desiredRow.isNew = false;
      desiredRow.isEdit = false;
      setRows(tempRows);
    }
  };

  const mutation = useMutation({
    mutationFn: (desiredRow: IClientsAccountDetails) => {
      if (desiredRow.isNew) {
        if (isClientAccounts) {
          return addAccountHolding({
            account_id: accountId,
            amount: Number(desiredRow.amount),
            description: desiredRow.description,
            ticker: desiredRow.name,
            clientId,
          });
        }
        return addProposalAccountHolding({
          account_id: accountId,
          amount: Number(desiredRow.amount),
          description: desiredRow.description,
          ticker: desiredRow.name,
          proposalId,
        });
      } else {
        if (isClientAccounts) {
          return updateAccountHoldingAmount(
            accountId,
            Number(invertFormattedNumber(desiredRow.amount)),
            desiredRow.id
          );
        }
        return updateProposalAccountHoldingAmount(
          accountId,
          Number(invertFormattedNumber(desiredRow.amount)),
          desiredRow.id
        );
      }
    },
    onSuccess: async () => {
      toggleOverallRiskRefresh(false);
      refetchAccountsQueries(queryClient, clientId);
    },
    onError: () => {},
  });

  const handleDoubleClickAmount = (index: number) => {
    let tempRows = [...rows];
    let desiredRow = tempRows[index];
    desiredRow.isEdit = true;
    setRows(tempRows);
  };

  const handleClickAwayAmount = (index: number, oldAmount: string) => {
    let tempRows = [...rows];
    let desiredRow = tempRows[index];

    if (!desiredRow.amount) {
      desiredRow.amount = "0";
    }

    setRows(tempRows);

    if (oldAmount != desiredRow.amount) {
      handleSaveHolding(index, desiredRow.isNew);
    } else {
      desiredRow.isEdit = false;
      setRows(tempRows);
    }
  };

  const deleteTicker = useMutation({
    mutationFn: ({
      account_id,
      ticker_id,
    }: {
      account_id: string;
      ticker_id: string;
    }) => {
      if (isClientAccounts) {
        return deleteAccountHolding({ account_id, ticker_id });
      } else {
        return deleteProposalAccountHolding({ account_id, ticker_id });
      }
    },
    onSuccess: async (data, { account_id, ticker_id }) => {
      toggleOverallRiskRefresh(false);
      refetchAccountsQueries(queryClient, clientId);

      let tempRows = [...rows];

      tempRows = tempRows.filter((val) => {
        return val.id !== ticker_id;
      });

      if (filterAccountHolding) {
        if (tempRows.length === 1) {
          setFilterAccountHolding(null);
        }
      }

      setRows(tempRows);
    },
  });

  const handleDeleteTicker = async (account_id: string, ticker_id: string) => {
    await deleteTicker.mutateAsync({ account_id, ticker_id });
  };

  const copyToJsonMutation = useMutation({
    mutationFn: ({
      clientId,
      ticker_id,
      ticker_name,
      amount,
    }: {
      clientId: string;
      ticker_id: string;
      ticker_name: string;
      amount: string;
    }) => {
      return copyAccountTickerToJson(clientId, ticker_id, ticker_name, amount);
    },
    onSuccess: async ({ data }) => {
      if (data && data.data) {
        navigator.clipboard.writeText(JSON.stringify(data.data, undefined, 2));
        toastSuccess("Json Copied");
      }
    },
    onError: () => {},
  });

  const handleCopyToJson = async (
    ticker_id: string,
    ticker_name: string,
    amount: string
  ) => {
    if (!copyToJsonMutation.isLoading) {
      await copyToJsonMutation.mutateAsync({
        clientId,
        ticker_id,
        ticker_name,
        amount,
      });
    }
  };

  sortAndMoveCashToEnd(rows);

  const holdingsAssetsFlagged = [
    {
      title: "Holdings Flagged",
      value: "0",
    },
    {
      title: "Assets Flagged",
      value: "0%",
    },
  ];

  const isFilterHoldingOppose = filterAccountHolding?.preference === OPPOSE;

  const isProductExposure = rows.filter((row) => {
    return row.product_exposure && row.product_exposure.length;
  });

  const isProductExposureProductType = rows.find((row) => {
    return !row.product_exposure;
  });

  const isFilterShowValuesAlignment =
    (filterAccountHolding && showValuesAlignment) || !filterAccountHolding;

  return (
    <Stack sx={{ width: "100%" }}>
      <TableContainer sx={{ overflow: "visible" }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                width: "100%",
                bgcolor: "var(--ghost-white)",
                ".MuiTableCell-root": {
                  color: "var(--text-secondary)",
                  borderWidth: "1px",
                  borderColor: "var(--gray-200)",
                  fontSize: "0.75rem",
                  lineHeight: "1.25rem",
                  fontStyle: "normal",
                  padding: "0.63rem",
                },
              }}
            >
              <TableCell>Ticker</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                Percentage Value
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>Risk Score</TableCell>

              <TableCell sx={{ textAlign: "center" }}>
                {isFilterShowValuesAlignment ? "Values Alignment" : ""}
              </TableCell>

              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!isLoading ? (
              <>
                {filterAccountHolding &&
                  !isProductExposure.length &&
                  !isProductExposureProductType && (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <Stack
                          direction={"row"}
                          sx={{
                            padding: "1rem",
                            borderRadius: "0.5rem",
                            width: "100%",
                            bgcolor: isFilterHoldingOppose
                              ? "var(--red-shadwow5)"
                              : "var(--gray-100)",
                            boxSizing: "border-box",
                            justifyContent: "space-between",
                          }}
                        >
                          <IconText
                            icon={
                              isFilterHoldingOppose
                                ? CheckCircleGreen2
                                : InfoCircleIconRed
                            }
                            iconWidth={16}
                            iconHeight={16}
                            text={
                              isFilterHoldingOppose
                                ? `This account does not contain any holdings that are exposed to  ${filterAccountHolding.topic_name}`
                                : `This account does not contain any holdings that support ${filterAccountHolding.topic_name}`
                            }
                            sxRow={{
                              gap: "0.63rem",
                            }}
                            sxText={{
                              fontSize: "0.75rem",
                              color: isFilterHoldingOppose
                                ? "var(--text-success2)"
                                : "var(--text-primary)",
                            }}
                          />

                          <Stack
                            direction={"row"}
                            sx={{ gap: "1rem", alignItems: "center" }}
                          >
                            {holdingsAssetsFlagged.map((val, i) => (
                              <Stack
                                key={i}
                                direction={"row"}
                                sx={{
                                  gap: "0.5rem",
                                  alignItems: "center",
                                }}
                              >
                                <TextXs
                                  text={val.title}
                                  sx={{
                                    fontSize: "0.75rem",
                                  }}
                                />

                                <TextXs
                                  text={val.value}
                                  sx={{
                                    padding: "0.125rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "500",
                                    color: "var(--text-tertiary)",
                                    borderRadius: "1rem",
                                    backgroundColor: "white",
                                  }}
                                />
                              </Stack>
                            ))}
                          </Stack>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )}

                {rows.map((row, index) =>
                  row.name !== ETicker.$CASH ? (
                    <HoldingRow
                      accountsValueAlignment={accountsValueAlignment}
                      showValuesAlignment={isFilterShowValuesAlignment}
                      riskScore={row.risk_score}
                      valueAlignment={row.values_alignment}
                      score={row.score || 0}
                      key={row.id}
                      holding={row.name}
                      description={row.description}
                      label={row.label}
                      amount={row.amount}
                      percentageValue={row.percentageValue}
                      isEdit={row.isEdit}
                      isNew={row.isNew}
                      product_exposure={row.product_exposure ?? []}
                      index={index}
                      handleChangeAmount={handleChangeAmount}
                      handleSaveHolding={handleSaveHolding}
                      handleClickAwayAmount={handleClickAwayAmount}
                      handleDoubleClickAmount={handleDoubleClickAmount}
                      isDeleting={deleteTicker.isLoading}
                      isCopyingJson={copyToJsonMutation.isLoading}
                      isSelected={tickerId === row.id}
                      handleDeleteTicker={() =>
                        handleDeleteTicker(accountId, row.id)
                      }
                      handleCopyToJson={() =>
                        handleCopyToJson(row.id, row.name, row.amount)
                      }
                      setHoldingReport={() => setHoldingReport(row.id)}
                      setOpenComparisonReport={() =>
                        setOpenComparisonReport({
                          id: row.id,
                          ticker: row.name,
                          name: row.description,
                        })
                      }
                    />
                  ) : (
                    <HoldingCashRow
                      key={row.id}
                      amount={row.amount}
                      percentageValue={row.percentageValue}
                      handleChangeAmount={handleChangeAmount}
                      handleSaveHolding={handleSaveHolding}
                      index={index}
                      isEdit={row.isEdit}
                      handleClickAwayAmount={handleClickAwayAmount}
                      handleDoubleClickAmount={handleDoubleClickAmount}
                      isSelected={tickerId === row.id}
                      onClick={() => toggleRowSelection(row.id)}
                    />
                  )
                )}

                <HoldingTotalRow percentage={percentage} colSpan={3} />
              </>
            ) : (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow
                  key={i}
                  sx={{
                    ".MuiTableCell-root": {
                      borderBottom:
                        i === 2 ? "none" : "1px solid var(--gray-200)",
                    },
                  }}
                >
                  {Array.from({ length: 7 }).map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!isLoading && (
        <SearchHolding
          handleClickHolding={handleClickHolding}
          setAddHolding={setAddHolding}
          sx={{ padding: "1rem", mb: "0" }}
        />
      )}

      {holdingReport && (
        <HoldingReportModal
          setHoldingReport={setHoldingReport}
          holdingReport={holdingReport}
          accountId={accountId}
        />
      )}

      {openComparisonReport && (
        <ComparisonReportModal
          openComparisonReport={openComparisonReport}
          setOpenComparisonReport={setOpenComparisonReport}
          accountId={accountId}
          client={client}
        />
      )}
    </Stack>
  );
};

export default HoldingTable;
