import { EClientAssessmentStatus } from "enums/assessment";
import { ALIGNMENTS_SCORE_LABEL, ETopicType } from "enums/enums";

export interface IHouseholdRelationships {
  id: number;
  relationship: string;
  sequence: number;
}
export interface IClient {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  goal: string;
  phone: string;
  head_of_house: boolean;
  client_id: string;
  advisor_fee: number;
  linked: boolean;
  asset_value: string;
  household_count: number;
  accounts_count: number;
  risk_persona: string;
  key_values: IClientKeyValues[];
  actions: IActions[];
  advisory_fee: string;
  aum: string;
}

export interface IBioData {
  title: string;
  component: string;
  text: string | number | null;
  icon: string;
  error?: any;
  helperText?: any;
}

export interface IActions {
  text: string;
  action: string;
  fha_id: string;
}

export interface IClientKeyValues {
  name: string;
  background_color: string;
}

export interface IClientSummary {
  household_count: number;
  account_count: number;
  assessment_name: string;
  assessment_status: string;
  last_checked_in: string;
  type_of_communication: string;
  crp_score: number;
  topics: number;
}

export interface IClientDetailsOverview {
  aum: number;
  households: number;
  client: IClient;
}

export interface IUpdateClient {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  clientId: string;
  link?: {
    head_of_house: boolean;
    household_relationship_id: number;
    household_id: number;
  };
}

export interface IHouseholdList {
  id: string;
  email: string;
  first_name: string;
  head_of_house: boolean;
  last_name: string;
  phone: string;
}

export interface IBulkConfirm {
  title: string;
  value: string;
}

export interface IHousehold {
  deleted: boolean;
  firm_has_member_id: number;
  id: number;
  name: string;
  updated_at: string;
  clients: IClient[] | null;
  head_of_house: boolean;
  household_relationship_id: number;
  members?: string;
  asset_Value?: string;
}
export interface IMetaData {
  current_page: number;
  items_per_page: number;
  timestamp: number;
  total_items: number;
  total_pages: number;
}

export interface ISecuritiesDetail {
  ticker: string;
  name: string;
  cik: string;
  lei: string;
  type: string;
  popularity: number;
  is_scoreable: boolean;
}

export interface IClientOverview {
  accounts: number;
  aum: string;
  clients: number;
}

export interface IHouseholdClient {
  head_of_house: boolean;
  client_id: string;
  household_relationship_id: number;
  clientName: string;
}

export interface IClientTabs {
  name: string;
  link: string;
}

export interface IClientDetailDefaultQuestion {
  question: string;
  answer: string;
}

export interface IClientDetailDefaultQuestionOverview {
  custom_questions: IClientDetailDefaultQuestion[];
  default_questions: IClientDetailDefaultQuestion[];
}

export interface IHoldingSearch {
  name: string;
  type: string;
}

export interface IClientsAccountItems {
  title: string;
  number: string;
  bgColor: string;
  img?: string;
}

export interface IClientsAccountData {
  total_amount: string;
  accounts: IClientsAccount[];
  bgColor: string;
  img?: string;
}

export interface IClientsAccounts {
  accounts_count: number;
  accounts: Pick<IClientsAccount, "id" | "name">[];
}

export interface IClientsAccount {
  id: string;
  name: string;
  holdings: IClientsAccountDetails[];
  percentage: string;
  modelId?: string;
  total_amount: string;
  total_score?: number;
  isEdit: boolean;
  isNew: boolean;
  created_at: string;
  current_risk: number | null;
  target_risk: number | null;
  refreshRequired: boolean;
  value_response: IValuesResponse | null;
  risk_response: IRiskResponse | null;
  show_values_alignment_column: boolean;
  values_response: IValuesResponse;
  values_alignment: {
    value_score: number;
    value_status: ALIGNMENTS_SCORE_LABEL;
  };
}

export interface IValuesResponse {
  stale: boolean;
  request_timestamp: number;
}

export interface IRiskResponse extends IValuesResponse {}

export interface IClientsAccountDetails {
  id: string;
  amount: string;
  ticker: string;
  description?: string;
  percentage: string;
  isEdit: boolean;
  isNew: boolean;
  name: string;
  product_exposure: IProductExposure[];
  product_weights: IProductWeights[];
  risk_score: number | null;
  values_alignment: {
    value_score: number;
    value_status: ALIGNMENTS_SCORE_LABEL;
  } | null;
  label: string;
}

export interface IProductExposure {
  name: string;
  expose_description: string;
  description: string;
  percentage: number;
}

export interface IProductWeights {
  ProductTopicCode: string;
  icon: string;
  product_coverage_ratio: number;
  is_opposed: boolean;
  border_color: string;
  background_color: string;
  weight: number;
}

export interface ICreateHoldingData {
  name: string;
  description: string;
  amount: string;
  percentageValue: string;
}

export interface IHoldingReport {
  ticker_name: string;
  label: string;
  label_color: string;
  label_backgroundcolor: string;
  description: string;
  risk_score: string;
  ticker_values_alignment: IValuesAlignment;
  performance_data: IHoldingReportPerformance[];
  risk_statistics: IHoldingReportRiskStatistics[];
  sector_exposure: IHoldingReportSectorExposure[];
  regional_exposure: IHoldingReportRegionalExposure[];
  values_alignment: IKeyAreas[];
  product_exposure: IProductExposure[];
  top_holdings_alignment: IHoldingTopHoldingsAlignment[];
}

export interface IHoldingReportPerformance {
  trailing_returns: string;
  return_ytd: string;
  return_1yr: string;
  return_3yr: string;
  return_5yr: string;
}

export interface IHoldingReportRiskStatistics {
  title: string;
  value: string;
}

export interface IHoldingReportSectorExposure {
  sector: string;
  portfolio_exposure: string;
  benchmark_exposure: string | null;
}

export interface IHoldingReportRegionalExposure {
  region: string;
  percentage: string;
}

export interface IHoldingReportProductExposure {
  name: string;
  description: string;
  percentage: number;
}

export interface IHoldingTopHoldingsAlignment {
  ticker: string;
  name: string;
  weight: string;
  risk_score: string;
  values_alignment: IValuesAlignment;
}

export interface ITopicScore {
  icon: string;
  topic_name: string;
  score: number;
  weight: number;
  is_opposed: boolean;
}

export interface IValuesPersona {
  total_score: number;
  list: IValuesPersonaList[];
}

export interface IValuesPersonaList {
  name: string;
  count: number;
  graphs: ITopicScore[];
}

export interface IValuesPersonaListData {
  list: IValuesPersonaList[];
  total_score: number;
}

export interface IRiskPersona {
  id: number;
  risk_need: string;
  risk_tolerance: string;
  risk_perception: string;
  risk_overall: string;
  risk_score: number;
  advisor_fee: number;
  expense_ratio: number;
  dividend_yield: number;
}

export interface IClientFilter {
  key: string;
  list: any[];
  name: string;
}

export interface IClientAccountsRiskAlignmentSummary {
  label: string;
  stale: boolean;
  request_timestamp: number;
  status_label: string;
  assessment_status: string | null;
  current_risk: number | null;
  target_risk: number | null;
}

export interface IClientAccountsSummaryData {
  title: string;
  info: string;
  label: string;
  decimalAccountValue?: number;
  icon: string;
  actionIcon: string;
  action: string;
  actionColor: string;
  fontWeight: string;
  actionValue: string;
  status?: string;
  assessmentStatus: EClientAssessmentStatus | null;
  statusColor?: string;
  statusBg?: string;
  statusIcon?: string;
  currentTarget?: { title: string; value: string; refreshRequired: boolean }[];
  topics_count: number;
  hideAccountsCount?: boolean;
  accounts_count: number;
  refreshRequired?: boolean;
}

export interface IKeyAreas {
  topic_name: string;
  topic_code: string;
  preference_icon: string;
  type: ETopicType;
  importance: number;
  values_alignment: IValuesAlignment;
  preference: string;
  description: string;
  product_exposure: number;
}

export interface IValuesAlignment {
  value_score: number;
  status_label: ALIGNMENTS_SCORE_LABEL;
}

export interface IAccountValuesAlignment {
  top_values_alignments: IKeyAreas[];
  key_values_improvements: IKeyAreas[];
  values_alignment: {
    label: string;
    status_label: string;
    assessment_status: string;
    topics_count: number;
    stale: boolean;
    request_timestamp: number;
  };
}

export interface IValuesResponse {
  stale: boolean;
  request_timestamp: number;
}

export interface ITotalAccountValue {
  total_accounts_sum: number;
  total_accounts: number;
}
