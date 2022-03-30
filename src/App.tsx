// import { lazy } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";

// const Project = lazy(() => import("./pages/Project"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
});

const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="project" element={<Project />} />
    </Routes>
  </ChakraProvider>
);

export default App;
