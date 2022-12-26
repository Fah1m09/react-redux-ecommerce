import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iProduct } from "../../../types/Product";
import { getProductDetails } from "../../../services/dummyJson.service";

type InitialState = {
  product: iProduct;
};

const initialState: InitialState = {
  product: null,
};

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
