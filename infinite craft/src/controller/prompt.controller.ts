import { BadRequestException } from "@/Errors/BadRequestException";
import { ValidationException } from "@/Errors/ValidationException";
import { data } from "@/config/data";
import { UserSubscriptionType } from "@/database/interface/user.interface";
import {
  getUserProfile,
  userPromptCounter,
} from "@/database/services/users.service";
import withValidation from "@/handler/withValidation";
import {
  GeneratePrompt,
  RegeneratePrompt,
  SavePrompt,
} from "@/interface/prompt.interface";
import {
  INVALID_JSON_OBJECT,
  TRIAL_VERSION_EXPIRE,
  USER_NOT_FOUND,
} from "@/utils/enums/error";
import { GPT_TURBO, getOpenAIInstance } from "@/utils/openai";
import { getGeneratePrompt, getString, regeneratePrompt } from "@/utils/prompt";
import {
  promptGenerateSchema,
  promptRegenerateSchema,
  promptSaveSchema,
} from "@/validator/prompt.validator";

import OpenAI from "openai";

export const generate = withValidation<GeneratePrompt>(promptGenerateSchema)(
  async (body: GeneratePrompt, userID: string) => {
    const userData = await getUserProfile(userID);

    if (!userData.data.length) throw new BadRequestException(USER_NOT_FOUND);

    const user = userData.data[0];

    if (
      user.user_count === 0 &&
      user.user_subscription_type === UserSubscriptionType.FREEMIUM
    )
      throw new BadRequestException(TRIAL_VERSION_EXPIRE);

    const openai = getOpenAIInstance();

    const inputData = {
      description: body.message,
      topic: body.topic,
      type: body.types,
      length: body.length,
      action: body.action,
      tone: body.tone,
      style: body.style,
    };

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [
        { role: "assistant", content: getGeneratePrompt(inputData) },
        { role: "user", content: getString(inputData) },
      ],
      model: GPT_TURBO,
    };

    // const response = await openai.chat.completions.create(params);

    // if (!response.choices[0].message.content) return null;

    // const result = JSON.parse(response.choices[0].message.content);

    // if (!Array.isArray(result.output)) return INVALID_JSON_OBJECT;

    // if (user.user_subscription_type === UserSubscriptionType.FREEMIUM) {
    //   const count = user.user_count != 0 ? Number(user.user_count) - 1 : 0;
    //   await userPromptCounter(userID, user.user_email, count);
    // }
    return "result";
  },
);

export const regenerate = withValidation<RegeneratePrompt>(
  promptRegenerateSchema,
)(async (body: RegeneratePrompt) => {
  const openai = getOpenAIInstance();
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      { role: "assistant", content: regeneratePrompt },
      { role: "user", content: `${body.heading}\n${body.body}` },
    ],
    model: GPT_TURBO,
  };

  const response = await openai.chat.completions.create(params);

  if (!response.choices[0].message.content) return null;

  return JSON.parse(response.choices[0].message.content);
});
export const save = withValidation<SavePrompt>(promptSaveSchema)(async (
  body: SavePrompt,
) => {
  return body;
});
export const get = async (req: Request, object: any) => {
  return data;
};
