import { API_WEDDING } from 'config/environment';
import axios, { AxiosRequestConfig } from 'axios';
import { GetToken } from 'services/token.service';
import { IAddTimelineEvent, IDeleteTimelineEvent, IUpdateTimelineEvent, IUpdateWeddingDate } from 'interfaces/wedding';

export class WeddingService {
  GetWedding = async () => {
    try {
      const token = await GetToken();
      const config: AxiosRequestConfig = {
        method: 'get',
        url: `/api/wedding`,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      };
      return axios(config);
    } catch (err) {
      return;
    }
  };

  CreateWedding = async (body: any) => {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${API_WEDDING}/create-wedding`,
      data: body,
    };
    const response = await axios(config);

    return response;
  };

  ResetTimeline = async (body: any) => {
    try {
      const token = await GetToken();
      const config: AxiosRequestConfig = {
        method: 'POST',
        url: `${API_WEDDING}/reset-timeline`,
        data: body,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios(config);
      return response;
    } catch (err) {
      return;
    }
  };

  PinEvent = async (body: any) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${API_WEDDING}/wedding/timeline/pin-event`,
      data: body,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios(config);

    return response;
  };

  ChangePassword = async (body: any) => {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${API_WEDDING}/change-password`,
      data: body,
    };
    const response = await axios(config);

    return response;
  };

  GetWeddingLocations = async () => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `/api/wedding/locations`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios(config);

    return response;
  };

  GenerateWeddingTimeline = async (body) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${API_WEDDING}/wedding-timeline`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: body,
    };
    const response = await axios(config);

    return response;
  };

  GetWeddingTimeline = async () => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `/api/wedding/timeline`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    return axios(config);
  };

  GetWeddingTimelineEvents = async () => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${API_WEDDING}/wedding/timeline/events`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios(config);

    return response;
  };

  UpdateTimelineEvent = async (body: IUpdateTimelineEvent) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `${API_WEDDING}/wedding/timeline/event`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: body,
    };
    const response = await axios(config);
    return response;
  };

  UpdateWeddingDate = async (body: IUpdateWeddingDate) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `${API_WEDDING}/wedding/wedding-date`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: body,
    };
    const response = await axios(config);
    return response;
  };

  AddTimelineEvent = async (body: IAddTimelineEvent) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${API_WEDDING}/wedding/timeline/event`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: body,
    };
    const response = await axios(config);
    return response;
  };
  DeleteTimelineEvent = async (body: IDeleteTimelineEvent) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'delete',
      url: `${API_WEDDING}/wedding/timeline/event`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: body,
    };
    const response = await axios(config);
    return response;
  };

  GetCeremonyTimeline = async (wedding_id: number) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${API_WEDDING}/wedding/timeline/ceremony?wedding_id=${wedding_id}`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios(config);
    return response;
  };

  GetReceptionTimeline = async (wedding_id: number) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${API_WEDDING}/wedding/timeline/reception?wedding_id=${wedding_id}`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios(config);
    return response;
  };

  GetVendorsTimeline = async (wedding_id: number) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${API_WEDDING}/wedding/timeline/vendors?wedding_id=${wedding_id}`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios(config);
    return response;
  };

  GetLocationsTimeline = async (wedding_id: number) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${API_WEDDING}/wedding/timeline/locations?wedding_id=${wedding_id}`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios(config);
    return response;
  };

  GetWebLinkData = async (timeline_id: string) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${API_WEDDING}/wedding/timeline/web-link?timeline_id=${timeline_id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios(config);
    return response;
  };
}
