import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "user/reservation",
      providesTags: ["Cart"],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/user/reservation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart", "Tickets"],
    }),
    addCart: builder.mutation({
      query: (id) => ({
        url: `/user/reservation/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Cart", "Tickets"],
    }),
  }),
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    originPrice: 0,
    saleTax: 0,
    total: 0,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem(TOKEN_KEY);
    },
    addPrice: (state, action) => {
      console.log("addPrice", action.payload);
      state.originPrice += action.payload;
      state.saleTax = state.originPrice * 0.075;
      state.total = state.originPrice + state.saleTax;
    },
    deletePrice: (state, action) => {
      state.originPrice -= action.payload;
      state.saleTax = state.originPrice * 0.075;
      state.total = state.originPrice + state.saleTax;
    },
    resetPrice: (state) => {
      state.originPrice = 0;
      state.saleTax = 0;
      state.total = 0;
    },
  },
});
export const { useGetCartQuery, useAddCartMutation, useDeleteCartMutation } =
  cartApi;
export const { addPrice, deletePrice, resetPrice } = cartSlice.actions;
export default cartSlice.reducer;
