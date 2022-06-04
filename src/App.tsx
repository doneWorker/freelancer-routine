import { lazy, Suspense, useLayoutEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import { ProtectedRoute } from 'navigation'
import { useUserAction } from 'store/recoil/user.atom'
import bootstrapApi from 'api/bootstrap'

import './App.css'

bootstrapApi()

const Project = lazy(() => import('./pages/Project'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const SignIn = lazy(() => import('./pages/Auth/SignIn'))
const SignUp = lazy(() => import('./pages/Auth/SignUp'))

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
})

const App = () => {
  const { fetchUser } = useUserAction()

  useLayoutEffect(() => {
    fetchUser()
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={(
            <ProtectedRoute>
              <Suspense fallback={<>Loading...</>}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          )}
        />
        <Route
          path="/signin"
          element={(
            <Suspense fallback={<>Loading...</>}>
              <SignIn />
            </Suspense>
          )}
        />
        <Route
          path="/signup"
          element={(
            <Suspense fallback={<>Loading...</>}>
              <SignUp />
            </Suspense>
          )}
        />
        <Route
          path="dashboard"
          element={(
            <ProtectedRoute>
              <Suspense fallback={<>Loading...</>}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          )}
        />
        <Route path="project/:projectId">
          <Route
            path=""
            element={(
              <ProtectedRoute>
                <Suspense fallback={<>Loading...</>}>
                  <Project />
                </Suspense>
              </ProtectedRoute>
            )}
          />
          <Route
            path=":taskId"
            element={(
              <ProtectedRoute>
                <Suspense fallback={<>Loading...</>}>
                  <Project />
                </Suspense>
              </ProtectedRoute>
            )}
          />
        </Route>
      </Routes>
    </ChakraProvider>
  )
}

export default App
