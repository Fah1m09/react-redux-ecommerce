import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iProduct } from "../../../types/Product";
import { useParams } from "react-router-dom";
import { sessionStore } from "../../../utils/helpers/session";
import { getProductDetails } from "../../../services/dummyJson.service";

type InitialState = {
  product: iProduct;
};

const initialState: InitialState = {
  product: null,
};

// export const getProductDetails = createAsyncThunk("product/fetchUsers", () => {
//   return axios
//     .get("https://dummyjson.com/products/1")
//     .then((response) => response.data);
// });

const GetProductDetailsSlice = createSlice({
  name: "getProductDetailsReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state) => {});
    builder.addCase(getProductDetails.fulfilled, (state, { payload }) => {
      state.product = payload;
    });
    builder.addCase(getProductDetails.rejected, (state, { payload }) => {});
  },
});

export default GetProductDetailsSlice.reducer;
export const {} = GetProductDetailsSlice.actions;
