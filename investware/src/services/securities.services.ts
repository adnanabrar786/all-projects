import { BASE_URL } from '@/constants/api';
import { getToken } from '@/utils/token';
import axios from 'axios';

export const getSecurityTypes = async () => {
  try {
    const token = getToken();

    const res = await axios.get(`${BASE_URL}/securities/types`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return [];
  }
};
