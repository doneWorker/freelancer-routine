import { AnyAction } from 'redux'
import { ThunkAction } from './../../../node_modules/redux-thunk/src/types'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'
import { v4 as uuid } from 'uuid'

import { LoadingStatus } from '../../types/common'
import { PaymentType, Project } from '../../models/Project'

export interface ProjectsState {
  status: LoadingStatus
  list: Project[]
}

const initialState: ProjectsState = {
  status: LoadingStatus.Idle,
  list: [],
}

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.status = action.payload
    },
    load: (state, action: PayloadAction<Project[]>) => {
      state.list = action.payload
    },
    create: (state, action: PayloadAction<Project>) => {
      state.list.push(action.payload)
    },
    update: (state, action: PayloadAction<Partial<Project>>) => {
      state.list.forEach((pr) => ({ ...pr, ...action.payload }))
    },
  },
})

/*
 * Actions
 */
export const { load, create, update, setLoadingStatus } = projectSlice.actions

/*
 * Async Actions
 */
export const fetchProjects =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(setLoadingStatus(LoadingStatus.Loading))
    // dispatch(load(createMockProjects(5)))

    window.setTimeout(
      () => dispatch(setLoadingStatus(LoadingStatus.Succeeded)),
      2_000
    )
  }

const DEFAULT_PROJECT_NAME: string = 'Awesome Project'

export const createProject =
  (
    derivedProject: Partial<Project>
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    const d = Date()
    const defaultProject: Project = {
      id: uuid(),
      name: DEFAULT_PROJECT_NAME,
      isCompleted: false,
      dateCreated: d,
      dateUpdated: d,
      paymentType: PaymentType.NotSpecify,
    }

    const createdProject: Project = { ...defaultProject, ...derivedProject }
    dispatch(create(createdProject))
  }

/*
 * Selectors
 */
export const projectsSelector = (state: RootState): ProjectsState => state.projects

export const projectByIdSelector = (
  state: RootState,
  id: string | undefined
): Project | undefined => state.projects.list.find((p) => p.id === id)

export default projectSlice.reducer
