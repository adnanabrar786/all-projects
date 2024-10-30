import {
  AWS_REGION,
  AWS_COGNITO_USERS_POOL_ID,
  AWS_COGNITO_IDENTITY_POOL_ID,
  AWS_COGNITO_USERS_POOL_WEB_CLIENT_ID,
  AWS_USERS_FILES_S3_BUCKET,
} from 'config/environment';

const awsmobile = {
  aws_project_region: AWS_REGION,
  aws_cognito_identity_pool_id: AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: AWS_REGION,
  aws_user_pools_id: AWS_COGNITO_USERS_POOL_ID,
  aws_user_pools_web_client_id: AWS_COGNITO_USERS_POOL_WEB_CLIENT_ID,
  oauth: {},
  aws_cognito_username_attributes: ['EMAIL'],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ['EMAIL', 'FAMILY_NAME', 'NAME'],
  aws_cognito_mfa_configuration: 'OFF',
  aws_cognito_mfa_types: ['SMS'],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: ['EMAIL'],
  aws_user_files_s3_bucket: AWS_USERS_FILES_S3_BUCKET,
  aws_user_files_s3_bucket_region: AWS_REGION,
};

export default awsmobile;
