import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./features/Loader/loaderSlice";
import authReducer from "./features/Auth/authSlice";
import getProductListReducer from "./features/ProductList/ProductListSlice";
import getProductDetailsReducer from "./features/ProductDetails/ProductDetailsSlice";
import cartReducer from "./components/Cart/CartSlice";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    prodList: getProductListReducer,
    prod: getProductDetailsReducer,
    cart: cartReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
