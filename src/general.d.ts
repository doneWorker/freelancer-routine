export type ReduxActionPayload = {
  [key]: any;
};

export type ReduxAction = {
  name: string;
  payload?: ReduxActionPayload;
};
