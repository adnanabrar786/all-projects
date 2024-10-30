import { Stack, SxProps } from "@mui/material";
import IconText from "components/common/IconText";
import {
  CheckColoredIcon,
  CheckLightIcon,
  CrossIcon,
} from "constants/images.routes";

interface Props {
  highlight?: boolean;
  sx?: SxProps;
}
const YesOrNo = ({ sx, highlight }: Props) => {
  return (
    <Stack direction={"row"} sx={{ ...sx }}>
      <IconText
        sxRow={{
          padding: "0.62rem 1rem",
          border: highlight
            ? "0.518px solid var(--primary)"
            : "0.518px solid var(--gray-300)",
          borderRight: "none",
          borderRadius: "0.5rem 0rem 0rem 0.5rem",
          "> p": {
            color: highlight ? "var(--primary)" : "var(--gray-300)",
          },
        }}
        iconWidth={21}
        iconHeight={20}
        text="Agree"
        icon={highlight ? CheckColoredIcon : CheckLightIcon}
      />
      <IconText
        sxRow={{
          padding: "0.62rem 1rem",
          border: "0.518px solid var(--gray-300)",
          borderLeft: highlight
            ? "0.518px solid var(--primary)"
            : "0.518px solid var(--gray-300)",
          borderRadius: "0rem 0.5rem 0.5rem 0rem",
          "> p": {
            color: highlight ? "var(--text-primary)" : "var(--gray-300)",
          },
        }}
        iconWidth={21}
        iconHeight={20}
        text="Disagree"
        icon={CrossIcon}
      />
    </Stack>
  );
};

export default YesOrNo;
