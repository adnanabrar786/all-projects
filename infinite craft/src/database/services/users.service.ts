import {
  ModelListResponse,
  PromisePutModelResponse,
} from "../interface/model.interface";
import { ICreateUser, UserSubscriptionType } from "../interface/user.interface";
import { InfiniteCraftApp } from "../models/app";

const model = InfiniteCraftApp.entities.users;

export function getUserProfile(
  id: string,
): Promise<ModelListResponse<(typeof model)["schema"]>> {
  return model.query.primary({ user: id }).go({ pages: "all" });
}

export function createUser(
  body: ICreateUser,
  stripe_id: string,
): PromisePutModelResponse<typeof model> {
  return model
    .create({
      user: body.id,
      user_email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      user_social_connection: body.user_social_connection,
      user_subscription_type:
        body.subscription_type ?? UserSubscriptionType.FREEMIUM,
      stripe_id,
    })
    .go({ pages: "all" });
}

export function updateUser(
  user: string,
  user_email: string,
  first_name: string,
  last_name: string,
  user_image: string,
) {
  return model
    .update({ user, user_email })
    .set({
      first_name,
      last_name,
      user_image,
    })
    .go({ pages: "all" });
}

export function updateUserSubscription(
  user: string,
  user_email: string,
  user_subscription_type: UserSubscriptionType,
) {
  return model
    .update({ user, user_email })
    .set({ user_subscription_type })
    .go({ pages: "all" });
}

export const userPromptCounter = (
  user: string,
  user_email: string,
  user_count: number,
) => {
  return model
    .update({ user, user_email })
    .set({ user_count })
    .go({ pages: "all" });
};
