import { createSlice } from "@reduxjs/toolkit";
import AuthState from "./AuthState";

const initialState = AuthState;

const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      state.isLogin = true;
    },
    setLogout: (state) => {
      state.isLogin = false;
    },
  },
});

// export const {} = AuthReducer.actions;
// export default AuthReducer.reducer;
export default AuthReducer;
