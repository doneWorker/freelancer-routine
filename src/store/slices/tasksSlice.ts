import { AnyAction } from 'redux'
import { ThunkAction } from './../../../node_modules/redux-thunk/src/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatus } from '../../types/common'
import { RootState } from '../index'

import { Task } from '../../models/Task'
import { createMockTasks } from './mocks'

export interface TasksState {
  status: LoadingStatus
  list: Task[]
}

const initialState: TasksState = {
  status: LoadingStatus.Idle,
  list: [],
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.status = action.payload
    },
    load: (state, action: PayloadAction<Task[]>) => {
      state.list = action.payload
    },
    create: (state, action: PayloadAction<Task>) => {
      state.list.push(action.payload)
    },
    update: (state, action: PayloadAction<Partial<Task>>) => {
      state.list.forEach((pr) => ({ ...pr, ...action.payload }))
    },
  },
})

export const { load, create, update, setLoadingStatus } = tasksSlice.actions

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
    dispatch(load(createMockTasks(5, projectId)))

    window.setTimeout(
      () => dispatch(setLoadingStatus(LoadingStatus.Succeeded)),
      2_000
    )
  }

/*
 * Selectors
 */
export const tasksSelector = (state: RootState): TasksState => state.tasks

export default tasksSlice.reducer
