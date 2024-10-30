export interface GeneratePrompt {
  message: string;
  types: string;
  topic: string;
  tone: string;
  style: string;
  length: string;
  action: string;
  language: string;
}

export interface RegeneratePrompt {
  heading: string;
  body: string;
}
export interface SavePrompt {
  heading: string;
  body: string;
}
export interface EditPrompt {
  heading: string;
  body: string;
}

export interface PromptList {
  heading: string;
  body: string;
}
