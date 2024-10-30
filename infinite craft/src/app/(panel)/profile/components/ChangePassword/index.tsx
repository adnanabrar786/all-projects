import { Box, Typography } from "@mui/material";
import PasswordForm from "../PasswordForm";

export default function ChangePassword() {
  return (
    <Box sx={{ paddingLeft: { xs: "1.3rem", md: "3.438rem" } }}>
      <Typography
        sx={{
          color: "var(--textWhite)",
          fontSize: "20px ",
          fontWeight: "600",
          marginBottom: "30px",
        }}
      >
        Change Password
      </Typography>
      <PasswordForm />
    </Box>
  );
}
