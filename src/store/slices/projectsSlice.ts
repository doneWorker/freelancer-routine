import { AnyAction } from "redux";
import { ThunkAction } from "./../../../node_modules/redux-thunk/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingStatus } from "../../types/common";
import { RootState } from "../index";
import { v4 as uuid } from "uuid";

import { PaymentType, Project } from "../../models/Project";

export interface ProjectState {
  status: LoadingStatus;
  list: Project[];
}

const initialState: ProjectState = {
  status: LoadingStatus.Idle,
  list: [],
};

const createMockProjects = (total: number = 1): Project[] => {
  const out: Project[] = [];

  for (let i = 0; i < total; i++) {
    out.push({
      id: Math.random().toString(),
      img: "img",
      name: "first project",
      isCompleted: false,
      tasksCompleted: Math.floor(Math.random() * 25) + 1,
      tasksTotal: 25,
      paymentType: PaymentType.Hourly,
      dateCreated: Date(),
      dateUpdated: Date(),
      dateCompleted: Date(),
      description: "",
    });
  }

  return out;
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.status = action.payload;
    },
    load: (state, action: PayloadAction<Project[]>) => {
      state.list = action.payload;
    },
    create: (state, action: PayloadAction<Project>) => {
      state.list.push(action.payload);
    },
    update: (state, action: PayloadAction<Partial<Project>>) => {
      state.list.forEach((pr) => ({ ...pr, ...action.payload }));
    },
  },
});

/*
 * Actions
 */
export const { load, create, update, setLoadingStatus } = projectSlice.actions;

/*
 * Async Actions
 */
export const fetchProjects =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(setLoadingStatus(LoadingStatus.Loading));
    dispatch(load(createMockProjects(5)));

    window.setTimeout(
      () => dispatch(setLoadingStatus(LoadingStatus.Succeeded)),
      2_000
    );
  };

export const createProject =
  (
    project: Omit<Project, "id">
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    const createdProject: Project = { ...project, id: uuid() };
    dispatch(create(createdProject));
  };

/*
 * Selectors
 */
export const projectsSelector = (state: RootState): ProjectState =>
  state.projects;

export default projectSlice.reducer;
