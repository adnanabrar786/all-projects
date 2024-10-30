export enum EProposalValues {
  EMBRACE = "Embrace",
  OPPOSE_ENGAGE = "Oppose",
}

export enum EFINANCIALLINKITEM {
  LINK_JUDEO = "judeo-christian-faith",
  ENVIRONMENTAL = "environmental-defense-fund",
  RAINFOREST = "rainforest-alliance",
  SIERRA = "sierra-club",
  UNSDG = "unsdgs",
}

export enum EFINANCIALITEM {
  JUDEO = "Judeo Christian Faith",
  ENVIRONMENTAL = "Environmental Defense Fund",
  RAINFOREST = "Rainforest Alliance",
  SIERRA = "Sierra Club",
  UNSDG = "UNDSs",
}
export enum EPricePlan {
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export enum ERoles {
  OWNER = "Owner",
  ADMIN = "Admin",
  MEMBER = "Member",
  REMOVE_USER = "Remove User",
}

export interface FINANCIALGOAL {
  title: string;
  subTitle?: string;
  description: string;
  icon: string;
}

export interface FINANCIALINHERITANCEITEM {
  image: string;
  title: string;
}

interface BONUSITEM {
  title: string;
  bonus: string;
  icon?: string | undefined;
}

export interface BONUSDATA {
  id: number;
  items: BONUSITEM[];
}

export interface RISKPERSONDATA {
  title: string;
  status: string;
}

export interface FINANCIALRISKCARD {
  title: string;
  value: string;
  bg: string;
}

export enum EAllAssessments {
  ALL_ASSESSMENTS = "all-assessments",
}

export enum EFINANCIALLAYOUTTITLE {
  VALUE_TITLE = "Values Determination Assessment",
  RISK_TITLE = "Comprehensive Risk Profile",
}

export enum EAgreeDisagree {
  AGREE = "agree",
  DISAGREE = "disagree",
}

export enum ERatingTypes {
  STAR = "STAR",
  NUMBER = "NUMBER",
  SMILEY = "SMILEY",
}

export enum ETicker {
  $CASH = "$CASH",
}

export enum EProposalType {
  VALUES_PROFILE = "values-profile",
  RISK_PROFILE = "risk-profile",
}

export enum EClientAccount {
  ACCOUNT = "ACCOUNT",
  PROPOSAL_ACCOUNT = "PROPOSAL",
}

export enum EProposalActions {
  COMPARE_VALUES = "compare-values",
}

export const MODEL_PORTFOLIO = "MODEL_SAMPLE";

export enum EValueRiskOverview {
  VALUES_OVERVIEW = "View new values result",
  RISK_OVERVIEW = "View new risk result",
}

export enum EBioComponent {
  NAME = "name",
  EMAIL = "email",
  PHONE = "phone",
  ADVISORY_FEE = "advisory_fee",
}

export enum OPTION_ORIENTATIONS {
  VERTICAL = "VERTICAL",
  HORIZONTAL = "HORIZONTAL",
}

export enum ALIGNMENTS_SCORE_LABEL {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
  ASSESSMENT_INPROGRESS = "Assessment inprogress",
  EMPTY = "",
}

export enum EFontWeights {
  NORMAL = "normal",
  MEDIUM = "medium",
  SEMIBOLD = "semibold",
  BOLD = "bold",
}

export enum ENEW {
  NEW = "new",
}

export enum ETopicType {
  PRODUCT = "Product",
  NON_PRODUCT = "Non-product",
}
