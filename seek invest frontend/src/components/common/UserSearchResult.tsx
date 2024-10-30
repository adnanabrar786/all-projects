import { Stack } from "@mui/material";
import TextButton from "components/common/Button/TextButton";
import TextXs from "components/common/Text/TextXs";
import { MouseEventHandler } from "react";

interface Props {
  primaryText: string;
  secText?: string;
  onClick?: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onClickBox?: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}
const UserSearchResult = ({
  primaryText,
  secText,
  onClick,
  onClickBox,
}: Props) => {
  return (
    <Stack
      direction={"row"}
      onClick={onClickBox}
      sx={{
        justifyContent: "space-between",
        padding: "0.75rem 0.75rem",
        gap: "1.5rem",
        ":hover": {
          backgroundColor: "var(--gray-100)",
        },
      }}
    >
      <TextXs
        sx={{
          color: "var(--text-secondary)",

          lineHeight: "1.25rem",
        }}
        text={primaryText}
      />
      {secText && (
        <TextButton
          onClick={onClick}
          text={secText}
          sx={{
            color: "var(--primary)",
            fontWeight: "500",
            lineHeight: "1.25rem",
          }}
        />
      )}
    </Stack>
  );
};

export default UserSearchResult;
