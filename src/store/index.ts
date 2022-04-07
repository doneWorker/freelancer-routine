import { Middleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import projectsReducer from './slices/projectsSlice'
import tasksReducer from './slices/tasksSlice'
import tagsReducer from './slices/tagsSlice'
import { LS_APP_KEY } from './constants'

/*
 * Middleware
 */
const persistMiddleware: Middleware<{}, any> = (store) => (next) => (action) => {
  localStorage.setItem(LS_APP_KEY, JSON.stringify(store.getState()))
  next(action)
}

const getPreloadedState = (): any => {
  const appState = localStorage.getItem(LS_APP_KEY)
  return appState ? JSON.parse(appState) : null
}

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    tags: tagsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware),

  preloadedState: getPreloadedState(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
