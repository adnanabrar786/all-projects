export type TChallenges = 'SMS_MFA' | 'MFA_SETUP' | 'SOFTWARE_TOKEN_MFA' | 'NEW_PASSWORD_REQUIRED' | 'TOTP' | 'SMS';

export interface IUserProps {
  username: string;
  password: string;
  attributes: {
    name: string;
    email: string;
    family_name: string;
  };
}

export interface ICognitoError {
  code: string;
  name: string;
  message: string;
}

interface ICognitoUserPool {
  advancedSecurityDataCollectionFlag: boolean;
  client: {
    endpoint: string;
    userAgent: string;
  };
  clientId: string;
  storage: { [key: string]: string };
  userPoolId: string;
}

interface ICognitoIdToken {
  jwtToken: string;
  payload: {
    aud: string;
    auth_time: number;
    'cognito:username': string;
    email: string;
    email_verified: boolean;
    event_id: string;
    exp: number;
    iat: number;
    iss: string;
    name: string;
    phone_number: string;
    phone_number_verified: boolean;
    sub: string;
    token_use: string;
  };
}

interface ICognitoAccessToken {
  jwtToken: string;
  payload: {
    auth_time: number;
    client_id: string;
    event_id: string;
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    scope: string;
    sub: string;
    token_use: string;
    username: string;
  };
}

export interface ICognitoUserSession {
  accessToken: ICognitoAccessToken;
  clockDrift: number;
  idToken: ICognitoIdToken;
  refreshToken: { token: string };
}

export interface ICodeDeliveryDetails {
  AttributeName: string;
  DeliveryMedium: string;
  Destination: string;
}

export interface ICognitoUser {
  challengeName?: TChallenges;
  challengeParam?: {
    requiredAttributes: [string];
    userAttributes: {
      email: string;
      phone_number: string;
      phone_number_verified: string;
    };
  };
  Session: string | null;
  attributes?: {
    sub: string;
    email: string;
    name: string;
    family_name: string;
  };
  authenticationFlowType: string;
  client: {
    endpoint: string;
    userAgent: string;
  };
  pool?: ICognitoUserPool;
  signInUserSession: ICognitoUserSession | null;
  storage: { [key: string]: string };
  username: string;
  userConfirmed?: boolean;
  userSub?: string;
}

export interface ISignUpResult {
  userConfirmed?: boolean;
  data?: {
    user: ICognitoUser;
    userConfirmed: boolean;
    userSub: string;
  };
  userSub?: string;
  error?: ICognitoError;
}

export interface ISignInResult {
  data?: ICognitoUser;
  error?: ICognitoError;
}

export interface IRequestPasswordCodeResult {
  data?: { CodeDeliveryDetails: ICodeDeliveryDetails };
  error?: ICognitoError;
}

export interface IResetPasswordResult {
  data?: boolean;
  error?: ICognitoError;
}
