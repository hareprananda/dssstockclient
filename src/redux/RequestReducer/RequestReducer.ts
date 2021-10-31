import { createSlice } from "@reduxjs/toolkit";
import RequestState from "./RequestState";

const RequestReducer = createSlice({
  name: "request",
  initialState: RequestState,
  reducers: {
    reRequestCountDss: (state) => {
      state.requestCountDss = state.requestCountDss + 1;
    },
  },
});

export default RequestReducer;
