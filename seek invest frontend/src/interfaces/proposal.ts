import { ALIGNMENTS_SCORE_LABEL } from "enums/enums";
import { EProposalAlignmentTypes } from "enums/proposal";
import { IKeyAreas } from "./client";

export interface IProposal {
  id: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface IOverallAlignments {
  type: EProposalAlignmentTypes;
  label: number;
  current_risk: number;
  target_risk: number;
  status_label: ALIGNMENTS_SCORE_LABEL;
  total_topics: number;
}

export interface IGenerateProposalComparison {
  current_overall_alignments: IOverallAlignments[];
  proposed_overall_alignment: IOverallAlignments[];
  current_values_topiic_alignment: IKeyAreas[];
  proposed_value_topic_alignment: IKeyAreas[];
}

export interface IClientProposalDetails {
  id: string;
  name: string;
  type: string;
  account_ids: string[];
  model_id: string;
  result: IGenerateProposalComparison;
}

export interface IClientProposal {
  accounts_count: number;
  assessment_completed: boolean;
  proposals: IProposal[];
}

export interface IProposal {
  id: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface ICompareProposal {
  name: string;
  current_portfolio_holdings: ICurrentPortfolioHolding;
  proposed_portfolio_holdings: {
    tickers: string[];
    companies: number;
    mutual_funds: number;
  };
  values_score: {
    current_porfolio_score: number;
    proposed_porfolio_score: number;
  };
  summary: ICompareProposalSummary;
  risk: ICompareProposalRisk;
  topics: {
    current_porfolio_topics: ICompareProposalTopics[];
    proposed_porfolio_topics: ICompareProposalTopics[];
  };
}

export interface ICurrentPortfolioHolding {
  tickers: string[];
  companies: number;
  mutual_funds: number;
}

export interface ICompareProposalSummary {
  advisor_fee: number;
  dividend_yield: null | number;
  expense_ratio: null | number;
}

export interface ICompareProposalRisk {
  risk_need: string;
  risk_score: number;
  risk_profile: string;
  risk_tolerance: string;
  risk_perception: string;
}

export interface ICompareProposalTopics {
  score: number;
  code: string;
  icon?: string;
  background_color?: string;
}
