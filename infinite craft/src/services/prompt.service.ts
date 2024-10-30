import {
  BASE_URL,
  GENERATE_PROMPT_URL,
  REGENERATE_PROMPT_URL,
} from "@/config/environments";
import {
  EditPrompt,
  GeneratePrompt,
  SavePrompt,
} from "@/interface/prompt.interface";
import axios, { AxiosRequestConfig } from "axios";

export const generatePrompt = async (
  data: Partial<GeneratePrompt>,
  token: string,
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const inputData = {
      data,
    };

    const config: AxiosRequestConfig = {
      method: "POST",
      url: GENERATE_PROMPT_URL,
      data: inputData,
      headers: headers,
    };
    const response = await axios(config);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.data || "Network response was not ok");
  }
};
export const reGeneratePrompt = async (data: EditPrompt, token: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const inputData = {
      data,
    };
    const config: AxiosRequestConfig = {
      method: "POST",
      url: REGENERATE_PROMPT_URL,
      data: inputData,
      headers: headers,
    };
    const response = await axios(config);
    return response.data.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};
export const savePrompt = async (data: SavePrompt, token: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let saveData = {
      data: {
        heading: data.heading,
        prompt: data.body,
      },
    };
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `${BASE_URL}/v1/prompt/save`,
      data: saveData,
      headers: headers,
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export const GetPromptList = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${BASE_URL}/v1/prompt`, { headers });
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export const getProfile = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${BASE_URL}/v1/user/profile`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export const deletePrompt = async ([id, token]: string[]) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.delete(`${BASE_URL}/v1/prompt/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export const PostLikeDislike = async ([
  postId,
  otherParam,
  token,
]: string[]) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  let data = {
    data: {
      id: postId,
      react: otherParam,
    },
  };

  const config: AxiosRequestConfig = {
    method: "put",
    url: `${BASE_URL}/v1/prompt/react`,
    data,
    headers: headers,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};
