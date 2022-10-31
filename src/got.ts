import got from 'got';

import {
  HTTPRequestClient,
  provideClient,
  RequestOptions,
  Response,
  UploadOptions,
} from './client.js';

export const gotClient: HTTPRequestClient = {
  async request<T>(url: string, options?: RequestOptions): Promise<Response<T>> {
    return got.post<T>(url, options);
  },

  async upload<T>(url: string, options?: UploadOptions): Promise<Response<T>> {
    return got.post<T>(url, options);
  },
};

provideClient(gotClient);
