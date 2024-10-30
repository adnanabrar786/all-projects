import { Box, Stack } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import { ICompareProposalTopics } from "interfaces/proposal";
import Image from "next/image";

type Props = {
  topics: ICompareProposalTopics[];
};

const TopicsSummary = ({ topics }: Props) => {
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
            text="Risk"
          />
        </Stack>

        {topics.map((topic, idx) => {
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
              key={idx}
              direction={"row"}
              sx={{
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor:
                  idx % 2 === 1 ? "transparent" : "var(--gray-100)",
                paddingLeft: "2rem",
                height: "4.8125rem",
              }}
            >
              <Box
                sx={{
                  width: "0.375rem",
                  height: "0.375rem",
                  borderRadius: "50%",
                  backgroundColor: color,
                }}
              />
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                {topic.icon && (
                  <Image
                    priority
                    src={topic.icon}
                    alt={"icon"}
                    width={24}
                    height={24}
                  />
                )}
                <TextXs
                  sx={{
                    lineHeight: "1.25rem",
                  }}
                  text={topic.code}
                />
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};

export default TopicsSummary;
