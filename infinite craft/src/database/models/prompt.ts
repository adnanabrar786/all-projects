import { Entity } from "electrodb";
import { DB_TABLE } from "../config/environments";
import { DynamoClient } from "../config/dynamodb";
import { Reaction } from "../interface/prompt.interface";
import { getCurrentEpoch } from "../utils/date";

export const Prompt = (service: string) =>
  new Entity(
    {
      model: {
        version: "1",
        entity: "prompt",
        service: service,
      },
      attributes: {
        id: {
          type: "string",
          required: true,
        },
        user: {
          type: "string",
          required: true,
        },
        heading: {
          type: "string",
          required: true,
        },
        prompt: {
          type: "string",
          required: true,
        },
        reaction: {
          default: Reaction.NONE,
          type: [Reaction.LIKE, Reaction.UNLIKE, Reaction.NONE],
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
            composite: ["id"],
          },
          sk: {
            field: "sk",
            composite: ["user"],
          },
        },
        byUser: {
          index: "gsi1pk-gsi1sk-index",
          pk: {
            field: "gsi1pk",
            composite: ["user"],
          },
          sk: {
            field: "gsi1sk",
            composite: [],
          },
        },
      },
    },
    { client: DynamoClient, table: DB_TABLE },
  );
