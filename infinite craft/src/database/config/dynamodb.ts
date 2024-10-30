import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ACCESS_KEY, REGION, SECRET_KEY } from "./environments";

export const DynamoClient = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});
