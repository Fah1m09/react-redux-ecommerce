import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iProductList } from "../../../types/ProductList";
import { sessionGetData, sessionStore } from "../../../utils/helpers/session";

import {
  getCategories,
  getProductList,
  searchProductList,
} from "../../../services/dummyJson.service";

type InitialState = {
  productList: iProductList[];
  categories: [];
};

const initialState: InitialState = {
  productList: [],
  categories: [],
};

const GetProductListSlice = createSlice({
  name: "getProductListReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductList.pending, (state) => {});
    builder.addCase(getProductList.fulfilled, (state, { payload }) => {
      state.productList = payload;
      sessionStore("ProductList", state.productList);
    });
    builder.addCase(getProductList.rejected, (state, { payload }) => {});
    builder.addCase(searchProductList.pending, (state) => {});
    builder.addCase(searchProductList.fulfilled, (state, { payload }) => {
      state.productList = payload;
    });
    builder.addCase(searchProductList.rejected, (state, { payload }) => {});
    builder.addCase(getCategories.pending, (state) => {});
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
      sessionStore("Categories", state.categories);
    });
    builder.addCase(getCategories.rejected, (state, { payload }) => {});
  },
});

export default GetProductListSlice.reducer;
export const {} = GetProductListSlice.actions;
