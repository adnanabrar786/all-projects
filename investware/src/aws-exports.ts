const awsmobile = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_REGION,
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
  aws_cognito_identity_pool_id: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID,
  oauth: {
    responseType: 'code',
    scope: ['email', 'openid', 'phone', 'profile'],
    domain: `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}`.replace('https://', ''),
    redirectSignIn: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
    redirectSignOut: `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/authorize`,
  },
  federationTarget: 'COGNITO_USER_POOLS',
  aws_cognito_username_attributes: ['EMAIL'],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ['EMAIL', 'GIVEN_NAME', 'FAMILY_NAME'],
  aws_cognito_mfa_configuration: 'OFF',
  aws_cognito_mfa_types: [],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: ['REQUIRES_LOWERCASE', 'REQUIRES_UPPERCASE', 'REQUIRES_NUMBERS', 'REQUIRES_SYMBOLS'],
  },
  aws_cognito_verification_mechanisms: ['EMAIL'],
};

export default awsmobile;

// export const awsmobile: ResourcesConfig['Auth'] = {
//   Cognito: {
//     signUpVerificationMethod: 'code',
//     userPoolId: `${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
//     userPoolEndpoint: `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}`,
//     userPoolClientId: `${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`,
//     identityPoolId: `${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
//     loginWith: {
//       email: true,
//       oauth: {
//         responseType: 'code',
//         scopes: ['email', 'openid', 'phone', 'profile'],
//         domain: `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}`.replace('https://', ''),
//         redirectSignIn: [`${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}`],
//         redirectSignOut: [`${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/authorize`],
//       }
//     },
//     userAttributes: {
//       email: { required: true },
//       given_name: { required: true },
//       family_name: { required: true },
//     },
//     passwordFormat: {
//       minLength: 8,
//       requireNumbers: true,
//       requireLowercase: true,
//       requireUppercase: true,
//       requireSpecialCharacters: true,
//     }
//   },
// };

// export default awsmobile;
