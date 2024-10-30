import { Stack } from "@mui/material";
import CustomizedProgressBars from "components/common/Progress/Progress";
import TextXs from "components/common/Text/TextXs";
import { ICompareProposalTopics } from "interfaces/proposal";

interface Props {
  topics: ICompareProposalTopics[];
}

const TopicValues = ({ topics }: Props) => {
  return (
    <>
      <Stack>
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            height: "3rem",
            paddingLeft: "2rem",
          }}
        >
          <TextXs
            sx={{
              fontWeight: "600",
              lineHeight: "1.25rem",
            }}
            text=""
          />
        </Stack>

        {topics.map((topic, index) => {
          let color = "transparent";
          const value = topic.score;

          if (value >= 0 && value <= 33) {
            color = "var(--carnelian)";
          } else if (value >= 34 && value <= 66) {
            color = "var(--mikado-yellow)";
          } else if (value >= 67 && value <= 100) {
            color = "var(--green-medium)";
          }

          return (
            <Stack
              sx={{
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor:
                  index % 2 === 1 ? "transparent" : "var(--gray-100)",
                paddingLeft: "2rem",
                height: "4.8125rem",
                justifyContent: "center",
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  gap: "0.69rem",
                }}
              >
                <TextXs
                  sx={{
                    lineHeight: "1.25rem",
                  }}
                  text={`${topic.score.toFixed()}`}
                />
                <Stack
                  sx={{
                    backgroundColor: "var(aqua)",
                    width: "4.9375rem",
                  }}
                >
                  <CustomizedProgressBars
                    value={topic.score}
                    sx={{
                      backgroundColor: color,
                      width: "4.9375rem",
                    }}
                  />
                </Stack>
              </Stack>
              {/* <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              gap: "0.25rem",
              backgroundColor: "var(--light-golden)",
              padding: "0.25rem",
              borderRadius: "624.9375rem",
              border: "1px solid var(--golden)",
            }}
          >
            <TextXs
              sx={{
                lineHeight: "1.25rem",
                fontSize: "0.75rem",
                fontWeight: "500",
                color: "var(--dark-golden)",
              }}
              text="Contains 5% of Alcohol"
            />
          </Stack> */}
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};

export default TopicValues;
