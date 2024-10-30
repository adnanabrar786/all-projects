import { Box, Stack } from "@mui/material";
import CustomizedProgressBars from "components/common/Progress/Progress";
import FinancialHeader from "components/ui/App/FinancialHeader";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  value: number;
  title: string;
}

const FinancialLayout = ({ children, value, title }: Props) => {
  return (
    <>
      <FinancialHeader title={title} />
      <Box
        sx={{
          position: "absolute",
          top: "7rem",
          left: "0",
          right: "0",
        }}
      >
        <CustomizedProgressBars value={value} sx={{ borderRadius: "0" }} />
      </Box>
      <Box sx={{ mt: "3rem" }} />

      <Stack
        sx={{
          alignSelf: "flex-start",
          width: "1080px",
          paddingX: "1rem",
          mb: "1rem",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        {children}
      </Stack>
    </>
  );
};

export default FinancialLayout;
