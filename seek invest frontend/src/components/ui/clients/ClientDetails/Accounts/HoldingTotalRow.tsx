import { TableCell, TableRow } from "@mui/material";
import TextXs from "components/common/Text/TextXs";

interface Props {
  percentage: string;
  colSpan: number;
}

const HoldingTotalRow = ({ percentage, colSpan }: Props) => {
  return (
    <TableRow
      sx={{
        backgroundColor: "var(--ghost-white)",
        width: "100%",
      }}
    >
      <TableCell colSpan={colSpan}>
        <TextXs
          text="TOTAL"
          sx={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
        />
      </TableCell>
      <TableCell>
        <TextXs
          text={percentage}
          sx={{
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
            textAlign: "center",
          }}
        />
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default HoldingTotalRow;
