import { useCallback, useEffect } from 'react'
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
  Box,
  Flex,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import { fetchTasks, tasksSelector } from '../store/slices/tasksSlice'
import LanguageSwitcher from '../components/LanguageSwitcher'
import TaskRow from '../components/Task.row'

import { useTicker } from '../hooks/useTicker'

/*
 * Main Page
 */
const Project = () => {
  const tasks = useSelector(tasksSelector)
  const dispatch = useDispatch()
  const { id } = useParams()

  useTicker(useCallback(() => {}, []))

  // hydrate
  useEffect(() => {
    if (id !== undefined) dispatch(fetchTasks(id))
  }, [dispatch, id])

  return (
    <>
      <LanguageSwitcher style={{ position: 'absolute', top: 5, right: 5 }} />
      <Container width="100%" maxWidth="100%">
        <Flex>
          <TableContainer>
            <Table>
              <TableCaption placement="top">Project: {id}</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Time Spent</Th>
                  <Th>Tags</Th>
                  <Th>Date Created</Th>
                  <Th>Date Updated</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tasks.list.map((task) => (
                  <TaskRow key={task.id} {...task} onClick={() => {}} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Box>Sidebar</Box>
        </Flex>
      </Container>
    </>
  )
}

export default Project
