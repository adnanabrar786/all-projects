import { Stack } from "@mui/material";
import CustomQuestionError from "components/common/CustomQuestionError";
import LabelTopTextField from "components/common/Input/LabelTopTextField";
import { TrashOutlinedIcon } from "constants/images.routes";
import { useAssessmentContext } from "context/assessment/AssessmentContext";
import Image from "next/image";

interface Props {
  option: string;
  optionIndex: number;
  index: number;
  deletable?: boolean;
}

const SingleSelectOption = ({
  option,
  optionIndex,
  index,
  deletable,
}: Props) => {
  const { updateCustomQuestions, customQuestions } = useAssessmentContext();

  const handleOptionChange = (e) => {
    let tempCustomQuestions = [...customQuestions];
    tempCustomQuestions[index].options[optionIndex].text = e.target.value;
    tempCustomQuestions[index].options[optionIndex].error = "";
    updateCustomQuestions(tempCustomQuestions);
  };

  const handleDeleteOption = () => {
    let tempCustomQuestions = [...customQuestions];
    tempCustomQuestions[index].options.splice(optionIndex, 1);
    updateCustomQuestions(tempCustomQuestions);
  };

  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "center",
        gap: "1.44rem",
        marginTop: optionIndex === 0 ? "0" : "1rem",
        img: { cursor: "pointer" },
      }}
    >
      <Stack>
        <LabelTopTextField
          label=""
          placeholder="Enter Option"
          name="question"
          value={option}
          onChange={handleOptionChange}
          sx={{ width: "37.0625rem" }}
        />

        <CustomQuestionError
          error={customQuestions[index].options[optionIndex].error || ""}
        />
      </Stack>
      {!deletable ? (
        <></>
      ) : (
        <Image
          onClick={() => handleDeleteOption()}
          priority
          src={TrashOutlinedIcon}
          alt={"icon"}
          width={24}
          height={24}
        />
      )}
    </Stack>
  );
};

export default SingleSelectOption;
