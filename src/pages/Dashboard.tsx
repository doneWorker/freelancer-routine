import { useEffect, useMemo } from "react";
import {
  Container,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { fetchProjects, projectsSelector } from "../store/slices/projectsSlice";
import { LoadingStatus } from "../types/common";
import { Project } from "../models/Project";

/*
 * Needs to be moved out of here
 */

const ProjectLI = styled(ListItem)`
  width: 100%;
  border: 2px solid #fff;
`;
interface ProjectsListProps {
  list: Project[];
}
const ProjectsList = ({ list }: ProjectsListProps) => (
  <List>
    {list.map((li) => (
      <ProjectLI border={1} key={li.id}>
        {li.name}
      </ProjectLI>
    ))}
  </List>
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
    <Container>
      <ProjectsList list={projects.list} />
      {/* {status === LoadingStatus.Loading && <>Loading...</>}
      {status === LoadingStatus.Failed && <>Failed...</>}
      {status === LoadingStatus.Succeeded && <>Succeed...</>}
      {status === LoadingStatus.Idle && <>Idle...</>} */}
    </Container>
  );
};

export default Dashboard;
