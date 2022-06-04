import { atom, useRecoilState, useSetRecoilState } from 'recoil'
import { debounce } from 'lodash'

import { Task } from 'models/Task'
import { Comment } from 'models/Comment'
import * as api from 'api/tasks'

/* Constants */
const DEFAULT_TASK_NAME = 'New Task'
const DEFAULT_UPDATE_DELAY = 1_000

export const tasksState = atom<{ status: string; list: Task[] }>({
  key: 'Tasks',
  default: {
    status: 'Idle',
    list: [],
  },
})

type ITaskActiveState = {
  id: string | null
  data: Partial<Task>
  comments?: Comment[]
}
export const taskActiveState = atom<ITaskActiveState>({
  key: 'ActiveTask',
  default: {
    id: null,
    data: {},
    comments: [],
  },
})

export const useTasksActions = () => {
  const setTasks = useSetRecoilState(tasksState)
  const [activeTask, setActiveTask] = useRecoilState(taskActiveState)

  const fetchTasksByProject = async (projectId: string) => {
    const resp = await api.fetchTasksByProjectId(projectId)

    setTasks(
      resp === null
        ? { status: 'Failed', list: [] }
        : { status: 'Success', list: resp.list },
    )
  }

  const fetchComments = async (taskId: string) => {
    const resp = await api.fetchTaskComments(taskId)

    resp !== null && setActiveTask((task) => ({ ...task, comments: resp.list }))
  }

  const createTask = async (projectId: string) => {
    const resp = await api.createTask(projectId, DEFAULT_TASK_NAME)

    resp !== null && setTasks((state) => ({ ...state, list: [...state.list, resp] }))
  }

  const saveUpdates = async (taskId: string, updates: Partial<Task>) => {
    const resp = await api.updateTask(taskId, updates)

    if (resp !== null) {
      console.log('saved!')
    }
  }

  const debouncedSaveUpdates = debounce(saveUpdates, DEFAULT_UPDATE_DELAY)

  const updateTask = (id: string, key: string, val: any) => {
    setActiveTask((state) => ({
      ...state,
      data: { ...state.data, [key]: val },
    }))

    debouncedSaveUpdates(id, { [key]: val })
  }

  const activateTask = async (id: string) => {
    const resp = await api.getTaskById(id)

    if (resp !== null) {
      setTasks((state) => ({
        ...state,
        list: state.list.map((task) =>
          (task.id === activeTask.id
            ? { ...task, name: activeTask.data.name as string }
            : task)),
      }))

      setActiveTask(() => ({ data: resp.task, id }))
    }
  }

  const submitComment = async (id: string, comment: string) => {
    const resp = await api.submitComment(id, comment)

    if (resp !== null && resp.comment !== null) {
      setActiveTask((task) => ({ ...task, comments: [...(task.comments || []), resp.comment] }))
    }
  }

  return {
    fetchTasksByProject,
    fetchComments,
    activateTask,
    createTask,
    updateTask,
    submitComment,
  }
}
