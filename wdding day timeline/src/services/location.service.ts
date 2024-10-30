import axios, { AxiosRequestConfig } from 'axios';

export async function GetLocationPlaceName(place_id: string) {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: `/api/locations`,
    data: { data: { place_id } },
  };
  const response = await axios(config);
  return response;
}
