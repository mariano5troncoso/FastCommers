import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productReducer.js";
import authReducer from "./reducers/auth.js";


const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
})

export default store;
