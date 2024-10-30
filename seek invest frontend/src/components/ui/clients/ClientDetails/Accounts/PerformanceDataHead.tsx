import { TableCell, TableHead, TableRow } from "@mui/material";

const PerformanceDataHead = () => {
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
            fontStyle: "normal",
            textAlign: "center",
          },
        }}
      >
        <TableCell sx={{ textAlign: "start !important" }}>
          Trailing Returns
        </TableCell>
        <TableCell>YTD</TableCell>
        <TableCell>1Y</TableCell>
        <TableCell>3Y</TableCell>
        <TableCell>5Y</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default PerformanceDataHead;
