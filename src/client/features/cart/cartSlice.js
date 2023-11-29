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
    addOrder: builder.mutation({
      query: (data) => ({
        url: "/user/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart", "Tickets"],
    }),
    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `tickets/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart", "Tickets"],
    }),
  }),
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    originPrice: 0,
    saleTax: 0,
    total: 0,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem(TOKEN_KEY);
    },
    addTicket: (state, action) => {
      console.log(action.payload);
      state.cart.push(action.payload);
      state.cart.map((item) => {
        state.originPrice += item.data.price;
      });
      state.saleTax = state.originPrice * 0.075;
      state.total = state.originPrice + state.saleTax;
    },
    resetCart: (state) => {
      state.originPrice = 0;
      state.saleTax = 0;
      state.total = 0;
      state.cart = [];
    },
    deleteItem(state, action) {
      // need id
      const item = state.cart.find((item) => item.data.id === action.payload);
      state.cart = state.cart.filter((item) => item.data.id !== action.payload);
      console.log(item);
      console.log(state.cart);
      state.originPrice -= item.data.price;
      state.saleTax = state.originPrice * 0.075;
      state.total = state.originPrice + state.saleTax;
    },
  },
});
export const {
  useGetCartQuery,
  useAddCartMutation,
  useDeleteCartMutation,
  useAddOrderMutation,
  useDeleteTicketMutation,
} = cartApi;
export const { addTicket, deleteItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
