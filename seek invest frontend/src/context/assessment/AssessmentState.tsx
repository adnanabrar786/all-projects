import AssessmentContext from "context/assessment/AssessmentContext";
import {
  IAssessmentContext,
  IAssessmentQuestion,
  IFramework,
  ISelectedPreferenceValue,
  ISelectionTopic,
} from "interfaces/assessment";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

const AssessmentState = ({ children }: Props) => {
  const [PreferenceModal, setPreferenceModal] = useState<boolean>(false);
  const [deleteAssessmentModal, setDeleteAssessmentModal] =
    useState<boolean>(false);
  const [selectedFrameWork, setSelectedFrameWork] = useState<IFramework | null>(
    null
  );
  const [selectedFrameWorkId, setSelectedFrameWorkId] = useState<string>("");
  const [selectedFrameworkChildIds, setSelectedFrameworkChildIds] =
    useState<Object>({});

  const [customQuestions, setCustomQuestions] = useState<IAssessmentQuestion[]>(
    typeof localStorage !== "undefined" &&
      localStorage.getItem("customQuestions")
      ? JSON.parse(localStorage.getItem("customQuestions")!)
      : []
  );

  const [selectedPreferenceValues, setSelectedPreferenceValues] = useState<
    ISelectedPreferenceValue[]
  >([]);

  const [selectedTopics, setSelectedTopics] = useState<ISelectionTopic[]>([]);

  const updateCustomQuestions = (newData: IAssessmentQuestion[]) => {
    setCustomQuestions(newData);
    localStorage.setItem("customQuestions", JSON.stringify(newData));
  };

  const deleteCustomQuestions = () => {
    setCustomQuestions([]);
    localStorage.setItem("customQuestions", JSON.stringify([]));
  };

  const state: IAssessmentContext = {
    customQuestions,
    setCustomQuestions,
    updateCustomQuestions,
    deleteCustomQuestions,
    selectedPreferenceValues,
    setSelectedPreferenceValues,
    selectedTopics,
    setSelectedTopics,
    PreferenceModal,
    setPreferenceModal,
    deleteAssessmentModal,
    setDeleteAssessmentModal,
    selectedFrameworkChildIds,
    setSelectedFrameworkChildIds,
    selectedFrameWork,
    setSelectedFrameWork,
    selectedFrameWorkId,
    setSelectedFrameWorkId,
  };

  return (
    <AssessmentContext.Provider value={state}>
      {children}
    </AssessmentContext.Provider>
  );
};

export default AssessmentState;
