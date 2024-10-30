import { Stack } from "@mui/material";
import CustomCheckBox from "components/common/CheckBox/CustomCheckBox";
import LabelTopTextField from "components/common/Input/LabelTopTextField";
import { TickCheckboxIcon, UnCheckboxIcon } from "constants/images.routes";

interface Props {
  clientsTopicList: any;
  selectedTopics: any;
  selectedTopic: any;
  searchClientValueTopic: string;
  setSearchClientValueTopic: (value: string) => void;
  handleInnerTopicClick: (topic: Record<string, string>) => void;
}

const FilterInnerTopics = ({
  searchClientValueTopic,
  setSearchClientValueTopic,
  clientsTopicList,
  selectedTopic,
  selectedTopics,
  handleInnerTopicClick,
}: Props) => {
  const clientsTopics = clientsTopicList.filter((topic) =>
    topic.name
      .toLowerCase()
      .includes(searchClientValueTopic.toLocaleLowerCase())
  );

  return (
    <Stack>
      <LabelTopTextField
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
              boxShadow: "none",
            },
          },
        }}
        sxContainer={{
          borderBottomRightRadius: "0rem",
          borderBottomLeftRadius: "0rem",
        }}
        placeholder="Search property"
        value={searchClientValueTopic}
        onChange={(e) => setSearchClientValueTopic(e.target.value)}
      />

      <Stack
        sx={{
          borderTop: "1px solid var(--gray-100)",
          padding: "0.625rem 0.875rem",
          maxHeight: "23rem",
          overflowY: "auto",
        }}
      >
        {clientsTopics.map((topic, index) => {
          return (
            <CustomCheckBox
              key={index}
              checked={selectedTopics[selectedTopic].includes(topic)}
              icon={UnCheckboxIcon}
              checkedIcon={TickCheckboxIcon}
              label={topic.name}
              onChange={() => handleInnerTopicClick(topic)}
              sxText={{
                fontSize: "0.75rem",
                fontWeight: "500",
                color: "var(--text-secondary)",
                textTransform: "capitalize",
              }}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default FilterInnerTopics;
