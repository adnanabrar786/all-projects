import { Stack, SxProps } from "@mui/material";
import CustomDivider from "components/common/Divider/CustomDivider";
import TextXs from "components/common/Text/TextXs";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  secHeader?: ReactNode;
  sx?: SxProps;
  sxTitle?: SxProps;
  sxContainer?: SxProps;
  sxRow?: SxProps;
  hideDivider?: boolean;
}

const ClientSummaryCard = ({
  title,
  children,
  sx,
  sxTitle,
  sxContainer,
  sxRow,
  secHeader,
  hideDivider,
}: Props) => {
  return (
    <Stack
      sx={{
        border: "1px solid var(--gray-200)",
        borderRadius: "0.5rem",
        ...sxContainer,
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          ...sxRow,
        }}
      >
        <TextXs
          sx={{
            padding: "0.62rem 1rem",
            fontWeight: "600",
            lineHeight: "1.25rem",
            ...sxTitle,
          }}
          text={title}
        />

        {secHeader}
      </Stack>
      {!hideDivider && <CustomDivider />}

      <Stack
        sx={{
          padding: "0.62rem 1rem",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0.5rem",
          ...sx,
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default ClientSummaryCard;
