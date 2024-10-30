import TextTopProgressbar from "components/common/Progress/TextTopProgressbar";
import QuestionCard from "components/ui/assessments/FHAs/Overview/Questions/QuestionCard";
import {
  FaceContentIcon,
  FaceFrownIcon,
  FaceHappyIcon,
  FaceNeutralIcon,
  FaceSadIcon,
  FiveStarIcon,
  FourStarIcon,
  OneStarIcon,
  RatingScaleIcon,
  ThreeStarIcon,
  TwoStarIcon,
} from "constants/images.routes";
import { EScaleType } from "enums/assessment";
import { IAssessmentResponse, IStarIcon } from "interfaces/assessment";

interface Props {
  scaleType: string;
  question: string;
  response: IAssessmentResponse[];
}

const RatingScale = ({ scaleType, question, response }: Props) => {
  const fetchData = {
    totalResponses: 10,
    scaleType: scaleType,
    point1: 2,
    point2: 3,
    point3: 0,
    point4: 1,
    point5: 0,
  };

  let data = response.map((value, index) => {
    return {
      ...value,
      name: `${index + 1}`,
      iconWidth: 16,
      iconHeight: 16,
    };
  });

  const faces = ["Sad", "Frown", "Neutral", "Content", "Happy"];

  const facesIcons: IStarIcon[] = [
    {
      icon: FaceSadIcon,
    },
    {
      icon: FaceFrownIcon,
    },

    {
      icon: FaceNeutralIcon,
    },
    {
      icon: FaceContentIcon,
    },
    {
      icon: FaceHappyIcon,
    },
  ];

  const starIcon: IStarIcon[] = [
    {
      icon: OneStarIcon,
      width: 16,
      height: 16,
    },
    {
      icon: TwoStarIcon,
      width: 36,
      height: 16,
    },

    {
      icon: ThreeStarIcon,
      width: 56,
      height: 16,
    },
    {
      icon: FourStarIcon,
      width: 76,
      height: 16,
    },
    {
      icon: FiveStarIcon,
      width: 96,
      height: 16,
    },
  ];

  data?.forEach((_, index) => {
    if (fetchData.scaleType === EScaleType.NUMBER) {
      data[index].value = `${index + 1} ${index === 0 ? "Point" : "Points"}`;
    } else if (fetchData.scaleType === EScaleType.STAR) {
      data[index].name = "";
      data[index].leftTextIcon = starIcon[index].icon;
      data[index].iconWidth = starIcon[index].width || 16;
      data[index].iconHeight = starIcon[index].height || 16;
    } else if (fetchData.scaleType === EScaleType.SMILEY) {
      data[index].name = faces[index];
      data[index].leftTextIcon = facesIcons[index].icon;
    }
  });

  return (
    <QuestionCard
      question={question}
      questionSubText={`${fetchData.totalResponses} responses`}
      icon={RatingScaleIcon}
      iconText="Rating scale"
    >
      {data.map((singleData, index) => (
        <TextTopProgressbar
          key={index}
          width={singleData.percentage}
          leftText={singleData.name}
          rightText={`${singleData.count}`}
          leftTextIcon={singleData.leftTextIcon}
          iconWidth={singleData.iconWidth}
          iconHeight={singleData.iconHeight}
        />
      ))}
    </QuestionCard>
  );
};

export default RatingScale;
