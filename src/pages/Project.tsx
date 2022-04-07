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

import {
  createTask,
  fetchTasks,
  setActiveTask,
  update,
  drop,
  tasksSelector,
  tasksActiveIdSelector,
  taskActiveSelector,
} from 'store/slices/tasksSlice'
import Header from 'components/Header'
import TaskRow from 'components/tasks/Task.row'
import TaskView from 'components/tasks/Task.view'

import { AiOutlinePlusCircle } from 'react-icons/ai'

/*
 * Project's page
 */
const Project: React.FC = () => {
  const tasks = useSelector(tasksSelector)
  const activeId = useSelector(tasksActiveIdSelector)
  const activeTask = useSelector(taskActiveSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { projectId } = useParams()
  const [isTaskView, setIsTaskView] = useState<Boolean>(false)

  const handleCloseTask = useCallback(() => {
    setIsTaskView(false)
  }, [setIsTaskView])

  const handleDeleteTask = useCallback(() => {
    if (!activeId) return
    dispatch(drop(activeId))
    setIsTaskView(false)
  }, [dispatch, activeId, setIsTaskView])

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
      activeId !== undefined && dispatch(update({ id: activeId, key, val }))
    },
    [dispatch, activeId]
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
                    isSelected={isTaskView && task.id === activeId}
                    onClick={handleOpenTask}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {isTaskView && (
            <TaskView
              onTaskChange={handleChangeTask}
              onClose={handleCloseTask}
              onDelete={handleDeleteTask}
              {...activeTask}
            />
          )}
        </Flex>
      </Container>
    </>
  )
}

export default Project
