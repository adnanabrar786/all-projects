import { Box, Stack } from "@mui/material";
import CustomTooltip from "components/common/CustomTooltip/CustomTooltip";
import TextXxs from "components/common/Text/TextXxs";
import { ThumbDownGreyIcon, ThumbUpGreyIcon } from "constants/images.routes";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import { EPreference } from "enums/framework";
import { IPreference } from "interfaces/assessment";
import Image from "next/image";

const { EMBRACE, OPPOSE } = EPreference;

interface Props {
  val: IPreference;
  embrace: string;
  oppose_n_engage: string;
  index: number;
}

const EmbraceOpposeCard = ({ val, embrace, oppose_n_engage, index }: Props) => {
  const { selectedTopics, setSelectedTopics } = useAssessmentContext();

  let topicDesc = "";
  switch (val.options) {
    case EMBRACE:
      topicDesc = embrace;
      break;
    case OPPOSE:
      topicDesc = oppose_n_engage;
      break;

    default:
      break;
  }

  return (
    <CustomTooltip
      disableHoverListener={!topicDesc}
      title={
        <Stack>
          <TextXxs text="What does this mean?" sx={{ mb: "0.5rem" }} />
          <TextXxs text={topicDesc} />
        </Stack>
      }
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
      <Box
        sx={{
          border:
            selectedTopics[index].preference !== val.id
              ? "1px solid transparent"
              : "none",
        }}
      >
        <Stack
          onClick={() => {
            let tempSelectedTopics = [...selectedTopics];
            tempSelectedTopics[index].preference = val.id;
            setSelectedTopics(tempSelectedTopics);
          }}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            width: "6.25rem",
            height: "6.25rem",
            borderRadius: "0.5rem",
            border:
              selectedTopics[index].preference === val.id
                ? "2px solid var(--primary2)"
                : "1px solid var(--gray-200)",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            gap: "1.12rem",
            cursor: "pointer",
          }}
        >
          <Image
            priority
            src={val.options === EMBRACE ? ThumbUpGreyIcon : ThumbDownGreyIcon}
            alt={"icon"}
            width={24}
            height={24}
          />
          <TextXxs
            text={val.options}
            sx={{
              color: "var(--text-secondary)",
              fontWeight: "500",
              textTransform: "capitalize",
            }}
          />
        </Stack>
      </Box>
    </CustomTooltip>
  );
};

export default EmbraceOpposeCard;
