import { TimeSpan } from 'models/Task'
import { AnyAction } from 'redux'
import { ThunkAction } from './../../../node_modules/redux-thunk/src/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatus } from 'types/common'
import { RootState } from '../index'
import { v4 as uuid } from 'uuid'

import { Task, TaskStatus } from '../../models/Task'
// import { createMockTasks } from './mocks'

export interface TasksState {
  status: LoadingStatus
  list: Task[]
  active: string | undefined
}

const initialState: TasksState = {
  status: LoadingStatus.Idle,
  list: [],
  active: undefined,
}

type UpdateTask = {
  key: string
  val: string
  id: string
}

type StatusPayloadAction = {
  id: string
  status: TaskStatus
}

type CreateTimeSpan = {
  taskId: string
  timeStart: string
  timeEnd?: string
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.status = action.payload
    },
    setActiveTask: (state, action: PayloadAction<string>) => {
      state.active = action.payload
    },
    setStatus: (state, action: PayloadAction<StatusPayloadAction>) => {
      const t = state.list.find((t) => t.id === action.payload.id)
      if (t && t !== undefined) t.status = action.payload.status
    },
    load: (state, action: PayloadAction<Task[]>) => {
      state.list = action.payload
    },
    create: (state, action: PayloadAction<Task>) => {
      state.list.push(action.payload)
    },
    update: (state, action: PayloadAction<UpdateTask>) => {
      const t = state.list.find((t) => t.id === action.payload.id)
      const { key, val } = action.payload
      if (t && t !== undefined) (t as any)[key] = val
    },
    drop: (state, action: PayloadAction<string>) => {
      const idx = state.list.findIndex((t) => t.id === action.payload)
      state.list.splice(idx, 1)
    },
    createTimeSpan: (state, action: PayloadAction<CreateTimeSpan>) => {
      const t = state.list.find((t) => t.id === action.payload.taskId)
      if (t && t.timeSpans !== undefined && Array.isArray(t.timeSpans)) {
        const ts: TimeSpan = [action.payload.timeStart]
        action.payload.timeEnd && (ts[1] = action.payload.timeEnd)
        t.timeSpans.push(ts)
      }
    },
    completeTimeSpan: (id) => {},
  },
})

export const { load, create, update, drop, setLoadingStatus, setActiveTask } =
  tasksSlice.actions

/*
 * Actions
 */

/*
 * Async Actions
 */
export const fetchTasks =
  (projectId: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    dispatch(setLoadingStatus(LoadingStatus.Loading))
    // dispatch(load(createMockTasks(5, projectId)))

    window.setTimeout(
      () => dispatch(setLoadingStatus(LoadingStatus.Succeeded)),
      2_000
    )
  }

export const createTask =
  (projectId: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch): Promise<string> => {
    const d = Date()
    const id = uuid()
    const task: Task = {
      id,
      name: '',
      description: '',
      projectId: projectId,
      isCompleted: false,
      dateCreated: d,
      dateUpdated: d,
    }

    dispatch(create(task))
    return id
  }

/*
 * Selectors
 */
export const tasksSelector = (state: RootState): TasksState => state.tasks

export const taskActiveSelector = (state: RootState): Task | undefined =>
  state.tasks.list.find((t) => t.id === state.tasks.active)

export const tasksActiveIdSelector = (state: RootState): string | undefined =>
  state.tasks.active

export default tasksSlice.reducer
