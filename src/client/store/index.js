import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
// import cartReducer from "../features/cart/cartSlice";
import api from "./api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    // cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
