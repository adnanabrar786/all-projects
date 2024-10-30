import { OPTION_ORIENTATIONS } from "enums/enums";
import { EFrameworkType } from "enums/framework";

export interface IQuestionType {
  type: string;
  icon: string;
  component: string;
  questionNumber: number;
  required: boolean;
}

export interface IAssessmentContext {
  customQuestions: IAssessmentQuestion[] | [];
  setCustomQuestions: (customQuestions: IAssessmentQuestion[] | []) => void;
  updateCustomQuestions: (newData: IAssessmentQuestion[]) => void;
  deleteCustomQuestions: () => void;
  selectedPreferenceValues: ISelectedPreferenceValue[];
  setSelectedPreferenceValues: (
    selectedPreferenceValues: ISelectedPreferenceValue[]
  ) => void;
  selectedTopics: ISelectionTopic[];
  setSelectedTopics: (selectedTopics: ISelectionTopic[]) => void;
  PreferenceModal: boolean;
  setPreferenceModal: (PreferenceModal: boolean) => void;
  deleteAssessmentModal: boolean;
  setDeleteAssessmentModal: (PreferenceModal: boolean) => void;
  selectedFrameworkChildIds: Object;
  setSelectedFrameworkChildIds: (value: Object) => void;
  selectedFrameWork: IFramework | null;
  setSelectedFrameWork: (value: IFramework | null) => void;
  selectedFrameWorkId: string;
  setSelectedFrameWorkId: (value: string) => void;
}

export interface IFHA {
  id: string;
  folderId: string;
  name: string;
  responses: number;
  responseTime: Date;
}

export interface IFHATemplate {
  id: string;
  name: string;
  question: string;
  bgImage: string;
  category: string;
  textField?: boolean;
  placeholder?: string;
  component?: string;
  checkBoxes?: boolean;
  checkBoxesArr?: string[];
  comingSoon: boolean;
}

export interface INewAssessment {
  id: string;
  name: string;
  assessments: INewAssessmentTemplate[];
}

export interface INewAssessmentTemplate {
  id: string;
  name: string;
  icon: string;
  url: string;
  bgImage?: string;
  parent_id?: string;
  category?: string;
  type: string;
  comingSoon: boolean;
}
export interface FinancialAssessmentAccordionItem {
  id: number;
  icon: string;
  title: string;
  text: string;
  visitSite?: string;
  buttonText: string;
  bgColor: string;
  link: string;
}

export interface FINANCIALTOPICSLIST {
  Category: string;
  topics: string;
  icon: string;
  bgColor: string;
}

export interface FINANCIALPREFERENCELIST {
  category: string;
  topics: string;
  icon: string;
  bgColor: string;
  score: number;
}
export interface INewAssessment {
  id: string;
  name: string;
  assessments: INewAssessmentTemplate[];
}

export interface IFinancialAssessment {
  assessment_id: string;
  name: string;
  firm_id: string;
  questions: IAssessmentQuestion[];
  fha_has_client: string;
  firm_name: string;
  firm_logo: string;
  firm_member_name: string;
  firm_member_phone: string;
  firm_member_email: string;
  assessment_template_name: string;
  current_status: string;
  completed_status: string;
  submitted_questions_count: number;
  total_questions: number;
}

export interface IFramework {
  frameworks: {
    id: number;
    name: string;
    description: string;
    url: string;
    icon: string;
    parent_id: string;
    created_at: string;
    updated_at: string;
    frameworks: IFrameworkChild[];
  };
}

export interface IFrameworkChild {
  id: number;
  icon: string;
  name: string;
  url: string;
  description: string;
}

export interface IMultiResponse {
  id: string;
  icon: string;
  sequence: number;
  question: string;
  description: string;
  default_response: string;
}

export interface Options {
  id?: string;
  text: string;
  icon?: string;
  error?: string;
  percentage?: number;
  styled_text?: string | null;
  orientation?: OPTION_ORIENTATIONS;
}

export interface RatingScale {
  id?: string;
  start_value: number;
  end_value: number;
  start_value_label?: string;
  end_value_label?: string;
  rating_type: string;
}

export interface IAssessmentQuestion {
  error: string;
  questionError: string;
  id: string;
  icon: string;
  title: string;
  question: string;
  description: string;
  questionsType: string;
  is_default_question: boolean;
  is_required: boolean;
  sequence: number;
  type: string;
  options: Options[];
  code: string;
  ratings: RatingScale;
  question_has_frameworks: IFramework[];
  multi_response_questions: IMultiResponse[];
  defaultQuestions: IDefaultQuestion[];
}

export interface IAssessmentOverview {
  id: string;
  name: string;
  type: string;
  status: string;
  parent_id: string;
  assessment_has_questions: {
    type: string;
    question_id: number;
    is_default_question: boolean;
    question: IAssessmentQuestion;
    response: IAssessmentResponse[];
  }[];
}

export interface IAssessmentResponse {
  name: string;
  count: number;
  option_id: number;
  mutli_response_question_id: number;
  text: string;
  percentage: number;
  value: string;
  iconWidth: number;
  iconHeight: number;
  leftTextIcon: string;
  total: number;
  leftSelected: number;
  middleSelected: number;
  rightSelected: number;
  totalSelected: number;
  list: {
    id: number;
    value: string;
    category_id: string;
    count: number;
  }[];
}

export interface IDefaultQuestion {
  question: {
    id: string;
    question: string;
    icon: string;
    description: string;
  };
  type: string;
  icon: string;
  sequence: number;
}
export interface ISelectedPreferenceValue {
  preference: string;
  value: number;
}
export interface ISelectedDefaultQuestions {
  question_id: string;
  type: string;
  sequence: number;
}

export interface FINANCIALCUSTOMQUESTION {
  id: number;
  title: string;
}

export interface FINANCIALCUSTOMEMOJIQUESTION {
  id: number;
  img: string;
  activeImg: string;
  bgColor: string;
}
export interface ICustomAssessments {
  assessments: string[];
  id: string;
  name: string;
  status: string;
  type: string;
  total_count: number;
  icon: string;
  parent: {
    name: string;
  };
}

export interface IAssessmentFhasCategory {
  name: string;
  count: string;
}

export interface ISubmitAssessmentAnswer {
  fha_has_client: string;
  client_id: string;
  question_id: string;
  question_type: string;
  option_id: string | null;
  value: string;
  rating_id: string;
  mutli_response_question_id: string;
  framework_selections: {
    category_id: string;
    preference_id: string;
    framework_id: string;
    user_framework_selection_type: EFrameworkType;
    weight: number;
    child_framework_ids: string[];
  }[];
}

export interface IHandleProceed {
  sequence: number;
  type: string;
  questionIndex: number;
  option_id?: number;
  rating_id?: number;
  mutli_response_question_id?: number;
  value?: string;
}

export interface ISelectionTopic {
  id: string;
  parent_id: string;
  name: string;
  code: string;
  description: string;
  icon: string;
  preference: string;
  value: number | string;
  background_color: string;
  isDisable?: boolean;
  embrace: string;
  oppose_n_engage: string;
  parent?: ISelectionTopicParent;
  frameworkType: string;
}

export interface ISelectionTopicParent {
  id: number;
  name: string;
}

export interface IPreference {
  id: string;
  options: string;
  styled_options: string;
}
export interface IDefaultAssessment {
  id: number;
  name: string;
  icon: string;
  web_embedded: string;
  status: string;
  type: string;
  parent_id: string;
  deleted: string;
}

export interface IStarIcon {
  icon: string;
  width?: number;
  height?: number;
}
export interface IValuesResult {
  weight: number;
  name: string;
  code: string;
  icon: string;
  options: string;
  bgColor: string;
  parent?: ISelectionTopicParent;
}
export interface IComplianceResult {
  id: number;
  risk_need: string;
  risk_tolerance: string;
  risk_score_label?: string;
  risk_perception: string;
  risk_overall: string;
  risk_score: number;
  dividend_yield: number;
  expense_ratio: number;
}

export interface IAssessmentOwner {
  created_at: string;
  first_name: string;
  last_name: string;
}

export interface IAssessmentEngagement {
  total_responses: {
    count: number;
    last_24hour: number;
  };
  conversion_rate: {
    rate: string;
    total_impressions: number;
  };
  last_24hour: {
    count: number;
  };
}

export interface IClientAssessment {
  created_at: string;
  id: string;
  name: string;
  status: string;
  type: string;
  updated_at: string | null;
  primary: boolean;
  tag: string | null;
}

export interface CustomError {
  message: string;
  status: number;
}
