import { createAsyncThunk } from "@reduxjs/toolkit";
import { configs } from "../../src/utils/constants/configs.constants";
import { iAuthRequest } from "../types/AuthRequest";
import { iAuthResponse } from "../types/AuthResponse";
import { iProduct } from "../types/Product";
import { iProductList } from "../types/ProductList";
import { callAPI } from "./api.service";

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
  iAuthResponse,
  iAuthRequest,
  {
    rejectValue: string;
  }
>("getProductListReducer/getAuth", async (data, thunkApi) => {
  const API_URL = configs.API_BASE_URL;
  const url = `https://dummyjson.com/auth/login`;
  const res = await callAPI<iAuthResponse>(url, data, "POST", thunkApi);
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
