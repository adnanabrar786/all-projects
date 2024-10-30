import { SHARE_ASSESSMENT } from "constants/pages.routes";
import { EQuestionType, TEMPLATE_ASSESSMENT } from "enums/assessment";
import { EAllAssessments } from "enums/enums";
import { IDefaultAssessment, INewAssessment } from "interfaces/assessment";
const { VALUES_ASSESSMENT, RISK_ASSESSMENT } = TEMPLATE_ASSESSMENT;

// Function to create an object with assessments
const createAssessmentsObject = (data) => {
  const assessments = data.reduce((assessmentsArray, element) => {
    assessmentsArray.push(...(element.assessments || []));
    return assessmentsArray;
  }, []);

  return { assessments };
};

export const getAssessmentTemplates = (
  newAssessments: INewAssessment[],
  category: string
) => {
  if (!newAssessments) {
    return;
  }

  let data: INewAssessment | undefined;

  if (category === EAllAssessments.ALL_ASSESSMENTS) {
    return createAssessmentsObject(newAssessments) as INewAssessment;
  }

  data = newAssessments.find((newAssessment) => {
    return newAssessment.id.toLowerCase() === category;
  });

  return data;
};

export const getQuestionType = (questionType: string) => {
  const {
    FRAMEWORK,
    MULTI_CHOICE,
    MULTI_RESPONSE,
    OPEN_TEXT,
    RATING_SCALE,
    SINGLE_CHOICE,
    AGREE_DISAGREE,
  } = EQuestionType;

  switch (questionType) {
    case FRAMEWORK:
      return "Framework";
    case MULTI_CHOICE:
      return "Multi Choice";
    case MULTI_RESPONSE:
      return "Multi Response";
    case OPEN_TEXT:
      return "Open Text";
    case RATING_SCALE:
      return "Rating Scale";
    case SINGLE_CHOICE:
      return "Single Choice";
    case AGREE_DISAGREE:
      return "Agree/Disagree";
    default:
      return "";
  }
};

export function getDefaultAssessmentsLink(
  defaultAssessment: IDefaultAssessment[]
) {
  let valuesDeterminationLink = "";
  let riskAssessmentLink = "";

  for (let i = 0; i < defaultAssessment.length; i++) {
    const link = `${SHARE_ASSESSMENT}/${defaultAssessment[i].id}`;
    switch (defaultAssessment[i].name) {
      case VALUES_ASSESSMENT:
        valuesDeterminationLink = link;
        break;
      case RISK_ASSESSMENT:
        riskAssessmentLink = link;
        break;

      default:
        break;
    }
  }

  return {
    valuesDeterminationLink,
    riskAssessmentLink,
  };
}
