import { Entity } from "electrodb";
import { UserSubscriptionType } from "../interface/user.interface";
import { getCurrentEpoch } from "../utils/date";
import { DynamoClient } from "../config/dynamodb";
import { DB_TABLE } from "../config/environments";

export const Users = (service: string) =>
  new Entity(
    {
      model: {
        version: "1",
        entity: "users",
        service: service,
      },
      attributes: {
        user: {
          type: "string",
          required: true,
        },
        stripe_id: {
          type: "string",
          required: true,
        },
        user_email: {
          type: "string",
          required: true,
        },
        user_social_connection: {
          type: "string",
          default: "EMAIL",
        },
        first_name: {
          type: "string",
          required: true,
        },
        last_name: {
          type: "string",
          required: true,
        },
        user_subscription_type: {
          default: UserSubscriptionType.FREEMIUM,
          type: [UserSubscriptionType.FREEMIUM, UserSubscriptionType.PREMIUM],
        },
        user_image: {
          type: "string",
          required: false,
        },
        user_count: {
          type: "number",
          default: 10,
        },
        created_at: {
          type: "number",
          default: 0,
          set: () => getCurrentEpoch(),
        },
        updated_at: {
          type: "number",
          default: 0,
          set: () => getCurrentEpoch(),
        },
      },
      indexes: {
        primary: {
          pk: {
            field: "pk",
            composite: ["user"],
          },
          sk: {
            field: "sk",
            composite: ["user_email"],
          },
        },
        email: {
          index: "gsi1pk-gsi1sk-index",
          pk: {
            field: "gsi1pk",
            composite: ["user_email"],
          },
          sk: {
            field: "gsi1sk",
            composite: ["created_at"],
          },
        },
        socialPlatform: {
          index: "gsi2pk-gsi2sk-index",
          pk: {
            field: "gsi2pk",
            composite: ["user_social_connection"],
          },
          sk: {
            field: "gsi2sk",
            composite: ["user"],
          },
        },

        subscriptionType: {
          index: "gsi3pk-gsi3sk-index",
          pk: {
            field: "gsi3pk",
            composite: ["user_subscription_type"],
          },
          sk: {
            field: "gsi3sk",
            composite: ["created_at"],
          },
        },
      },
      // add your DocumentClient and TableName as a second parameter
    },
    { client: DynamoClient, table: DB_TABLE },
  );
