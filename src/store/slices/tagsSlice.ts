import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

import { LoadingStatus } from 'types/common'
import { TaskTag } from 'models/Task'
import { AsyncAction, RootState } from '../index'
import { createMockTags } from './mocks'

export interface TagsState {
  status: LoadingStatus
  list: TaskTag[]
}

const initialState: TagsState = {
  status: LoadingStatus.Idle,
  list: [],
}

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.status = action.payload
    },
    load: (state, action: PayloadAction<TaskTag[]>) => {
      state.list = action.payload
    },
    create: (state, action: PayloadAction<TaskTag>) => {
      state.list.push(action.payload)
    },
    remove: (state, action: PayloadAction<string>) => {
      state.list.filter((t) => t.id !== action.payload)
    },
  },
})

/*
 * Actions
 */
export const {
  load, create, remove, setLoadingStatus,
} = tagsSlice.actions

/*
 * Async Actions
 */
export const fetchTags = (): AsyncAction => async (dispatch) => {
  dispatch(setLoadingStatus(LoadingStatus.Loading))
  dispatch(load(createMockTags(5)))

  window.setTimeout(() => dispatch(setLoadingStatus(LoadingStatus.Succeeded)), 2_000)
}

const DEFAULT_COLOR = '#ccc'
export const createProject = (derivedTag: Partial<TaskTag>): AsyncAction =>
  async (dispatch) => {
    const defaultTag: TaskTag = {
      id: uuid(),
      name: '',
      color: DEFAULT_COLOR,
    }

    const createdTag: TaskTag = { ...defaultTag, ...derivedTag }
    dispatch(create(createdTag))
  }

/*
 * Selectors
 */
export const tagsSelector = (state: RootState): TagsState => state.tags

export default tagsSlice.reducer
