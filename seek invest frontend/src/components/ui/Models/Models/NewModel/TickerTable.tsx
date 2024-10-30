import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CustomDivider from "components/common/Divider/CustomDivider";
import TextXxs from "components/common/Text/TextXxs";
import TickerCashRow from "components/ui/Models/Models/NewModel/TickerCashRow";
import TickerRow from "components/ui/Models/Models/NewModel/TickerRow";
import SearchHolding from "components/ui/clients/ClientDetails/Accounts/SearchHolding";
import { ETicker } from "enums/enums";
import { ISecuritiesDetail } from "interfaces/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getSum } from "utils/maths";
import { sortAndMoveCashToEndTicker } from "utils/tickers";
import { toastError } from "utils/toaster";

interface Props {
  isModelsError: string;
  setIsModelsError: (value: string) => void;
  setTickers?: any;
  modelTickers?: any;
}

const TickerTable = ({
  isModelsError,
  setIsModelsError,
  setTickers,
  modelTickers,
}: Props) => {
  const [addHolding, setAddHolding] = useState(false);
  const [rows, setRows] = useState<any>([
    {
      ticker: "$CASH",
      percentage: "",
      description: "",
    },
  ]);
  const { modelId }: { modelId: string } = useParams();

  const isNewModel = modelId === "new-model";

  useEffect(() => {
    if (modelTickers) {
      return setRows(
        modelTickers.map((val) => {
          return {
            ticker: val.ticker,
            percentage: val.value ?? val.percentage,
            description: val.description,
          };
        })
      );
    }

    setRows([
      {
        ticker: "$CASH",
        percentage: "",
        description: "",
      },
    ]);
  }, []);

  function createData(
    ticker: string,
    description: string,
    percentage: string,
    isEdit: boolean,
    isNew: boolean
  ) {
    return { ticker, description, percentage, isEdit, isNew };
  }

  const handleClickHolding = ({ ticker, name }: ISecuritiesDetail) => {
    const isTickerExist = rows.find((row) => row.ticker === ticker);

    if (isTickerExist) {
      return toastError(`Ticker ${ticker} already exist`);
    }
    let tempRows = [...rows];
    tempRows.push(createData(ticker, name, "", true, true));

    setRows(tempRows);
  };

  const handleChangePercentage = (value, index: number) => {
    let tempRows = [...rows];

    tempRows[index].percentage = value;
    setRows(tempRows);
  };

  const handleDoubleClickPercentage = (index: number) => {
    let tempRows = [...rows];
    let desiredRow = tempRows[index];
    desiredRow.isEdit = true;
    setRows(tempRows);
  };

  const handleClickAwayPercentage = (index: number) => {
    let tempRows = [...rows];
    let desiredRow = tempRows[index];

    if (desiredRow.isNew) {
      tempRows = tempRows.filter((tempRow) => {
        return tempRow.isNew === false;
      });
      setRows(tempRows);
    }
  };

  const handleSaveHolding = async (index: number, isNew?: boolean) => {
    let tempRows = [...rows];
    let desiredRow = tempRows[index];
    desiredRow.isNew = isNew;

    desiredRow.isEdit = false;
    setRows(tempRows);
  };

  const handleDeleteTicker = async (ticker: string) => {
    let tempRows = [...rows];
    setRows(tempRows.filter((val) => val.ticker !== ticker));
  };

  sortAndMoveCashToEndTicker(rows);

  const sum = getSum(rows.map((val) => Number(val.percentage ?? 0)));

  useEffect(() => {
    setTickers(rows);

    if (sum < 100 || sum > 100) {
      return setIsModelsError("Total percentage values must equal 100%");
    }

    setIsModelsError("");
  }, [rows]);

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
              <TableCell sx={{ width: "40%" }}>Ticker</TableCell>
              <TableCell sx={{ width: "30%" }}>Description</TableCell>
              <TableCell sx={{ width: "20%" }}>Percentage Value</TableCell>
              <TableCell sx={{ width: "10%" }}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!isNewModel &&
              rows &&
              rows.map((row, index) =>
                row.ticker !== ETicker.$CASH ? (
                  <TickerRow
                    key={index}
                    ticker={row.ticker}
                    description={row.description}
                    percentageValue={`${row.percentage}`}
                    index={index}
                    isEdit={row.isEdit}
                    isNew={row.isNew}
                    handleChangePercentage={handleChangePercentage}
                    handleDoubleClickPercentage={handleDoubleClickPercentage}
                    handleClickAwayPercentage={handleClickAwayPercentage}
                    handleSaveHolding={handleSaveHolding}
                    isLoading={false}
                    handleDeleteTicker={handleDeleteTicker}
                  />
                ) : (
                  <TickerCashRow
                    key={index}
                    title={"Cash and other non-scorable items"}
                    percentage={`${row.percentage}`}
                    colSpan={2}
                    index={index}
                    isEdit={row.isEdit}
                    isNew={row.isNew}
                    handleChangePercentage={handleChangePercentage}
                    handleDoubleClickPercentage={handleDoubleClickPercentage}
                    handleClickAwayPercentage={handleClickAwayPercentage}
                    handleSaveHolding={handleSaveHolding}
                    isLoading={false}
                  />
                )
              )}
          </TableBody>

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
            <TableCell sx={{ width: "40%" }}>
              <TextXxs
                text="TOTAL"
                sx={{
                  fontWeight: "500",
                  color: "var(--text-secondary)",
                  ml: "0.4rem",
                }}
              />
            </TableCell>
            <TableCell sx={{ width: "30%" }}></TableCell>
            <TableCell sx={{ width: "20%" }}>
              <TextXxs text={`${sum.toFixed(2)} %`} />
            </TableCell>
            <TableCell sx={{ width: "10%" }}></TableCell>
          </TableRow>
        </Table>
      </TableContainer>

      <CustomDivider sx={{ marginBottom: "0.72rem" }} />

      <SearchHolding
        handleClickHolding={handleClickHolding}
        setAddHolding={setAddHolding}
        sx={{ padding: "1rem", mb: "0" }}
        modelTickers={rows}
      />
    </Stack>
  );
};

export default TickerTable;
