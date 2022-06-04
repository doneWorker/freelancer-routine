import axios from 'axios'
import { signUpArgs } from 'types/common'

import { API_URL, ACCESS_TOKEN_KEY, responseIsSuccess } from './common'

export const signIn = async (
  email: string,
  password: string,
): Promise<{ token: string } | null> => {
  const url = `${API_URL}/auth/sign-in`
  const resp = await axios.post(url, { email, password })
  const isSuccess = responseIsSuccess(resp)

  if (isSuccess && resp.data.token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, resp.data.token)
    return { token: resp.data.token }
  }

  return null
}

export const signUp = async (args: signUpArgs) => {
  const url = `${API_URL}/auth/sign-up`
  const resp = await axios.post(url, {
    ...args,
  })
  const isSuccess = responseIsSuccess(resp)

  if (isSuccess && resp.data.token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, resp.data.token)
    return { token: resp.data.token }
  }

  return null
}

export const signOut = () => {}
