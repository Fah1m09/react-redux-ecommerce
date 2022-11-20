import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iProduct } from "../../../types/ProductList";
import { sessionStore } from "../../../utils/helpers/session";

type InitialState = {
  product: iProduct[];
};

const initialState: InitialState = {
  product: [],
};

export const getProduct = createAsyncThunk("user/fetchUsers", () => {
  return axios
    .get("https://dummyjson.com/products")
    .then((response) => response.data.products);
});

const GetProductListSlice = createSlice({
  name: "getProductListReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {});
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.product = payload;
    });
    builder.addCase(getProduct.rejected, (state, { payload }) => {});
  },
});

export default GetProductListSlice.reducer;
export const {} = GetProductListSlice.actions;
