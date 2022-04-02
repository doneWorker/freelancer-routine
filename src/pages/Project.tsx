import { useCallback, useEffect, useState } from 'react'
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
  Flex,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import { useTicker } from '../hooks/useTicker'
import { fetchTasks, tasksSelector } from '../store/slices/tasksSlice'
import Header from '../components/Header'
import TaskRow from '../components/Task.row'
import TaskView from '../components/Task.view'

/*
 * Main Page
 */
const Project: React.FC = () => {
  const tasks = useSelector(tasksSelector)
  const dispatch = useDispatch()
  const { id } = useParams()
  const [isTaskView, setIsTaskView] = useState<Boolean>(false)

  useTicker(useCallback(() => {}, []))

  const handleOpenTask = (taskId: string) => {
    setIsTaskView((p) => !p)
  }

  // hydrate
  useEffect(() => {
    if (id !== undefined) dispatch(fetchTasks(id))
  }, [dispatch, id])

  return (
    <>
      <Header isAbsolute />
      <Container width="100%" maxWidth="100%">
        <Flex>
          <TableContainer width="100%">
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
                  <TaskRow
                    key={task.id}
                    {...task}
                    onClick={() => handleOpenTask(task.id)}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {isTaskView && <TaskView name="Kirill's Task" />}
        </Flex>
      </Container>
    </>
  )
}

export default Project
