import { Box, Grid, Slider, Stack } from "@mui/material";
import Chip from "components/common/Chip/Chip";
import CustomTooltip from "components/common/CustomTooltip/CustomTooltip";
import TextXs from "components/common/Text/TextXs";
import TextXxs from "components/common/Text/TextXxs";
import EmbraceOpposeCard from "components/ui/assessments/FinancialAssessment/Preference/Details/EmbraceOpposeCard";
import { InfoCircleIcon } from "constants/images.routes";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import usePreferenceData from "hooks/usePreferenceData";
import { ISelectionTopic } from "interfaces/assessment";
import Image from "next/image";

interface Props {
  topic: ISelectionTopic;
  index: number;
}

const FinancialPreference = ({ topic, index }: Props) => {
  const { selectedTopics, setSelectedTopics } = useAssessmentContext();
  const { preferences } = usePreferenceData();

  const handleSliderChange = (value: number) => {
    let tempSelectedPreferenceValues = [...selectedTopics];
    tempSelectedPreferenceValues[index].value = value;
    setSelectedTopics(tempSelectedPreferenceValues);
  };

  return (
    <Grid container sx={{ alignItems: "center" }} spacing={6}>
      <Grid item xs={4}>
        <Stack
          sx={{
            borderRadius: " 0.5rem",
            backgroundColor: topic.background_color || "var(--purple-light)",
            border: "2px solid var(--primary2)",
            width: "13.8125rem",
            position: "relative",
          }}
        >
          <TextXs
            text={topic.parent ? topic.parent.name : ""}
            sx={{
              margin: "0.5rem 0.13rem 0.5rem 1rem",
              fontSize: "0.625rem",
              fontWeight: "500",
              lineHeight: "0.625rem",
              textTransform: "uppercase",
            }}
          />

          <Stack
            direction={"row"}
            sx={{
              padding: "1.5rem",
              minHeight: "2.5rem",
              justifyContent: "space-between",
              backgroundColor: "white",
              borderRadius: "0.5rem",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                gap: "0.5rem",
              }}
            >
              <Stack>
                <Image
                  priority
                  src={topic.icon}
                  alt={"icon"}
                  width={24}
                  height={24}
                />
              </Stack>

              <TextXs
                sx={{
                  marginRight: "0.4rem",
                  color: "var(--text-primary)",
                  fontWeight: "600",
                  lineHeight: "1.25rem",
                }}
                text={topic.name}
              />
            </Stack>

            <CustomTooltip
              title={topic.description}
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
                  cursor: "pointer",
                  position: "absolute",
                  right: "0.75rem",
                  bottom: "0.75rem",
                }}
              >
                <Image
                  priority
                  src={InfoCircleIcon}
                  alt={"icon"}
                  width={16}
                  height={16}
                />
              </Box>
            </CustomTooltip>
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={4}>
        <Stack direction={"row"} sx={{ gap: "1.5rem" }}>
          {preferences &&
            preferences.map((val, i) => (
              <EmbraceOpposeCard
                key={val.options}
                val={val}
                embrace={topic.embrace}
                oppose_n_engage={topic.oppose_n_engage}
                index={index}
              />
            ))}
        </Stack>
      </Grid>

      <Grid item xs={4}>
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            height: "4.20rem",
            borderRadius: "0.5rem",
            border: "1px solid var(--gray-200)",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            gap: "1.12rem",
            cursor: "pointer",
            padding: "1rem",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextXxs text={"Importance"} sx={{ fontWeight: "500" }} />
            <Chip
              text={topic.value == 0 ? "None" : `${topic.value}`}
              sx={{ border: "1px solid var(--gray-200)" }}
            />
          </Stack>
          <Slider
            valueLabelDisplay="auto"
            sx={{
              width: "95%",
              mr: "1rem",
              color: "var(--primary)",
              height: 6,

              "& .MuiSlider-rail": {
                bgcolor: "var(--lightest-blue)",
              },

              "& .MuiSlider-thumb": {
                height: 20,
                width: 20,
                backgroundColor: "#fff",
                border: "2px solid var(--primary)",

                "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                  boxShadow: "0px 0px 0px 5px var(--lightest-blue)",
                },
              },
              "& .MuiSlider-valueLabel": {
                borderRadius: "0.5rem",
                backgroundColor: "white",
                color: "var(--text-primary)",
                fontSize: "0.75rem",
                fontWeight: "500",
                padding: "0.5rem 1rem",
                boxShadow:
                  "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
              },
            }}
            value={Number(topic.value)}
            onChange={(_, value) => handleSliderChange(Number(value))}
            defaultValue={0}
            step={1}
            min={0}
            max={10}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default FinancialPreference;
