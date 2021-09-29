import RegisterReducer from "../RegisterReducer";

export type KeyRegisterReducer = keyof typeof RegisterReducer;

export type TReducerObject<T extends "actions" | "reducer"> = {
  [K in KeyRegisterReducer]: typeof RegisterReducer[K][T];
};
