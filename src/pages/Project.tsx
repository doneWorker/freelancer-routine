/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
// eslint-disable-next-line object-curly-newline
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
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

import { projectByIdSelector } from 'store/slices/projectsSlice'
import { drop } from 'store/slices/tasksSlice'
import {
  taskActiveState,
  tasksState,
  useTasksActions,
} from 'store/recoil/tasks.atom'
import Header from 'components/Header'
import TaskRow from 'components/tasks/Task.row'
import TaskView from 'components/tasks/TaskView'
import TasksActions from 'components/tasks/Tasks.actions'
import useTitle from 'hooks/useTitle'

/*
 * Project's page
 */

const TASK_COLUMNS: string[] = ['Name', 'Due Date', 'Priority', 'Time Spent']

const Project: React.FC = () => {
  // const tasks = useSelector(tasksSelector)
  const tasks = useRecoilValue(tasksState)
  const activeTask = useRecoilValue(taskActiveState).data
  const activeId = useRecoilValue(taskActiveState).id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { projectId } = useParams()
  const currentProject = useSelector(projectByIdSelector(projectId))
  const [isTaskView, setIsTaskView] = useState<Boolean>(false)
  const projectName = currentProject?.name
  const setTitle = useTitle()
  const {
    fetchTasksByProject,
    createTask,
    updateTask,
    activateTask,
    submitComment,
  } = useTasksActions()

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
      activateTask(taskId)
      navigate(`/project/${projectId}/${taskId}`)
    },
    [projectId],
  )

  const handleAddTask = useCallback(async () => {
    if (projectId) {
      createTask(projectId)
    }
  }, [projectId])

  const handleChangeTask = useCallback(
    (key, val) => {
      if (activeId !== null) updateTask(activeId, key, val)
    },
    [activeId, dispatch],
  )

  const handleSubmitComment = useCallback(
    (content) => {
      if (!activeId) return
      submitComment(activeId, content)
    },
    [activeId],
  )

  setTitle('Tasker.io | Project')

  // hydrate
  useEffect(() => {
    if (projectId !== undefined) {
      fetchTasksByProject(projectId)
    }
  }, [projectId, dispatch])

  const headerTitle = useMemo(() => <b>{projectName}</b>, [projectName])

  const THead = useMemo(
    () => (
      <Tr>
        {TASK_COLUMNS.map((t) => (
          <Th key={t} textTransform="initial">
            {t}
          </Th>
        ))}
      </Tr>
    ),
    [],
  )

  return (
    <>
      <Header center={headerTitle} />
      <Container width="100%" maxWidth="1920px" h="calc(100vh - 50px)" p={0}>
        <Flex height="100%">
          <TableContainer width="100%">
            <TasksActions onCreate={handleAddTask} />
            {/* Section: TODO */}
            <Table size="sm">
              <Thead>{THead}</Thead>
              <Tbody>
                {tasks.list.map((task) => (
                  <TaskRow
                    key={task.id}
                    id={task.id}
                    isSelected={isTaskView && task.id === activeId}
                    name={
                      activeId === task.id ? (activeTask.name as string) : task.name
                    }
                    priority={task.priority}
                    timeSpent={10_355}
                    dueDate={task.dateUpdated}
                    onClick={handleOpenTask}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {isTaskView && (
            <TaskView
              description={activeTask.description}
              name={activeTask.name}
              extLink={activeTask.extLink}
              dueDate="2022-03-10"
              onTaskChange={handleChangeTask}
              onClose={handleCloseTask}
              onDelete={handleDeleteTask}
              onCommentSubmit={handleSubmitComment}
              {...activeTask}
            />
          )}
        </Flex>
      </Container>
    </>
  )
}

export default Project
