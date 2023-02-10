import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iCart } from "../../../types/Cart";

type InitialState = {
  cart: iCart[];
};

const initialState: InitialState = {
  cart: [],
};

const CartSlice = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<iCart>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<iCart[]>) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default CartSlice.reducer;
export const { addToCart, removeFromCart } = CartSlice.actions;
