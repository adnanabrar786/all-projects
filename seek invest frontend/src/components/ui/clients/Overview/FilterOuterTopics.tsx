import { Stack } from "@mui/material";
import ListButton from "components/common/Button/ListButton";
import LabelTopTextField from "components/common/Input/LabelTopTextField";
import { IClientFilter } from "interfaces/client";
import { useState } from "react";

interface Props {
  onClickTopic: (value: IClientFilter) => void;
  clientFilterData: IClientFilter[];
}

const FilterOuterTopics = ({ onClickTopic, clientFilterData }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTopics =
    clientFilterData &&
    clientFilterData.filter((topic) =>
      topic.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
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
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Stack
        sx={{
          borderTop: "1px solid var(--gray-100)",
        }}
      >
        {filteredTopics &&
          filteredTopics.map((topic, index) => {
            return (
              <ListButton
                onClick={() => {
                  onClickTopic(topic);
                }}
                sxTitle={{
                  lineHeight: "1.25rem",
                  color: "var(--text-secondary)",
                }}
                key={topic.key}
                text={topic.name}
              />
            );
          })}
      </Stack>
    </>
  );
};

export default FilterOuterTopics;
