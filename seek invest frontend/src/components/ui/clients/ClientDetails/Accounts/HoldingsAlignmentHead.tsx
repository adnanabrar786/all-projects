import { TableCell, TableHead, TableRow } from "@mui/material";

const HoldingsAlignmentHead = () => {
  return (
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
        <TableCell colSpan={2}>Name</TableCell>
        <TableCell sx={{ textAlign: "center" }}>Weight</TableCell>
        <TableCell sx={{ textAlign: "center" }}>Risk Score</TableCell>
        <TableCell sx={{ textAlign: "center" }}>Values Alignment</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default HoldingsAlignmentHead;
