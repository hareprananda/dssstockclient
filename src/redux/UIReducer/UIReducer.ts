import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UIState from "./UIState";

const UIReducer = createSlice({
  name: "ui",
  initialState: UIState,
  reducers: {
    changeActiveBottomNavbar: (
      state,
      action: PayloadAction<"home" | "list" | "upload">
    ) => {
      state.activeBottomNavbar = action.payload;
    },
  },
});
export default UIReducer;