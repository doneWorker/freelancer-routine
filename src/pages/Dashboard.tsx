import { useEffect, useMemo } from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProjects, projectsSelector } from "../store/slices/projectsSlice";
import { LoadingStatus } from "../types/common";
import { Project } from "../models/Project";

/*
 * TODO: Needs to be moved out of here
 */
interface ProjectsListProps {
  list: Project[];
}
const ProjectsList = ({ list }: ProjectsListProps) => (
  <SimpleGrid minChildWidth="200px" spacing="10px">
    {list.map(({ name, description }) => (
      <Box p={5} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Heading fontSize="m">{name}</Heading>
        <Text mt={4}>{description}</Text>
      </Box>
    ))}
    <Box
      p={5}
      borderWidth="2px"
      borderStyle={"dotted"}
      borderRadius="lg"
      overflow="hidden"
    >
      <Center>
        <Heading fontSize="m">Add New Project</Heading>
      </Center>
    </Box>
  </SimpleGrid>
);

/*
 * Main Page
 */
const Dashboard = () => {
  const projects = useSelector(projectsSelector);
  const dispatch = useDispatch();
  const status = useMemo(() => projects.status, [projects.status]);

  // hydrate
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <Container maxW="container.xl">
      <Heading p={5} fontSize={"xl"}>
        My projects
      </Heading>
      <ProjectsList list={projects.list} />
      {/* {status === LoadingStatus.Loading && <>Loading...</>}
      {status === LoadingStatus.Failed && <>Failed...</>}
      {status === LoadingStatus.Succeeded && <>Succeed...</>}
      {status === LoadingStatus.Idle && <>Idle...</>} */}
    </Container>
  );
};

export default Dashboard;
