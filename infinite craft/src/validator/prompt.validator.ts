import * as yup from "yup";
import data from "../data/accordion.json";

const STRING_TYPE = yup.string();

export const promptGenerateSchema = yup.object({
  message: STRING_TYPE.required("input is required"),
  types: STRING_TYPE.required("input is required").oneOf(
    data[0].options,
    "Invalid type",
  ),
  topic: STRING_TYPE.required("input is required").oneOf(
    data[1].options,
    "Invalid topic",
  ),
  tone: STRING_TYPE.required("input is required").oneOf(
    data[2].options,
    "Invalid tone",
  ),
  style: STRING_TYPE.required("input is required").oneOf(
    data[3].options,
    "Invalid style",
  ),
  length: STRING_TYPE.required("input is required").oneOf(
    data[4].options,
    "Invalid length",
  ),
  action: STRING_TYPE.required("input is required").oneOf(
    data[5].options,
    "Invalid action",
  ),
  language: STRING_TYPE.required("input is required").oneOf(
    data[6].options,
    "Invalid language",
  ),
});

export const promptRegenerateSchema = yup.object({
  heading: STRING_TYPE.required("Heading is required"),
  body: STRING_TYPE.required("Body is required"),
});

export const promptSaveSchema = yup.object({
  prompt: STRING_TYPE.required("input is required"),
});

export const validateGeneratePromptInput = (input: Partial<any>) => {
  const requiredKeys = [
    "message",
    "types",
    "topic",
    "tone",
    "style",
    "length",
    "action",
    "language",
  ];
  const missingKeys = requiredKeys.filter(
    (key) => !(key in input) || !input[key],
  );
  if (missingKeys.length === 0) {
    return {};
  } else {
    const missingKeysObject: { [key: string]: string } = {};
    missingKeys.forEach((key) => {
      missingKeysObject[key] = `${key} is required`;
    });
    return missingKeysObject;
  }
};
