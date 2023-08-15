import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

export const data_products = createAsyncThunk(
  "data_products",
  async () => {
    try {
      const { data } = await api.get(
        "https://fastcommerce-back-production.up.railway.app/api/products"
      );
      return data.response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

export const searched_products = createAsyncThunk(
  "searched_products",
  async ({ search }) => {
    try {
      const { data } = await api.get(
        `https://fastcommerce-back-production.up.railway.app/api/products?name=${search}`
      );
      return data.response;
    } catch (error) {
      console.error("Products not search", error);
    }
  }
);
