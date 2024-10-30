import { Stack } from "@mui/material";
import CustomCheckBox from "components/common/CheckBox/CustomCheckBox";
import { TickCheckboxIcon, UnCheckboxIcon } from "constants/images.routes";
import { SyntheticEvent } from "react";

interface Props {
  label: string;
  onChange?: (event: SyntheticEvent<Element, Event>, checked: boolean) => void;
  value: boolean;
}

const MultiChoiceQuestion = ({ label, onChange, value }: Props) => {
  return (
    <Stack
      sx={{
        backgroundColor: "var(--background-color2)",
        borderRadius: "0.5rem",
        border: "1px solid var(--gray-200)",
      }}
    >
      <CustomCheckBox
        checked={value}
        checkedIcon={TickCheckboxIcon}
        icon={UnCheckboxIcon}
        label={label}
        onChange={onChange}
      />
    </Stack>
  );
};

export default MultiChoiceQuestion;
