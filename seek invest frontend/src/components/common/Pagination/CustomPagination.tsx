import { Pagination, styled } from "@mui/material";

export const CustomPagination = styled(Pagination)({
  alignSelf: "center",
  padding: "0.5rem",
  button: {
    borderRadius: "0.5rem",
  },
  ".Mui-selected": {
    backgroundColor: "var(--submenu-bg)",
    color: "var(--primary)",
    ":hover": {
      backgroundColor: "var(--submenu-bg)",
      color: "var(--primary)",
    },
  },
  ".MuiPaginationItem-icon": {
    display: "none",
  },
});
