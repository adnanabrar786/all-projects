import { TableCell, TableHead, TableRow } from "@mui/material";

interface Props {
  label?: string;
  viewReport?: boolean;
}

const ValuesAlignmentHead = ({ viewReport, label }: Props) => {
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
        <TableCell>Topic</TableCell>
        <TableCell sx={{ display: "flex" }}>Preference</TableCell>
        <TableCell sx={{ width: "30%" }}>Importance</TableCell>
        {viewReport && label === "fund" && (
          <TableCell sx={{ textAlign: "center" }}>
            Portfolio Exposure %
          </TableCell>
        )}
        <TableCell sx={{ textAlign: "center" }}>Values Alignment</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ValuesAlignmentHead;
