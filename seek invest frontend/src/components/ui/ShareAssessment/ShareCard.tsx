import { Stack } from "@mui/material";
import TextSm from "components/common/Text/TextSm";
import TextXs from "components/common/Text/TextXs";
import { ReactNode } from "react";

interface Props {
  primaryText: string;
  secText: string;
  icon: ReactNode;
}

const ShareCard = ({ icon, primaryText, secText }: Props) => {
  return (
    <Stack
      direction={"row"}
      sx={{ width: "100%", justifyContent: "space-between" }}
    >
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {icon}

        <Stack>
          <TextSm text={primaryText} sx={{ fontWeight: "600" }} />
          <TextXs text={secText} sx={{ color: "var(--text-secondary)" }} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ShareCard;
