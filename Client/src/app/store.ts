import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/Cart/CartSlice";
import loaderReducer from "./features/Loader/loaderSlice";
import getAuthReducer from "./features/Login/LoginSlice";
import getProductDetailsReducer from "./features/ProductDetails/ProductDetailsSlice";
import getProductListReducer from "./features/ProductList/ProductListSlice";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: getAuthReducer,
    prodList: getProductListReducer,
    prod: getProductDetailsReducer,
    cart: cartReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
