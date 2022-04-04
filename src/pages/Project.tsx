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
  Button,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router'

import { useTicker } from '../hooks/useTicker'
import {
  createTask,
  fetchTasks,
  tasksSelector,
  tasksActiveSelector,
  setActiveTask,
  update,
} from '../store/slices/tasksSlice'
import Header from '../components/Header'
import TaskRow from '../components/Task.row'
import TaskView from '../components/Task.view'
import { Task } from '../models/Task'
import { RootState } from '../store'

/*
 * Main Page
 */
const Project: React.FC = () => {
  const tasks = useSelector(tasksSelector)
  const active = useSelector(tasksActiveSelector)
  const activeTask = useSelector<RootState, Task | undefined>((state) =>
    state.tasks.list.find((t) => t.id === active)
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { projectId } = useParams()
  const [isTaskView, setIsTaskView] = useState<Boolean>(false)

  useTicker(useCallback(() => {}, []))

  const handleOpenTask = (taskId: string) => {
    setIsTaskView((p) => !p)
  }

  const handleAddTask = useCallback(async () => {
    if (projectId) {
      const taskId: unknown = await dispatch(createTask(projectId))
      typeof taskId === 'string' && dispatch(setActiveTask(taskId))

      navigate(`/project/${projectId}/${taskId}`)
    }
  }, [dispatch, navigate, projectId])

  const handleChangeTask = useCallback(
    (key, val) => {
      active !== undefined && dispatch(update({ id: active, key, val }))
    },
    [dispatch, active]
  )

  // hydrate
  useEffect(() => {
    if (projectId !== undefined) dispatch(fetchTasks(projectId))
  }, [dispatch, projectId])

  return (
    <>
      <Header />
      <Button margin={1} size="sm" onClick={handleAddTask}>
        Add Task
      </Button>
      <Container width="100%" maxWidth="100%">
        <Flex>
          <TableContainer width="100%">
            <Table>
              <TableCaption placement="top">Project: {projectId}</TableCaption>
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
          {isTaskView && (
            <TaskView name={activeTask?.name} onTaskChange={handleChangeTask} />
          )}
        </Flex>
      </Container>
    </>
  )
}

export default Project
