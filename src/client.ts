import type { FormData } from 'formdata-node';

import type { TorrentSettings } from '@ctrl/shared-torrent';

export type Headers = Record<string, string | string[] | undefined>;

export interface Response<T> {
  body: T;
  headers: Headers;
}

interface CommonOptions {
  retry: {
    limit: number;
  };
  timeout: {
    request: number;
  };
  agent?: TorrentSettings['agent'];
}

export interface RequestOptions extends CommonOptions {
  json: {
    method: string;
    params: any[];
    id: number;
  };
  headers: Headers;
  responseType: 'json';
}

export interface UploadOptions extends CommonOptions {
  body: FormData;
}

export interface HTTPRequestClient {
  request<T>(url: string, options?: RequestOptions): Promise<Response<T>>;
  upload<T>(url: string, options?: UploadOptions): Promise<Response<T>>;
}

// TODO: use proper DI
let client: HTTPRequestClient;

export const provideClient = (value: HTTPRequestClient): void => {
  client = value;
};

export const injectClient = (): HTTPRequestClient => client;
//
