import { BASE_URL, SCORING_SERVICE_BASE_URL } from "./environment";

export const SIGN_UP_BY_EMAIL = `${BASE_URL}/auth/signup-by-email`;
export const USER_LOGIN = `${BASE_URL}/auth/login`;
export const SET_PASSWORD = `${BASE_URL}/auth/set-password`;
export const FORGET_PASSWORD = `${BASE_URL}/auth/forget-password`;
export const RESEND_VERIFICATION_EMAIL = `${BASE_URL}/auth/resend-verification-email`;

export const UPDATE_USER_PROFILE = `${BASE_URL}/users/profile`;
export const UPDATE_USER_PROFILE_PICTURE = `${BASE_URL}/users/profile-picture`;
export const USER_PROFILE = `${BASE_URL}/users/profile`;
export const SUBSCRIPTION = `${BASE_URL}/subscriptions/manage`;
export const USER_BILL = `${BASE_URL}/billings/checkout`;
export const ALL_STRIPE_PRODUCTS = `${BASE_URL}/billings/products`;

export const GET_FIRM = `${BASE_URL}/firms`;
export const GET_FIRM_MEMBERS = `${BASE_URL}/firm/members`;
export const GET_FIRM_UN_AUTH = `${BASE_URL}/firms`;
export const CREATE_FIRM_MEMBER = `${BASE_URL}/firm/members/invite`;
export const SET_FIRM_MEMBER_PASSWORD = `${BASE_URL}/firm/members/set-password`;
export const UPDATE_FIRM_MEMBER_ROLE = `${BASE_URL}/firm/members/role`;
export const DELETE_FIRM_MEMBER = `${BASE_URL}/firm/members`;
export const UPDATE_FIRM_BY_ID = `${BASE_URL}/firms`;
export const FIRM_AVAILABILITY = `${BASE_URL}/firms/available-name`;

export const GET_ASSESSMENTS = `${BASE_URL}/assessments/templates`;
export const GET_DEFAULT_ASSESSMENTS = `${BASE_URL}/assessments/default`;
export const CREATE_CUSTOM_ASSESSMENTS = `${BASE_URL}/assessment/questions`;
export const RENAME_CUSTOM_ASSESSMENTS = `${BASE_URL}/assessment`;
export const GET_DEFAULT_ASSESSMENT_QUESTIONS = (assessmentId: string) => {
  return `${BASE_URL}/assessment/questions/${assessmentId}/default`;
};
export const GET_ASSESSMENT_OVERVIEW = (assessmentId: string) => {
  return `${BASE_URL}/assessment/${assessmentId}/overview`;
};
export const CALCULATE_ASSESSMENT_SCORE = (
  assessmentId: string,
  clientId: string
) => {
  return `${BASE_URL}/assessment/${assessmentId}/calculate-score/${clientId}`;
};

export const VALUE_PROFILE_SUMMARY = (clientId: string) => {
  return `${BASE_URL}/client/v2/${clientId}/overview/values-profile`;
};

export const GET_UN_AUTH_ASSESSMENT = (
  assessmentId: string,
  clientId: string
) => {
  return `${BASE_URL}/assessments/${assessmentId}/questions/${clientId}`;
};
export const GET_ASSESSMENT_ANSWER = (
  assessmentId: string,
  question_id: string,
  type: string
) => {
  return `${BASE_URL}/assessment/answers/${assessmentId}/previous-answers?question_id=${question_id}&type=${type}`;
};
export const OWN_SELECTION_TOPICS = `${BASE_URL}/categories`;
export const GET_PREFERENCES = `${BASE_URL}/preference`;
export const SUBMIT_ASSESSMENT_ANSWER = `${BASE_URL}/assessment/answers`;

export const GET_CUSTOM_ASSESSMENTS = `${BASE_URL}/assessments/custom`;
export const GET_ASSESSMENTS_FHAS_CATEGORY = `${BASE_URL}/assessments/fhas`;
export const LAUNCH_FHA = (assessmentId: string) => {
  return `${BASE_URL}/assessment/${assessmentId}/launch`;
};
export const GET_ASSESSMENT_OWNER_DETAILS = (assessmentId: string) => {
  return `${BASE_URL}/assessment/${assessmentId}/owner`;
};
export const FRAMEWORK_CHILDREN = `${BASE_URL}/categories/frameworks`;

export const GET_CLIENTS_LIST = `${BASE_URL}/clients`;
export const CLIENTS_BULK_UPLOAD = `${BASE_URL}/clients/bulk/upload`;
export const CLIENTS_BULK_CONFIRM = `${BASE_URL}/clients/bulk/confirm`;

export const SEARCH_CLIENT_BY_NAME = `${BASE_URL}/clients/search`;
export const GET_CLIENTS_OVERVIEW = `${BASE_URL}/clients/overview`;
export const GET_CLIENT_ACCOUNTS = `${BASE_URL}/account`;
export const GET_CLIENT_FILTER = `${BASE_URL}/clients/filter`;
export const CREATE_CLIENT = `${BASE_URL}/client`;
export const UPDATE_CLIENT = `${BASE_URL}/client`;
export const GET_SECURITIES_AVI = `${SCORING_SERVICE_BASE_URL}/Security/Search`;
export const GET_CLIENT_BY_ID = `${BASE_URL}/client`;
export const GET_CLIENT_DETAILS_OVERVIEW = (clientId: string) => {
  return `${BASE_URL}/client/${clientId}/overview/details`;
};
export const GET_CLIENT_FINANCIAL_GOALS = (clientId: string) => {
  return `${BASE_URL}/client/v2/${clientId}/financial-goals`;
};

export const GET_CLIENT_ASSESSMENTS = (clientId: string) => {
  return `${BASE_URL}/client/v2/${clientId}/assessments`;
};

export const GET_CLIENT_ACCOUNTS_RISK_ALIGNMENT = (clientId: string) => {
  return `${BASE_URL}/client/v2/${clientId}/accounts/risk-alignment`;
};

export const GET_CLIENT_ACCOUNT_VALUES_CHART = (accountId: string) => {
  return `${BASE_URL}/account/${accountId}/values-alignment`;
};

export const GET_CLIENT_ACCOUNT_HOLDINGS_FILTER = (
  accountId: string,
  topicName: string
) => {
  return `${BASE_URL}/accounts/${accountId}?topic_name=${encodeURIComponent(
    topicName
  )}`;
};

export const GET_CLIENT_VIEW_RESULT = (clientId: string, fhaId: string) => {
  return `${BASE_URL}/client/v2/${clientId}/assessments/${fhaId}`;
};

export const GET_HOLDING_REPORT = (accountId: string, holdingId: string) => {
  return `${BASE_URL}/holdings/${accountId}/${holdingId}`;
};

export const DELETE_CLIENT_ASSESSMENT = (fhaId: string) => {
  return `${BASE_URL}/client/v2/${fhaId}/assessment`;
};

export const GET_CLIENT_VALUES_PERSONA_OVERVIEW = (
  clientId: string,
  accountType: string,
  proposal_id?: string
) => {
  return `${BASE_URL}/client/${clientId}/overview/values-persona?type=${accountType}${
    proposal_id ? `&proposal_id=${proposal_id}` : ""
  }`;
};
export const GET_CLIENT_RISK_PERSONA_OVERVIEW = (clientId: string) => {
  return `${BASE_URL}/client/${clientId}/overview/risk-persona`;
};
export const ARCHIVE_CLIENT = `${BASE_URL}/client`;
export const ARCHIVE_CLIENTS = `${BASE_URL}/clients/v2/archive`;

export const UPDATE_CLIENT_ASSESSMENT = (fha_id: string) => {
  return `${BASE_URL}/assessment/${fha_id}/viewed`;
};

export const GET_CLIENT_SUMMARY = (clientId: string) => {
  return `${BASE_URL}/client/${clientId}/summary`;
};

export const BULK_VERIFY = () => {
  return `${BASE_URL}/verify/file/csv-columns`;
};
export const ACCOUNT_BULK_UPLOAD = (clientId: string) => {
  return `${BASE_URL}/account/${clientId}/bulk/upload`;
};
export const ADD_ACCOUNT_HOLDING = `${BASE_URL}/account`;
export const REMOVE_ACCOUNT_HOLDING = `${BASE_URL}/account`;
export const ADD_CLIENT_ACCOUNT = `${BASE_URL}/account`;
export const UPDATE_ACCOUNT_HOLDING_AMOUNT = (account_detail_id: string) => {
  return `${BASE_URL}/account/${account_detail_id}/amount`;
};
export const UPDATE_ACCOUNT_NAME = (account_id: string) => {
  return `${BASE_URL}/account/${account_id}/name`;
};
export const UPDATE_ACCOUNT_DETAIL = (account_id: string) => {
  return `${BASE_URL}/client/${account_id}`;
};

export const PUBLISH_ASSESSMENT = (assessmentId: string) => {
  return `${BASE_URL}/assessment/${assessmentId}/publish`;
};

export const GET_ASSESSMENT_ENGAGEMENT = (assessmentId: string) => {
  return `${BASE_URL}/assessment/${assessmentId}/engagements`;
};

export const DELETE_ASSESSMENT = `${BASE_URL}/assessment`;
export const GET_ASSESSMENT_BY_ID = `${BASE_URL}/assessment`;

export const GET_CLIENT_ACCOUNT_COUNT = (clientId: string) => {
  return `${BASE_URL}/account/${clientId}/count`;
};

export const DELETE_CLIENT_ACCOUNT = (account_id: string) => {
  return `${BASE_URL}/account/${account_id}`;
};

export const ACCOUNT_VALUE_ALIGNMENTS = (clientId: string) => {
  return `${BASE_URL}/client/v2/${clientId}/account/value-alignments`;
};

export const TOTAL_ACCOUNTS_VALUE = (clientId: string) => {
  return `${BASE_URL}/client/v2/${clientId}/accounts/overview`;
};

export const ACCOUNT_RISK_TARGET_SCORE = (accoundId: string) => {
  return `${BASE_URL}/client/v2/${accoundId}/risk-target-score`;
};

//PROPOSALS
export const GET_CLIENT_PROPOSALS = `${BASE_URL}/proposals/client`;
export const GENERATE_PROPOSAL_COMPARISON = `${BASE_URL}/proposals/generate-comparison`;
export const SAVE_PROPOSAL = `${BASE_URL}/proposals/save`;
export const GET_CLIENT_PROPOSAL = `${BASE_URL}/proposals`;
export const DELETE_PROPOSAL = `${BASE_URL}/proposals`;

export const RENAME_PROPOSAL_ACCOUNT = (accountId: string) => {
  return `${BASE_URL}/proposals/account/${accountId}/name`;
};
export const ADD_PROPOSAL_ACCOUNT_TICKER = (proposalId: string) => {
  return `${BASE_URL}/proposals/${proposalId}/account`;
};
export const REMOVE_PROPOSAL_ACCOUNT_TICKER = (
  accountId: string,
  tickerId: string
) => {
  return `${BASE_URL}/proposals/account/${accountId}/${tickerId}`;
};
export const COMPARE_PROPOSAL = (proposalId: string) => {
  return `${BASE_URL}/proposals/${proposalId}/compare`;
};

export const UPDATE_PROPOSAL_ACCOUNT_TICKER_AMOUNT = (accountId: string) => {
  return `${BASE_URL}/proposals/account/${accountId}/amount`;
};
export const DELETE_PROPOSAL_ACCOUNT = (accountId: string) => {
  return `${BASE_URL}/proposals/account/${accountId}`;
};

export const COPY_ACCOUNT_TO_JSON = (accountId: string, type: string) => {
  return `${BASE_URL}/accounts/${accountId}/copy?type=${type}`;
};

export const COPY_ACCOUNT_TICKER_TO_JSON = () => {
  return `${BASE_URL}/accounts/securitry/holdingreport/request`;
};

export const COPY_MODEL_TO_PROPOSAL = `${BASE_URL}/model/portfolios/copy/client-proposal`;

// MODELS
export const DELETE_MODEL = `${BASE_URL}/model/portfolios`;
export const ADD_MODEL_TICKER = (modelId: string) => {
  return `${BASE_URL}/model/portfolios/${modelId}/ticker`;
};

export const GET_CLIENT_ACCOUNTS_NAME = (clientId: string) => {
  return `${BASE_URL}/accounts/${clientId}/name`;
};
export const GET_MODELS = `${BASE_URL}/models`;
export const MODELS_BULK_REVIEW = `${BASE_URL}/models/bulk-review`;
export const MODELS_BULK_CREATE = `${BASE_URL}/models/bulk-create`;
export const CREATE_NEW_MODEL = `${BASE_URL}/models`;

// COMPARISON REPORT
export const GENERATE_COMPARISON_REPORT = `${BASE_URL}/comparison-report/generate-pdf`;

export const TERMS_OF_SERVICES =
  "https://www.seekinvest.com/terms-of-services/";
export const PRIVACY_POLICY = "https://www.seekinvest.com/privacy-policy/";
