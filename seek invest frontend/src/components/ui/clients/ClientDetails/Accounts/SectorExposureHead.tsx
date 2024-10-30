import { TableCell, TableHead, TableRow } from "@mui/material";

interface Props {
  ticker: string;
  benchmarkExposureHeader: string;
}

const SectorExposureHead = ({ ticker, benchmarkExposureHeader }: Props) => {
  return (
    <TableHead>
      <TableRow
        sx={{
          bgcolor: "var(--ghost-white)",
          ".MuiTableCell-root": {
            color: "var(--text-primary)",
            borderWidth: "1px",
            borderColor: "var(--gray-200)",
            fontSize: "0.75rem",
            fontStyle: "normal",
            width: "30%",
          },
        }}
      >
        <TableCell>Sector</TableCell>
        <TableCell>{ticker}</TableCell>
        <TableCell>{benchmarkExposureHeader}</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default SectorExposureHead;
