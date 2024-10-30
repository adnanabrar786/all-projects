import { Skeleton, TableCell, TableRow } from "@mui/material";

const AccountDetailsSkeleton = () => {
  return Array.from({ length: 4 }).map((_, i) => (
    <TableRow
      key={i}
      sx={{
        padding: "0.63rem",
        borderBottom: i == 7 ? "1px solid var(--gray-200)" : "none",
      }}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <TableCell key={index}>
          <Skeleton />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default AccountDetailsSkeleton;
