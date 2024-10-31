import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

interface props {
  description: string;
}
const CompanyDesc = ({ description }: props) => {
  return (
    <>
      <Stack>
        <Typography
          sx={{
            color: "var(--text-grey)",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "500",
            maxWidth: "790px",
            minWidth: "100%",
            lineHeight: "200%",
          }}
        >
          {description}
        </Typography>
      </Stack>
    </>
  );
};

export default CompanyDesc;
