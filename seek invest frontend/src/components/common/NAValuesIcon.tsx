import { Stack } from "@mui/material";
import CustomTooltip from "components/common/CustomTooltip/CustomTooltip";
import TextXs from "components/common/Text/TextXs";
import { InfoCircleIcon } from "constants/images.routes";
import Image from "next/image";

interface Props {
  title: string;
  text: string;
}

const NAValuesIcon = ({ title, text }: Props) => {
  return (
    <CustomTooltip
      title={title}
      placement="top"
      arrow
      sx={{
        ".MuiTooltip-tooltip": {
          backgroundColor: "white",
          color: "var(--text-secondary)",
          boxShadow:
            "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
          span: {
            "::before": {
              backgroundColor: "white",
              boxShadow:
                "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
            },
          },
        },
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          cursor: "pointer",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.25rem",
          bgcolor: "var(--ghost-white)",
          padding: "0.125rem 0.5rem",
          borderRadius: "1rem",
          textAlign: "center",
        }}
      >
        <TextXs
          sx={{
            color: "var(--text-secondary)",
            fontSize: "0.75rem",
            fontWeight: "500",
          }}
          text={text}
        />
        <Image
          priority
          src={InfoCircleIcon}
          alt={"icon"}
          width={12}
          height={12}
        />
      </Stack>
    </CustomTooltip>
  );
};

export default NAValuesIcon;
