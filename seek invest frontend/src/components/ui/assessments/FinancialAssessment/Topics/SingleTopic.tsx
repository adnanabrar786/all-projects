import { Grid, Stack } from "@mui/material";
import TextXs from "components/common/Text/TextXs";
import { InfoQuestionIcon } from "constants/images.routes";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import { ISelectionTopic } from "interfaces/assessment";
import Image from "next/image";
import { arrayContainObject, removeObjectFromArray } from "utils/array";

interface Props {
  topic: ISelectionTopic;
  handleClickOpen: (topic: ISelectionTopic) => void;
}

const SingleTopic = ({ topic, handleClickOpen }: Props) => {
  const { selectedTopics, setSelectedTopics } = useAssessmentContext();

  const arrayContain = arrayContainObject(selectedTopics, topic, "id");

  return (
    <Grid xs={3} item>
      <Stack
        onClick={() => {
          if (arrayContain) {
            let tempSelectedTopics = [...selectedTopics];

            setSelectedTopics(
              removeObjectFromArray(tempSelectedTopics, "id", topic.id)
            );
          } else {
            setSelectedTopics([...selectedTopics, topic]);
          }
        }}
        sx={{
          borderRadius: " 0.5rem",
          backgroundColor: topic.background_color || "var(--purple-light)",
          border: arrayContain
            ? "2px solid var(--primary2)"
            : "2px solid transparent",
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
            margin: "0.12rem",
            padding: "1rem",
            height: "4.5rem",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: " 0.5rem",
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
                marginRight: "0.2rem",
                color: "var(--text-primary)",
                fontWeight: "600",
                lineHeight: "1.25rem",
              }}
              text={topic.name}
            />
          </Stack>

          <Stack
            sx={{
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleClickOpen(topic);
            }}
          >
            <Image
              priority
              src={InfoQuestionIcon}
              alt={"icon"}
              width={24}
              height={24}
            />
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default SingleTopic;
