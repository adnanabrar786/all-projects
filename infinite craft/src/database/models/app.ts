// import { DynamoClient } from 'src/config/dynamodb';
// import { DB_TABLE } from 'src/config/environments';
import {
  Service,
  EntityItem,
  QueryResponse,
  CreateEntityItem,
} from "electrodb";
import { Users } from "./users";
import { Prompt } from "./prompt";
import { DynamoClient } from "../config/dynamodb";
import { DB_TABLE } from "../config/environments";

export const SERVICE_NAME = "infinitecraftapp";

const users = Users(SERVICE_NAME);
const prompt = Prompt(SERVICE_NAME);

export const InfiniteCraftApp = new Service(
  {
    users: users,
    prompt: prompt,
  },
  { client: DynamoClient, table: DB_TABLE },
);

export type UsersItem = EntityItem<typeof users>;
export type CreateUsersItem = CreateEntityItem<typeof users>;
export type UsersQueryResponse = QueryResponse<typeof users>;

export type PromptItem = EntityItem<typeof prompt>;
export type CreatePromptItem = CreateEntityItem<typeof prompt>;
export type PromptQueryResponse = QueryResponse<typeof prompt>;
