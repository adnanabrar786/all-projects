import { Stack, SxProps } from "@mui/material";
import TextButton from "components/common/Button/TextButton";
import Chip from "components/common/Chip/Chip";
import TextXs from "components/common/Text/TextXs";

interface Props {
  text: string;
  actionText: string;
  isDisabled?: boolean;
  onClick?: () => void;
  onClickResult?: () => void;
  chip?: boolean;
  sx?: SxProps;
  highlightTerm?: string;
  boldText?: boolean;
}

const SearchResult = ({
  text,
  actionText,
  onClick,
  isDisabled,
  chip,
  onClickResult,
  sx,
  highlightTerm,
  boldText,
}: Props) => {
  const highlightSearchTerm = (text, term) => {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedTerm})`, "gi");

    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Stack
      onClick={onClickResult}
      direction={"row"}
      sx={{
        justifyContent: "space-between",
        margin: "0.75rem 0.5rem",
        gap: "1.5rem",
        alignItems: "center",
        ...sx,
      }}
    >
      <TextXs
        sx={{
          lineHeight: "1.25rem",
        }}
        text={
          highlightTerm && boldText
            ? highlightSearchTerm(text, highlightTerm)
            : text
        }
      />

      {chip ? (
        <Chip
          text={actionText}
          sx={{
            textTransform: "capitalize",
            backgroundColor: "var(--gray-100)",
          }}
        />
      ) : (
        <TextButton
          disabled={isDisabled}
          onClick={onClick}
          text={actionText}
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

export default SearchResult;
