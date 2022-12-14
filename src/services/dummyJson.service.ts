import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks/useReduxHooks";
import { callAPI } from "./api.service";
import { configs } from "../../src/utils/constants/configs.constants";
import { iProductList } from "../types/ProductList";
import { iProduct } from "../types/Product";
import { sessionGetData } from "../utils/helpers/session";

export const getProductList = createAsyncThunk<
  iProductList[],
  null,
  {
    rejectValue: string;
  }
>("getProductListReducer/getProductList", async (data, thunkApi) => {
  const API_URL = configs.API_BASE_URL;
  const url = `https://dummyjson.com/products`;
  const res = await callAPI<iProductList[]>(url, null, "GET", thunkApi);
  return res.products;
});

export const getProductDetails = createAsyncThunk<
  iProduct,
  number,
  {
    rejectValue: string;
  }
>("getProductReducer/getProduct", async (productId, thunkApi) => {
  const API_URL = configs.API_BASE_URL;
  const url = `https://dummyjson.com/products/${productId}`;
  const res = await callAPI<iProduct>(url, null, "GET", thunkApi);
  return res;
});

export const getAuth = createAsyncThunk<
  iProductList[],
  null,
  {
    rejectValue: string;
  }
>("getProductListReducer/getAuth", async (data, thunkApi) => {
  const API_URL = configs.API_BASE_URL;
  const url = `https://dummyjson.com/auth`;
  const res = await callAPI<iProductList[]>(url, null, "GET", thunkApi);
  return res;
});

export const getCategories = createAsyncThunk<
  [],
  null,
  {
    rejectValue: string;
  }
>("getProductListReducer/getCategories", async (data, thunkApi) => {
  const API_URL = configs.API_BASE_URL;
  const url = `https://dummyjson.com/products/categories`;
  const res = await callAPI<[]>(url, null, "GET", thunkApi);
  return res;
});

export const searchProductList = createAsyncThunk<
  iProductList[],
  null,
  {
    rejectValue: string;
  }
>("getProductListReducer/searchProductList", async (data, thunkApi) => {
  const API_URL = configs.API_BASE_URL;
  const url = `https://dummyjson.com/search?q=${data}`;
  const res = await callAPI<iProductList[]>(url, null, "GET", thunkApi);
  return res.products;
});
