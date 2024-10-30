import { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';

const env = process.env.ENVIRONMENT;

export default {
  config(_input) {
    return {
      stage: env,
      region: 'us-east-1',
      profile: 'investware',
      name: 'investware-frontend',
    };
  },
  stacks(app) {
    const id = `investware_frontend_${env}`;
    app.stack(function website({ stack }) {
      const site = new NextjsSite(stack, id, {
        memorySize: 512,
        logging: 'combined',
        runtime: 'nodejs20.x',
        openNextVersion: '2.2.4',
        cdk: {
          id: id,
        },
        environment: {
          ENVIRONMENT: `${process.env.ENVIRONMENT}`,
          NEXT_PUBLIC_AWS_REGION: `${process.env.NEXT_PUBLIC_AWS_REGION}`,
          NEXT_PUBLIC_COGNITO_USER_POOL_ID: `${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
          NEXT_PUBLIC_COGNITO_CLIENT_ID: `${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`,
          NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID: `${process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID}`,
          NEXT_PUBLIC_COGNITO_DOMAIN: `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}`,
          NEXT_PUBLIC_BASE_URL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
