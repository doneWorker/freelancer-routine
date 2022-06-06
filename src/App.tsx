import { lazy, Suspense, useLayoutEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  ChakraProvider, extendTheme, Spinner, Box,
} from '@chakra-ui/react'

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

const LoadingSpinner = () => (
  <Box
    w="100vw"
    h="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Spinner label="loading" size="xl" />
  </Box>
)

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
              <Suspense fallback={<LoadingSpinner />}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          )}
        />
        <Route
          path="/signin"
          element={(
            <Suspense fallback={<LoadingSpinner />}>
              <SignIn />
            </Suspense>
          )}
        />
        <Route
          path="/signup"
          element={(
            <Suspense fallback={<LoadingSpinner />}>
              <SignUp />
            </Suspense>
          )}
        />
        <Route
          path="dashboard"
          element={(
            <ProtectedRoute>
              <Suspense fallback={<LoadingSpinner />}>
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
                <Suspense fallback={<LoadingSpinner />}>
                  <Project />
                </Suspense>
              </ProtectedRoute>
            )}
          />
          <Route
            path=":taskId"
            element={(
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
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
