import { Stack } from "@mui/material";
import IconText from "components/common/IconText";
import TextProgressBar from "components/common/Progress/TextProgressBar";
import TextMd from "components/common/Text/TextMd";
import TextXs from "components/common/Text/TextXs";
import { ScaleOutlinedIcon } from "constants/images.routes";
import { EPreference } from "enums/framework";
import { IAssessmentResponse } from "interfaces/assessment";

const { EMBRACE, OPPOSE } = EPreference;
interface Props {
  question: string;
  response: IAssessmentResponse[];
}

const Preference = ({ question, response }: Props) => {
  const getWidth = (sideSelected: number, selectedTopics: number) => {
    return (sideSelected / selectedTopics) * 100;
  };

  const totalResponses = response?.reduce(
    (sum, current) => sum + current.total,
    0
  );

  response = response.map((singleRes) => {
    let leftSelected = 0;
    let middleSelected = 0;
    let rightSelected = 0;
    let totalSelected = 0;
    singleRes.list.forEach((list) => {
      totalSelected += list.count;
      switch (list.value) {
        case EMBRACE:
          leftSelected += list.count;
          break;
        case OPPOSE:
          middleSelected += list.count;
          break;

        default:
          break;
      }
    });

    return {
      ...singleRes,
      leftSelected,
      middleSelected,
      rightSelected,
      totalSelected,
    };
  });

  return (
    <Stack
      sx={{
        border: "1px solid var(--border-color)",
        padding: "2.5rem 1.69rem",
        borderRadius: " 0.5rem",
      }}
    >
      <TextMd
        text={question}
        sx={{ fontWeight: "700", lineHeight: "1.75rem" }}
      />

      <Stack
        direction={"row"}
        sx={{ gap: "1rem", alignItems: "center", pt: "0.5rem", mb: "2rem" }}
      >
        <IconText
          icon={ScaleOutlinedIcon}
          iconWidth={24}
          iconHeight={24}
          text="Preference and Weighting"
          bg
        />

        <TextXs
          text={`${totalResponses} responses`}
          sx={{ color: "var(--text-secondary)" }}
        />
      </Stack>

      {response.map((preference, index) => (
        <Stack key={index}>
          <Stack
            direction={"row"}
            sx={{ justifyContent: "space-between", mt: "2rem", mb: "1rem" }}
          >
            <Stack
              direction={"row"}
              sx={{
                gap: "0.25rem",
                color: "var(--text-secondary)",
                alignItems: "center",
              }}
            >
              <TextXs text={`${preference.percentage}`} />
              <TextXs text={"•"} sx={{ fontWeight: "600" }} />
              <TextXs text={preference.name} sx={{ fontWeight: "600" }} />
            </Stack>

            <TextXs
              text={`${preference.total} selected this topic`}
              sx={{ color: "var(--text-secondary)" }}
            />
          </Stack>

          <TextProgressBar
            leftText={`${preference.leftSelected} embrace this topic`}
            middleText={`${preference.middleSelected} oppose this topic`}
            rightText={`${preference.rightSelected} avoid this topic`}
            leftWidth={getWidth(
              preference.leftSelected,
              preference.totalSelected
            )}
            middleWidth={getWidth(
              preference.middleSelected,
              preference.totalSelected
            )}
            rightWidth={getWidth(
              preference.rightSelected,
              preference.totalSelected
            )}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default Preference;
