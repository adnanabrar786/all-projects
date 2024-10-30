import { Stack, SxProps } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import { EClientAssessmentStatus } from "enums/assessment";

const { COMPLETED, IN_PROGRESS, SENT } = EClientAssessmentStatus;

interface Props {
  text: string;
  secText: string;
  sx?: SxProps;
  sxText?: SxProps;
  sxSec?: SxProps;
  label?: string;
}
const StackText = ({ text, secText, sx, sxText, sxSec, label }: Props) => {
  let statusBg = "transparent";
  let finalLabel = "";

  switch (label) {
    case COMPLETED:
      statusBg = "var(--green-lightest)";
      finalLabel = "Completed";
      break;
    case SENT:
      statusBg = "var(--gray-100)";
      finalLabel = "Not Started";
      break;
    case IN_PROGRESS:
      statusBg = "var(--yellow-lightest)";
      finalLabel = "In Progress";
      break;

    default:
      break;
  }

  return (
    <Stack
      direction={"row"}
      sx={{ alignItems: "flex-end", gap: "0.5rem", ...sx }}
    >
      <Stack>
        <TextXs
          text={text}
          sx={{ color: "var(--text-secondary)", ...sxText }}
        />
        <TextXs
          text={secText}
          sx={{ color: "var(--primary)", fontWeight: "500", ...sxSec }}
        />
      </Stack>
      {label && (
        <Stack
          sx={{
            backgroundColor: statusBg,
            padding: "0.12em 0.5rem",
            borderRadius: "1rem",
            width: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextXs
            sx={{
              fontSize: "0.75rem",
              fontWeight: "500",
              lineHeight: "1.125rem",
            }}
            text={finalLabel}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default StackText;
