// import { lazy } from "react";
import { Routes, Route } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import Dashboard from 'pages/Dashboard'
import Project from 'pages/Project'

// const Project = lazy(() => import("./pages/Project"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
})

const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="project/:projectId">
        <Route path="" element={<Project />} />
        <Route path=":taskId" element={<Project />} />
      </Route>
    </Routes>
  </ChakraProvider>
)

export default App
