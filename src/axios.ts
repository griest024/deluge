import axios, { AxiosResponse } from 'axios';

import {
  HTTPRequestClient,
  provideClient,
  RequestOptions,
  Response,
  UploadOptions,
} from './client.js';

const mapBody = <T>(response: AxiosResponse<T>): Response<T> => ({
  body: response.data,
  headers: response.headers,
});

export const axiosClient: HTTPRequestClient = {
  async request<T>(url: string, options?: RequestOptions): Promise<Response<T>> {
    return axios
      .post<T>(url, options.json, {
        responseType: options.responseType,
        headers: options.headers,
        httpAgent: options.agent?.http,
        httpsAgent: options.agent?.https,
        timeout: options.timeout.request,
      })
      .then(mapBody);
  },

  async upload<T>(url: string, options?: UploadOptions): Promise<Response<T>> {
    return axios
      .post<T>(url, options.body, {
        httpAgent: options.agent?.http,
        httpsAgent: options.agent?.https,
        timeout: options.timeout.request,
      })
      .then(mapBody);
  },
};

provideClient(axiosClient);
