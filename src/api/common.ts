import { AxiosResponse } from 'axios/index.d'

export type GeneralResponse = {
  status: 'error' | 'success'
}

export interface ListResponse<T> extends GeneralResponse {
  list: T[]
}

export const responseIsSuccess = (resp: AxiosResponse) =>
  resp.data.status === 'success'
