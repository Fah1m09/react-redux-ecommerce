import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iProductList } from "../../../types/ProductList";
import { sessionStore } from "../../../utils/helpers/session";
import { getProductList } from "../../../services/dummyJson.service";

type InitialState = {
  productList: iProductList[];
};

const initialState: InitialState = {
  productList: [],
};

const GetProductListSlice = createSlice({
  name: "getProductListReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductList.pending, (state) => {});
    builder.addCase(getProductList.fulfilled, (state, { payload }) => {
      state.productList = payload;
    });
    builder.addCase(getProductList.rejected, (state, { payload }) => {});
  },
});

export default GetProductListSlice.reducer;
export const {} = GetProductListSlice.actions;
