import React, { useCallback, useState } from 'react'
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Flex,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { projectByIdSelector } from 'store/slices/projectsSlice'
import {
  createTask,
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

import TasksActions from 'components/tasks/Tasks.actions'

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
  const currentProject = useSelector(projectByIdSelector(projectId))
  const [isTaskView, setIsTaskView] = useState<Boolean>(false)
  const projectName = currentProject?.name

  const handleCloseTask = useCallback(() => {
    setIsTaskView(false)
  }, [setIsTaskView])

  const handleDeleteTask = useCallback(() => {
    if (!activeId) return
    dispatch(drop(activeId))
    setIsTaskView(false)
  }, [activeId, dispatch, setIsTaskView])

  const handleOpenTask = useCallback(
    (taskId: string) => {
      setIsTaskView(true)
      dispatch(setActiveTask(taskId))
      navigate(`/project/${projectId}/${taskId}`)
    },
    [projectId, dispatch, setIsTaskView, navigate],
  )

  const handleAddTask = useCallback(async () => {
    if (projectId) {
      const taskId: unknown = await dispatch(createTask(projectId))
      if (typeof taskId === 'string') dispatch(setActiveTask(taskId))

      navigate(`/project/${projectId}/${taskId}`)
    }
  }, [projectId, dispatch, navigate])

  const handleChangeTask = useCallback(
    (key, val) => {
      if (activeId !== undefined) dispatch(update({ id: activeId, key, val }))
    },
    [activeId, dispatch],
  )

  // hydrate
  // useEffect(() => {
  //   if (projectId !== undefined) dispatch(fetchTasks(projectId))
  // }, [projectId, dispatch])

  const headerTitle = <b>{projectName}</b>

  return (
    <>
      <Header center={headerTitle} />
      <Container width="100%" maxWidth="100%">
        <Flex>
          <TableContainer width="100%">
            <TasksActions onCreate={handleAddTask} />
            {/* Section: TODO */}
            <Table>
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
                    isSelected={isTaskView && task.id === activeId}
                    onClick={handleOpenTask}
                    {...task}
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
