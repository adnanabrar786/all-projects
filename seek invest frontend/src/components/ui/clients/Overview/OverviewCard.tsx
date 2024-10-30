import { Stack, SxProps } from "@mui/material";
import IconText from "components/common/IconText";
import TextXl from "components/common/Text/TextXl";

interface Props {
  icon: string;
  text: string;
  secondaryText: string;
  iconWidth?: number;
  iconHeight?: number;
  sx?: SxProps;
}

const OverviewCard = ({
  icon,
  text,
  iconWidth = 20,
  iconHeight = 20,
  secondaryText,
  sx,
}: Props) => {
  return (
    <Stack sx={{ gap: "1.5rem", padding: "0.75rem 1rem", ...sx }}>
      <IconText
        text={text}
        icon={icon}
        iconWidth={iconWidth}
        iconHeight={iconHeight}
      />

      <TextXl text={secondaryText} />
    </Stack>
  );
};

export default OverviewCard;
