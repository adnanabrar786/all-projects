import { TableCell, TableRow } from "@mui/material";
import HoldingFlagExposure from "components/ui/clients/ClientDetails/Accounts/HoldingFlagExposure";
import { IProductExposure } from "interfaces/client";

interface Props {
  index: number;
  rowsLength: number;
  result: IProductExposure;
  tickerName: string;
}

const HoldingFlagRow = ({ index, rowsLength, result, tickerName }: Props) => {
  return (
    <TableRow>
      <TableCell
        colSpan={7}
        sx={{
          borderBottom:
            index === rowsLength - 1 ? "1px solid var(--gray-200)" : "none",
        }}
      >
        <HoldingFlagExposure
          result={{
            name: result.name,
            description: result.description,
            percentage: result.percentage,
          }}
          exposeDescription={result.expose_description}
          tickerName={tickerName}
        />
      </TableCell>
    </TableRow>
  );
};

export default HoldingFlagRow;
