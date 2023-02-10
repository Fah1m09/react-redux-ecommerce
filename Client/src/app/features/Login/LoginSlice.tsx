import { createSlice } from "@reduxjs/toolkit";
import { getAuth } from "../../../services/dummyJson.service";
import { iAuthResponse } from "../../../types/AuthResponse";

type InitialState = {
  loginDetais: iAuthResponse;
};

const initialState: InitialState = {
  loginDetais: null,
};
// user kminchelle, pass 0lelplR

const GetAuthSlice = createSlice({
  name: "getAuthReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuth.pending, (state) => {});
    builder.addCase(getAuth.fulfilled, (state, { payload }) => {
      state.loginDetais = payload;
    });
    builder.addCase(getAuth.rejected, (state, { payload }) => {});
  },
});

export default GetAuthSlice.reducer;
export const {} = GetAuthSlice.actions;
