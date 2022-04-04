import { AnyAction } from 'redux'
import { ThunkAction } from './../../../node_modules/redux-thunk/src/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatus } from '../../types/common'
import { RootState } from '../index'
import { v4 as uuid } from 'uuid'

import { Task } from '../../models/Task'
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
  },
})

export const { load, create, update, setLoadingStatus, setActiveTask } =
  tasksSlice.actions

/*
 * Actions
 */

/*
 * Async Actions
 */
export const fetchTasks =
  (projectId: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
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

export const tasksSelectorById = (state: RootState, id: string): Task | undefined =>
  state.tasks.list.find((t) => t.id === id)

export const tasksActiveSelector = (state: RootState): string | undefined =>
  state.tasks.active

export default tasksSlice.reducer
