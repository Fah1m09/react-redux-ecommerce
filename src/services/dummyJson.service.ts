import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { useAppSelector } from "../hooks/useReduxHooks";
import { callAPI } from "./api.service";
import { configs } from "../../src/utils/constants/configs.constants";
import { iProduct } from "../types/ProductList";
import { sessionGetData } from "../utils/helpers/session";

// export const getProductList = createAsyncThunk<
//   iProduct,
//   null,
//   {
//     rejectValue: string;
//   }
// >("getEmail/GetMaskedEmailAddress", async (data, thunkApi) => {
//   const API_URL = configs.API_BASE_URL;
//   const url = `https://dummyjson.com/products`;
//   fetch("https://dummyjson.com/products/1")
//     .then((res) => res.json())
//     .then((json) => console.log(json));
// });
