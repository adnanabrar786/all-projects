import axios from "axios";

export const fetchAPI = async (url: string) => {
  try {
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error(`Failed to fetch API with status: ${response.status}`);
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
