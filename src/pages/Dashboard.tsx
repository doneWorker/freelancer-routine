import { useEffect, useMemo } from "react";
import {
  Container,
  Box,
  Heading,
  SimpleGrid,
  Center,
  Divider,
  Icon,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { fetchProjects, projectsSelector } from "../store/slices/projectsSlice";
import { LoadingStatus } from "../types/common";
import { Project } from "../models/Project";

import { BsClock, BsListTask } from "react-icons/bs";
import { BiTask, BiDollar } from "react-icons/bi";

/*
 * TODO: Needs to be moved out of here
 */
interface ProjectsListProps {
  list: Project[];
}

const ProjectsList = ({ list }: ProjectsListProps) => {
  const { t } = useTranslation();

  return (
    <SimpleGrid minChildWidth="250px" spacing="10px">
      {list.map(
        ({
          name,
          timeSpent = 90,
          tasksCompleted = 10,
          tasksTotal = 15,
          moneyEarned = 555,
        }) => (
          <Box
            height={150}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            // _hover={{
            //   cursor: "pointer",
            //   background: "gray.100",
            //   color: "teal.500",
            // }}
          >
            <Box p={6}>
              <Heading fontSize="m">{name}</Heading>
            </Box>
            <Box
              borderTopWidth="1px"
              height="40px"
              display="flex"
              justifyContent="space-evenly"
            >
              <Tooltip label={t("dashboard.TIME_SPENT")} fontSize="md">
                <Box
                  cursor="help"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Icon as={BsClock} />
                  <Text ml={2}>{timeSpent}</Text>
                </Box>
              </Tooltip>
              <Divider orientation="vertical" />
              <Tooltip label={t("dashboard.TASKS_TOTAL")} fontSize="md">
                <Box
                  cursor="help"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Icon as={BsListTask} />
                  <Text ml={2}>{tasksTotal}</Text>
                </Box>
              </Tooltip>
              <Divider orientation="vertical" />
              <Tooltip label={t("dashboard.TASKS_COMPLETED")} fontSize="md">
                <Box
                  cursor="help"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Icon as={BiTask} />
                  <Text ml={2}>{tasksCompleted}</Text>
                </Box>
              </Tooltip>
              <Divider orientation="vertical" />
              <Tooltip label={t("dashboard.MONEY_EARNED")} fontSize="md">
                <Box
                  cursor="help"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Icon as={BiDollar} />
                  <Text ml={2}>{moneyEarned}</Text>
                </Box>
              </Tooltip>
            </Box>
          </Box>
        )
      )}
      <Box
        p={5}
        minHeight={100}
        borderWidth={2}
        borderStyle={"dotted"}
        borderRadius="lg"
        overflow="hidden"
        _hover={{
          cursor: "pointer",
          background: "gray.100",
          color: "teal.500",
        }}
      >
        <Center h="100%">
          <Heading fontSize="m">{t("dashboard.ADD_NEW")}</Heading>
        </Center>
      </Box>
    </SimpleGrid>
  );
};

/*
 * Main Page
 */
const Dashboard = () => {
  const projects = useSelector(projectsSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const status = useMemo(() => projects.status, [projects.status]);

  // hydrate
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <Container maxW="container.xl">
      <Heading p={5} fontSize={"xl"}>
        {t("dashboard.MY_PROJECTS")}
      </Heading>
      <Divider mb={10} />
      <ProjectsList list={projects.list} />
      {/* {status === LoadingStatus.Loading && <>Loading...</>}
      {status === LoadingStatus.Failed && <>Failed...</>}
      {status === LoadingStatus.Succeeded && <>Succeed...</>}
      {status === LoadingStatus.Idle && <>Idle...</>} */}

      <Heading mt={12} p={5} fontSize={"xl"}>
        {t("dashboard.RECENT_TASKS")}
      </Heading>
      <Divider mb={10} />
    </Container>
  );
};

export default Dashboard;
