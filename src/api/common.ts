import { AxiosResponse } from 'axios/index.d'

export const API_URL = 'http://localhost:5000'

export const ACCESS_TOKEN_KEY = 'access-token'

export type GeneralResponse = {
  status: 'error' | 'success'
}

export interface ListResponse<T> extends GeneralResponse {
  list: T[]
}

export const responseIsSuccess = (resp: AxiosResponse) =>
  resp.data.status === 'success'
