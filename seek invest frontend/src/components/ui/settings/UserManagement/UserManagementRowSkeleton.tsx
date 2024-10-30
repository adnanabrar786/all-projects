import { Skeleton, TableCell, TableRow } from "@mui/material";

const UserManagementRowSkeleton = () => {
  return (
    <TableRow
      sx={{
        alignItems: "center",
        "&:last-child td, &:last-child th": { border: 0 },
        ".MuiTableCell-root": {
          fontSize: "0.8125rem",
          lineHeight: "1.25rem",
        },
      }}
    >
      <TableCell sx={{ color: "var(--primary)" }}>
        <Skeleton width={"12rem"} />
      </TableCell>

      <TableCell>
        <Skeleton />
      </TableCell>
    </TableRow>
  );
};

export default UserManagementRowSkeleton;
