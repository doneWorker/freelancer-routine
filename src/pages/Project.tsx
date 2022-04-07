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

import { Task } from 'models/Task'
import { RootState } from 'store'
import {
  createTask,
  fetchTasks,
  setActiveTask,
  update,
  tasksSelector,
  tasksActiveIdSelector,
  taskActiveSelector,
} from 'store/slices/tasksSlice'
import Header from 'components/Header'
import TaskRow from 'components/Task.row'
import TaskView from 'components/Task.view'

import { AiOutlinePlusCircle } from 'react-icons/ai'

/*
 * Project's page
 */
const Project: React.FC = () => {
  const tasks = useSelector(tasksSelector)
  const active = useSelector(tasksActiveIdSelector)
  const activeTask = useSelector(taskActiveSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { projectId } = useParams()
  const [isTaskView, setIsTaskView] = useState<Boolean>(false)

  const handleOpenTask = useCallback(
    (taskId: string) => {
      setIsTaskView(true)
      typeof taskId === 'string' && dispatch(setActiveTask(taskId))
      navigate(`/project/${projectId}/${taskId}`)
    },
    [projectId, dispatch, setIsTaskView, navigate]
  )

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
      <Button
        margin={1}
        size="sm"
        leftIcon={<AiOutlinePlusCircle />}
        onClick={handleAddTask}
      >
        Add Task
      </Button>
      Section: TODO
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
            <TaskView
              onTaskChange={handleChangeTask}
              onClose={() => setIsTaskView(false)}
              {...activeTask}
            />
          )}
        </Flex>
      </Container>
    </>
  )
}

export default Project
