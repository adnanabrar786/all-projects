import {
  CALCULATE_ASSESSMENT_SCORE,
  CREATE_CUSTOM_ASSESSMENTS,
  DELETE_ASSESSMENT,
  DELETE_CLIENT_ASSESSMENT,
  FRAMEWORK_CHILDREN,
  GET_ASSESSMENTS,
  GET_ASSESSMENTS_FHAS_CATEGORY,
  GET_ASSESSMENT_ANSWER,
  GET_ASSESSMENT_BY_ID,
  GET_ASSESSMENT_ENGAGEMENT,
  GET_ASSESSMENT_OVERVIEW,
  GET_ASSESSMENT_OWNER_DETAILS,
  GET_CUSTOM_ASSESSMENTS,
  GET_DEFAULT_ASSESSMENTS,
  GET_DEFAULT_ASSESSMENT_QUESTIONS,
  GET_PREFERENCES,
  GET_UN_AUTH_ASSESSMENT,
  LAUNCH_FHA,
  OWN_SELECTION_TOPICS,
  PUBLISH_ASSESSMENT,
  RENAME_CUSTOM_ASSESSMENTS,
  SUBMIT_ASSESSMENT_ANSWER,
  VALUE_PROFILE_SUMMARY,
} from "constants/api.routes";
import {
  IAssessmentQuestion,
  ISelectedDefaultQuestions,
  ISubmitAssessmentAnswer,
} from "interfaces/assessment";
import { selectedClientsProps } from "interfaces/common";
import { makeApiRequest } from "./servicesHelper";

export const getAssessments = async (name: string) => {
  return makeApiRequest({
    method: "get",
    url: `${GET_ASSESSMENTS}?name=${name}`,
  });
};

export const getCustomAssessments = async (search: string) => {
  let url = GET_CUSTOM_ASSESSMENTS;

  if (search) {
    url += `?name=${search}`;
  }
  return makeApiRequest({
    method: "get",
    url: url,
  });
};

export const getUnAuthAssessmentsById = async (
  assessmentId: string,
  clientId: string
) => {
  return makeApiRequest({
    method: "get",
    url: GET_UN_AUTH_ASSESSMENT(assessmentId, clientId),
  });
};

export const getAssessmentAnswer = async (
  assessmentId: string,
  question_id: string,
  type: string
) => {
  return makeApiRequest({
    method: "get",
    url: GET_ASSESSMENT_ANSWER(assessmentId, question_id, type),
  });
};

export const getAssessmentsById = async (assessmentId: string) => {
  return makeApiRequest({
    method: "get",
    url: `${GET_ASSESSMENT_BY_ID}/${assessmentId}`,
  });
};

export const getAssessmentOverview = async (assessmentId: string) => {
  return makeApiRequest({
    method: "get",
    url: GET_ASSESSMENT_OVERVIEW(assessmentId),
  });
};

export const getDefaultQuestions = async (assessmentId: string) => {
  return makeApiRequest({
    method: "get",
    url: GET_DEFAULT_ASSESSMENT_QUESTIONS(assessmentId),
  });
};

export const createCustomAssessment = async ({
  name,
  parent_id,
  default_questions,
  questions,
  icon,
}: {
  name: string;
  parent_id: string;
  default_questions: ISelectedDefaultQuestions[];
  questions: IAssessmentQuestion[];
  icon: string;
}) => {
  return makeApiRequest({
    method: "post",
    url: CREATE_CUSTOM_ASSESSMENTS,
    data: {
      data: {
        name,
        parent_id,
        default_questions,
        questions,
        icon,
      },
    },
  });
};

export const renameCustomAssessment = async ({
  name,
  id,
}: {
  name: string;
  id: string;
}) => {
  return makeApiRequest({
    method: "patch",
    url: `${RENAME_CUSTOM_ASSESSMENTS}/${id}/name`,
    data: {
      name,
    },
  });
};

export const launchFHA = async (clientId: string, assessmentId: string) => {
  const { data } = await makeApiRequest({
    method: "post",
    data: { client: clientId },
    url: LAUNCH_FHA(assessmentId),
  });

  if (data && data.data.url) {
    window.open(data.data.url, "_blank");
  }

  return data;
};

export const publishAssessment = async (
  assessmentId: string,
  selectedClients: selectedClientsProps[]
) => {
  let ids = selectedClients.map((selectedClient) => {
    return selectedClient.id;
  });

  const { data } = await makeApiRequest({
    method: "post",
    data: { clients: ids },
    url: PUBLISH_ASSESSMENT(assessmentId),
  });

  return data;
};

export const deleteAssessment = async (id: string) => {
  return makeApiRequest({
    method: "delete",
    url: `${DELETE_ASSESSMENT}/${id}`,
  });
};

export const deleteClientAssessment = async (fhaId: string) => {
  return makeApiRequest({
    method: "delete",
    url: DELETE_CLIENT_ASSESSMENT(fhaId),
  });
};

export const submitAssessmentAnswer = async (
  assessmentAnswers: ISubmitAssessmentAnswer
) => {
  return makeApiRequest({
    method: "post",
    url: SUBMIT_ASSESSMENT_ANSWER,
    data: assessmentAnswers,
  });
};

export const frameworkChildren = async (data: string[]) => {
  return makeApiRequest({
    method: "post",
    url: FRAMEWORK_CHILDREN,
    data: { data: { frameworks: data } },
  });
};

export const getOwnSelectionTopics = async () => {
  return makeApiRequest({
    method: "get",
    url: OWN_SELECTION_TOPICS,
  });
};

export const getPreferences = async () => {
  return makeApiRequest({
    method: "get",
    url: GET_PREFERENCES,
  });
};

export const getDefaultAssessment = async () => {
  return makeApiRequest({ method: "get", url: GET_DEFAULT_ASSESSMENTS });
};

export const calculateAssessmentScore = async (
  assessmentId: string,
  clientId: string
) => {
  return makeApiRequest({
    method: "get",
    url: CALCULATE_ASSESSMENT_SCORE(assessmentId, clientId),
  });
};

export const valueProfileSummary = async (clientId: string) => {
  return makeApiRequest({
    method: "get",
    url: VALUE_PROFILE_SUMMARY(clientId),
  });
};

export const getAssessmentFhasCategory = async () => {
  return makeApiRequest({
    method: "get",
    url: GET_ASSESSMENTS_FHAS_CATEGORY,
  });
};

export const getAssessmentOwnerDetails = async (assessmentId: string) => {
  return makeApiRequest({
    method: "get",
    url: GET_ASSESSMENT_OWNER_DETAILS(assessmentId),
  });
};

export const getAssessmentEngagement = async (assessmentId: string) => {
  return makeApiRequest({
    method: "get",
    url: GET_ASSESSMENT_ENGAGEMENT(assessmentId),
  });
};
