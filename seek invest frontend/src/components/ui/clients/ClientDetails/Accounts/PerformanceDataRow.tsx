import { TableCell, TableRow } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import { IHoldingReportPerformance } from "interfaces/client";

interface Props {
  index: number;
  resultLength: number;
  result: IHoldingReportPerformance;
}

const PerformanceDataRow = ({ index, resultLength, result }: Props) => {
  return (
    <TableRow
      sx={{
        ".MuiTableCell-root": {
          padding: "1rem",
          borderBottom:
            resultLength - 1 != index ? "1px solid var(--gray-200)" : "none",

          ">p": {
            fontSize: "0.75rem",
            textAlign: "center",
          },
        },
      }}
    >
      <TableCell>
        <TextXs
          noWrap
          sx={{
            fontWeight: "500",
            textAlign: "start !important",
          }}
          text={result.trailing_returns}
        />
      </TableCell>

      <TableCell>
        <TextXs text={result.return_ytd} />
      </TableCell>

      <TableCell>
        <TextXs text={result.return_1yr} />
      </TableCell>

      <TableCell>
        <TextXs text={result.return_3yr} />
      </TableCell>

      <TableCell>
        <TextXs text={result.return_5yr} />
      </TableCell>
    </TableRow>
  );
};

export default PerformanceDataRow;
