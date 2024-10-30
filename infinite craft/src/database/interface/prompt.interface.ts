export interface ICreatePrompt {
  id: string;
  userID: string;
  heading: string;
  prompt: string;
}

export enum Reaction {
  LIKE = "LIKE",
  UNLIKE = "UNLIKE",
  NONE = "NONE",
}
