import { atom, useSetRecoilState } from 'recoil'
import decodeJWT from 'jwt-decode'

import * as api from 'api/auth'
import { signUpArgs } from 'types/common'

interface IUserState {
  status: 'Idle' | 'Failed' | 'Success'
  firstName: string
  lastName: string
  email: string
}

export const userState = atom<IUserState>({
  key: 'User',
  default: {
    status: 'Idle',
    firstName: '',
    lastName: '',
    email: '',
  },
})

export const useUserAction = () => {
  const setUser = useSetRecoilState(userState)

  const signIn = async (email: string, password: string) => {
    const resp = await api.signIn(email, password)

    if (resp !== null) {
      const { firstName, lastName }: any = decodeJWT(resp.token)

      setUser({
        status: 'Success',
        firstName,
        lastName,
        email,
      })
    } else {
      setUser((prev) => ({ ...prev, status: 'Failed' }))
    }
  }

  const signUp = async (data: signUpArgs) => {
    const resp = await api.signUp(data)

    if (resp !== null) {
      const { firstName, lastName }: any = decodeJWT(resp.token)

      setUser({
        status: 'Success',
        firstName,
        lastName,
        email: data.email,
      })
    } else {
      setUser((prev) => ({ ...prev, status: 'Failed' }))
    }
  }

  // TODO: add BE request
  const fetchUser = () => {
    const jwt = localStorage.getItem('access-token')

    if (jwt !== null && jwt !== '') {
      const data: any = decodeJWT(jwt)
      setUser(() => ({
        firstName: data.firstName,
        lastName: data.LastName,
        email: data.email,
        status: 'Success',
      }))
    } else {
      setUser((prev) => ({ ...prev, status: 'Failed' }))
    }
  }

  return {
    signIn,
    signUp,
    fetchUser,
  }
}
