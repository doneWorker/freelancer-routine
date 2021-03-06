/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum LoadingStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
}

export type Clickable = { onClick?: (...args: any) => void }

export interface signUpArgs {
  firstName: string
  lastName: string
  password: string
  email: string
  confirmPassword: string
}
