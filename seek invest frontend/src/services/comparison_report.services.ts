import { GENERATE_COMPARISON_REPORT } from "constants/api.routes";
import { makeApiRequest } from "./servicesHelper";

export const generateComparisonReport = async ({
  symbol1,
  symbol1Name,
  symbol2,
  symbol2Name,
  clientId,
  clientName,
}: {
  symbol1: string;
  symbol1Name: string;
  symbol2: string;
  symbol2Name: string;
  clientId?: string;
  clientName?: string;
}) => {
  return makeApiRequest({
    method: "post",
    url: GENERATE_COMPARISON_REPORT,
    uploadProgress: {
      responseType: "blob",
    },
    data: {
      symbol1: {
        ticker: symbol1,
        name: symbol1Name,
      },
      symbol2: {
        ticker: symbol2,
        name: symbol2Name,
      },
      clientName: clientName,
      clientId: clientId,
    },
  });
};
