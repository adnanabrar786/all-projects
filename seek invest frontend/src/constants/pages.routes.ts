export const ASSESSMENT = "/assessment";
export const ASSESSMENTS = "/assessments";
export const SETTINGS = "/settings";
export const CLIENTS = "/clients";
export const MODELS = "/models";

export const LOGIN = "/login";
export const FORGOT_PASSWORD = "/forgot-password";
export const SIGN_UP = "/sign-up";
export const CREATE_PASSWORD = "/sign-up/create-password";
export const VERIFY_EMAIL = "/verify-email";
export const PERSONAL_DETAILS = "/personal-details";
export const COMPANY_DETAILS = "/company-details";
export const ERROR_PAGE = "/404";

export const PERSONAL_SETTINGS = `${SETTINGS}/personal-settings`;
export const COMPANY_SETTINGS = `${SETTINGS}/company-settings`;
export const PLANS_AND_BILLING = `${SETTINGS}/plan-and-billing`;
export const USER_MANAGEMENT = `${SETTINGS}/user-management`;
export const CREATE_ASSESSMENT = `${ASSESSMENT}/create-assessment`;
export const SHARE_ASSESSMENT = `${ASSESSMENT}/share`;
export const FHA_DETAILS_OVERVIEW = "/assessments/fha-details/overview";
export const FHAS = `${ASSESSMENTS}?category=all-assessments`;
export const CLIENTS_PROPOSALS = `${CLIENTS}/proposals`;
export const CLIENTS_OVERVIEW = `${CLIENTS}/overview`;
export const HOME = "/home";
export const FINANCIAL_ASSESSMENT_FRAMEWORK = `${ASSESSMENT}/financial/framework`;
export const FINANCIAL_ASSESSMENT_FRAMEWORK_PREFERENCE = `${ASSESSMENT}/financial/preference`;

export const TEAM_MEMBERS = "/team-members";

export const TEAM_MEMBERS_CREATE_PASSWORD = "/team-members/create-password";
export const TEAM_MEMBERS_PERSONAL_DETAILS = "/team-members/personal-details";
export const PRICE_PLAN = "/price-plan";

export const APP = "/app/";

export const CLIENTS_DETAILS = `${CLIENTS}/client-details`;

export const CLIENT_DETAIL_SUMMARY = ({ clientId }: { clientId: string }) => {
  return `${CLIENTS_DETAILS}/${clientId}/overview`;
};

export const CLIENT_DETAIL_ASSESSMENTS = ({
  clientId,
}: {
  clientId: string;
}) => {
  return `${CLIENTS_DETAILS}/${clientId}/client-assessments`;
};

export const CLIENT_DETAIL_ACCOUNTS = ({ clientId }: { clientId: string }) => {
  return `${CLIENTS_DETAILS}/${clientId}/accounts`;
};

export const CLIENT_DETAIL_PROPOSALS = ({ clientId }: { clientId: string }) => {
  return `${CLIENTS_DETAILS}/${clientId}/proposals`;
};

export const SEEKINVEST = "https://www.seekinvest.com/";
