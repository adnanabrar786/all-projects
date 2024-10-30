import { Schema, PutRecordGo, ResponseItem } from "electrodb";

export type ModelListResponse<S extends Schema<string, string, string>> = {
  cursor: string | null;
  data: ResponseItem<string, string, string, S>[];
};

export type PromisePutModelResponse<S> = Promise<{
  data: PutRecordGo<S>;
}>;
