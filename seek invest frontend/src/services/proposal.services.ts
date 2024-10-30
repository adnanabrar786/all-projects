import {
  ADD_PROPOSAL_ACCOUNT_TICKER,
  COMPARE_PROPOSAL,
  DELETE_PROPOSAL,
  DELETE_PROPOSAL_ACCOUNT,
  GENERATE_PROPOSAL_COMPARISON,
  GET_CLIENT_PROPOSAL,
  GET_CLIENT_PROPOSALS,
  REMOVE_PROPOSAL_ACCOUNT_TICKER,
  RENAME_PROPOSAL_ACCOUNT,
  SAVE_PROPOSAL,
  UPDATE_PROPOSAL_ACCOUNT_TICKER_AMOUNT,
} from "constants/api.routes";
import { IGenerateProposalComparison } from "interfaces/proposal";
import { makeApiRequest } from "./servicesHelper";

export const updateClientProposalAccountName = async (
  account_id: string,
  name: string
) => {
  const response = await makeApiRequest({
    method: "patch",
    url: RENAME_PROPOSAL_ACCOUNT(account_id),
    data: {
      name,
    },
  });
  return response.data;
};

export const addProposalAccountHolding = async ({
  proposalId,
  account_id,
  ticker,
  amount,
  description,
}: {
  proposalId: string;
  account_id: string;
  ticker: string;
  amount: number;
  description?: string;
}) => {
  const response = await makeApiRequest({
    method: "patch",
    url: ADD_PROPOSAL_ACCOUNT_TICKER(proposalId),
    data: {
      account_id,
      ticker,
      amount,
      description,
    },
  });
  return response.data;
};

export const deleteProposalAccountHolding = async ({
  account_id,
  ticker_id,
}: {
  account_id: string;
  ticker_id: string;
}) => {
  const response = await makeApiRequest({
    method: "delete",
    url: REMOVE_PROPOSAL_ACCOUNT_TICKER(account_id, ticker_id),
  });

  return response.data;
};

export const getCompareProposal = async (proposalId: string) => {
  return makeApiRequest({
    method: "get",
    url: COMPARE_PROPOSAL(proposalId),
  });
};

export const updateProposalAccountHoldingAmount = async (
  account_id: string,
  amount: number,
  ticker_id: string
) => {
  const response = await makeApiRequest({
    method: "patch",
    url: UPDATE_PROPOSAL_ACCOUNT_TICKER_AMOUNT(account_id),
    data: {
      amount,
      ticker_id,
    },
  });
  return response.data;
};

export const deleteProposalAccount = (account_id: string) => {
  return makeApiRequest({
    method: "delete",
    url: DELETE_PROPOSAL_ACCOUNT(account_id),
  });
};

export const getClientProposals = async (clientId: string) => {
  return makeApiRequest({
    method: "get",
    url: `${GET_CLIENT_PROPOSALS}/${clientId}`,
  });
};

export const getClientProposal = async (proposalId: string) => {
  return makeApiRequest({
    method: "get",
    url: `${GET_CLIENT_PROPOSAL}/${proposalId}`,
  });
};

export const deleteClientProposalById = async (proposalId: string) => {
  return makeApiRequest({
    method: "delete",
    url: `${DELETE_PROPOSAL}/${proposalId}`,
  });
};

export const generateProposalComparison = async (
  client_id: string,
  account_ids: string[],
  model_id: string
) => {
  return makeApiRequest({
    method: "post",
    url: GENERATE_PROPOSAL_COMPARISON,
    data: {
      client_id,
      model_id,
      account_ids,
    },
  });
};

export const saveProposal = async (
  client_id: string,
  account_ids: string[],
  model_id: string,
  name: string,
  result: IGenerateProposalComparison | null,
  proposalId: string | null
) => {
  let url = SAVE_PROPOSAL;

  if (proposalId) {
    url += `?proposal_id=${proposalId}`;
  }
  return makeApiRequest({
    method: "post",
    url: url,
    data: {
      client_id,
      model_id,
      account_ids,
      name,
      result,
    },
  });
};
