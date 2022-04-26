import { AnyAction } from 'redux'
import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit'

import * as api from 'api/projects'
import { RootState } from '../index'
import { LoadingStatus } from '../../types/common'
import { Project } from '../../models/Project'

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
export const {
  load, create, update, setLoadingStatus,
} = projectSlice.actions

/*
 * Async Actions
 */
export const fetchProjects = (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(setLoadingStatus(LoadingStatus.Loading))
    const resp = await api.fetchProjects()

    if (resp?.list) {
      dispatch(load(resp.list))
    }

    dispatch(setLoadingStatus(LoadingStatus.Succeeded))
  }

export const createProject = (
  derivedProject: Partial<Project>,
): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    const createdProject = await api.createProject(derivedProject)

    if (createdProject !== null) {
      dispatch(create(createdProject as Project))
    }
  }

/*
 * Selectors
 */
export const projectsSelector = (state: RootState): ProjectsState => state.projects

// little of `curry` here
export const projectByIdSelector = (id: string | undefined) =>
  (state: RootState): Project | undefined =>
    state.projects.list.find((p) => p.id === id)

export default projectSlice.reducer
