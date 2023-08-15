import { createReducer } from "@reduxjs/toolkit";
import { data_products, searched_products } from "../actions/productAction";

const initialState = {
  products: [],
  searched_products: [],
};

const productsReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(data_products.fulfilled, (state, action) => {
      return { ...state, products: action.payload };
    })
    .addCase(searched_products.fulfilled, (state, action) => {
      return { ...state, searched_products: action.payload };
    })
);

export default productsReducer;
