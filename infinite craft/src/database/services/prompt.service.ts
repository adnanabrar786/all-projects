import { PromisePutModelResponse } from "../interface/model.interface";
import { ICreatePrompt, Reaction } from "../interface/prompt.interface";
import { InfiniteCraftApp } from "../models/app";

const model = InfiniteCraftApp.entities.prompt;

export const createPrompt = (
  data: ICreatePrompt,
): PromisePutModelResponse<typeof model> => {
  return model
    .create({
      id: data.id,
      user: data.userID,
      heading: data.heading,
      prompt: data.prompt,
      reaction: Reaction.NONE,
    })
    .go({ pages: "all" });
};
export const updateUserReaction = (
  id: string,
  user: string,
  reaction: Reaction,
) => {
  return model.update({ id, user }).set({ reaction }).go({ pages: "all" });
};

export const getPromptByUser = (user: string) => {
  return model.query.byUser({ user }).go({ pages: "all" });
};
export const getUserPromptById = async (id: string, user: string) => {
  return model.find({ id, user }).go({ pages: "all" });
};

export const deletePromptById = async (id: string, user: string) => {
  return model.delete({ id, user }).go({ pages: "all" });
};
