import TextTopProgressbar from "components/common/Progress/TextTopProgressbar";
import QuestionCard from "components/ui/assessments/FHAs/Overview/Questions/QuestionCard";
import { MultiSelectIcon } from "constants/images.routes";
import { IAssessmentResponse, Options } from "interfaces/assessment";

interface Props {
  question: string;
  options: Options[];
  response: IAssessmentResponse[];
}

const MultiSelect = ({ question, options, response }: Props) => {
  const totalResponses = response?.reduce(
    (sum, current) => sum + current.count,
    0
  );

  return (
    <QuestionCard
      question={question}
      questionSubText={`${totalResponses || 0} responses`}
      icon={MultiSelectIcon}
      iconText="Multiple Choice Multi Select"
    >
      {options.map((option, index) => (
        <TextTopProgressbar
          key={index}
          width={response && response[index] ? response[index].percentage : 0}
          leftText={option.text}
          rightText={`${
            response && response[index] ? response[index].count : 0
          }`}
        />
      ))}
    </QuestionCard>
  );
};

export default MultiSelect;
