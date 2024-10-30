export interface ICreateUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_social_connection: string;
  subscription_type: UserSubscriptionType;
}

export enum UserSubscriptionType {
  PREMIUM = "PREMIUM",
  FREEMIUM = "FREEMIUM",
}
