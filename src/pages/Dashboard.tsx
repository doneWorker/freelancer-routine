import { useCallback, useEffect } from 'react'
import { Container, Box, Heading, Divider, Stack } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { fetchProjects, projectsSelector } from '../store/slices/projectsSlice'
// import { LoadingStatus } from "../types/common";
import LanguageSwitcher from '../components/LanguageSwitcher'
import ProjectList from '../components/Project.list'

/*
 * Main Page
 */
const Dashboard: React.FC = () => {
  const projects = useSelector(projectsSelector)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  // const status = useMemo(() => projects.status, [projects.status]);

  // hydrate
  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  return (
    <>
      <LanguageSwitcher style={{ position: 'absolute', top: 5, right: 5 }} />
      <Box>Sections</Box>

      <Container maxW="container.lg">
        <section id="projects">
          <Heading p={5} fontSize={'xl'}>
            {t('dashboard.MY_PROJECTS')}
          </Heading>
          <Divider mb={10} />
          <ProjectList list={projects.list} />
        </section>
        {/* {status === LoadingStatus.Loading && <>Loading...</>}
      {status === LoadingStatus.Failed && <>Failed...</>}
      {status === LoadingStatus.Succeeded && <>Succeed...</>}
      {status === LoadingStatus.Idle && <>Idle...</>} */}
        <section id="recent-tasks">
          <Heading mt={12} p={5} fontSize={'xl'}>
            {t('dashboard.RECENT_TASKS')}
          </Heading>
          <Divider mb={10} />
          <Stack>
            {/* <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" /> */}
          </Stack>
        </section>

        <section id="stats">
          <Heading mt={12} p={5} fontSize={'xl'}>
            {t('dashboard.STATS')}
          </Heading>
          <Divider mb={10} />
          <Box>
            {/* <Skeleton mt="4" height="300px" />
            <Flex justify="space-between">
              <Skeleton mt="4" width="33%" height="150px" />
              <Skeleton mt="4" width="33%" height="150px" />
              <Skeleton mt="4" width="33%" height="150px" />
            </Flex> */}
          </Box>
        </section>
      </Container>
    </>
  )
}

export default Dashboard
