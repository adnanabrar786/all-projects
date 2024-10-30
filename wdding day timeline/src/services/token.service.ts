import { Auth } from 'aws-amplify';

export const GetToken = async (): Promise<string> => {
  const key = await Auth.currentSession();
  const token = key.getAccessToken().getJwtToken();
  return token;
};
