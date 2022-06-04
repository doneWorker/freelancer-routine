/* eslint-disable no-undef */
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { userState } from 'store/recoil/user.atom'

interface ProtectedRouteArgs {
  redirectPath?: string
  children?: JSX.Element
}
export const ProtectedRoute = ({
  redirectPath = '/signin',
  children,
}: ProtectedRouteArgs): JSX.Element => {
  const user = useRecoilValue(userState)
  console.log('me', user)

  if (user.status === 'Failed') {
    return <Navigate to={redirectPath} replace />
  }

  return children as JSX.Element
}

export const A = 'A'
