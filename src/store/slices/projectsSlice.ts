import { AnyAction } from "redux";
import { ThunkAction } from "./../../../node_modules/redux-thunk/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingStatus } from "../../types/common";
import { RootState } from "../index";

import { PaymentType, Project } from "../../models/Project";

export interface ProjectState {
  status: LoadingStatus;
  list: Project[];
}

const initialState: ProjectState = {
  status: LoadingStatus.Idle,
  list: [],
};

const testProject: Project = {
  id: "aaa",
  img: "img",
  name: "first project",
  isCompleted: false,
  paymentType: PaymentType.Hourly,
  dateCreated: Date(),
  dateUpdated: Date(),
  dateCompleted: Date(),
  description: "",
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
    dispatch(load([testProject, testProject, testProject, testProject]));

    window?.setTimeout(
      () => dispatch(setLoadingStatus(LoadingStatus.Succeeded)),
      2_000
    );
  };

/*
 * Selectors
 */
export const projectsSelector = (state: RootState): ProjectState =>
  state.projects;

export default projectSlice.reducer;
