export interface IModel {
  id: string;
  name: string;
  created_at: string;
  firm_has_member_id: number;
  tickers: IModelTicker[];
  total_percentage: number;
  model_has_tickers: IModelTicker[];
}

export interface IModelTicker {
  ticker: string;
  description: string;
  percentage: number;
}

export interface IReviewModel {
  model_name: string;
  tickers: IModelTicker[];
  total_percentage_error: boolean;
  total_sum: number;
}

export interface IModelContextType {
  reviewModels: IReviewModel[];
  setReviewModels: (value: IReviewModel[]) => void;
}
