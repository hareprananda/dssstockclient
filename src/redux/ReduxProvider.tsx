import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import RegisterReducer from "./RegisterReducer";
import { KeyRegisterReducer, TReducerObject } from "./Type/Redux";

const reducer = (
  Object.keys(RegisterReducer) as (keyof typeof RegisterReducer)[]
).reduce((acc, v) => {
  acc[v] = RegisterReducer[v]["reducer"];

  return acc;
}, {} as Record<string, any>) as TReducerObject<"reducer">;

const store = configureStore({
  reducer,
});

const ReduxProvider: React.FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default ReduxProvider;
