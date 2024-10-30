import {
  CALCULATE,
  CALCULATE_NODE,
  GET_ALL_SECURITIES,
  SAVED_TRADE,
  SEARCH_TRADE,
  SEARCH_TRADE_BY_SECURITIES,
} from '@/constants/api';
import { IRequest } from '@/interfaces/request';
import { ISaved } from '@/interfaces/trade';
import { makeApiRequest } from './Verbs';

export const CalculateTrade = async (data: IRequest) => {
  return makeApiRequest({
    method: 'post',
    url: CALCULATE,
    data: { request: data },
  });
};

export const Calculate_Trade_Node = async (data: any, securityId: string) => {
  return makeApiRequest({
    method: 'post',
    url: CALCULATE_NODE,
    data: {
      security_id: securityId,
      request: data,
    },
  });
};

export const SaveTrade = async (data: ISaved, tradeId: string) => {
  return makeApiRequest({
    method: 'post',
    url: `${SAVED_TRADE}/?trade_id=${tradeId}`,
    data: data,
  });
};

export const SearchTradeResult = async (tradeName: string) => {
  return makeApiRequest({
    method: 'get',
    url: `${SEARCH_TRADE}/?name=${tradeName}`,
  });
};

export const GetAllSecurities = async () => {
  return makeApiRequest({
    method: 'get',
    url: GET_ALL_SECURITIES,
  });
};

export const GetSearchSecurity = async (securityName: string) => {
  return makeApiRequest({
    method: 'get',
    url: `${SEARCH_TRADE_BY_SECURITIES}/${securityName}`,
  });
};
