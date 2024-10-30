import { IAssessmentContext } from "interfaces/assessment";
import { createContext, useContext } from "react";

const AssessmentContext = createContext<IAssessmentContext>({
  customQuestions: [],
  setCustomQuestions: () => {},
  updateCustomQuestions() {},
  deleteCustomQuestions() {},
  selectedPreferenceValues: [],
  setSelectedPreferenceValues: () => {},
  selectedTopics: [],
  setSelectedTopics: () => {},
  PreferenceModal: false,
  setPreferenceModal: () => {},
  deleteAssessmentModal: false,
  setDeleteAssessmentModal: () => {},
  selectedFrameworkChildIds: [],
  setSelectedFrameworkChildIds: () => {},
  selectedFrameWork: null,
  setSelectedFrameWork: () => {},
  selectedFrameWorkId: "",
  setSelectedFrameWorkId: () => {},
});

export const useAssessmentContext = () => useContext(AssessmentContext);

export default AssessmentContext;
