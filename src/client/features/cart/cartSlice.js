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
    receipt: {
      cart: [],
      originPrice: 0,
      total: 0,
      saleTax: 0,
    },
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem(TOKEN_KEY);
    },
    addCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    addTicket: (state, action) => {
      console.log(action.payload);
      state.cart.push(action.payload);
      state.originPrice += action.payload.data.price;
      state.saleTax = state.originPrice * 0.075;
      state.total = state.originPrice + state.saleTax;
    },
    resetCart: (state) => {
      state.receipt.cart[0] = [...state.cart];
      state.receipt.originPrice = state.originPrice;
      state.receipt.total = state.total;
      state.receipt.saleTax = state.saleTax;
      state.originPrice = 0;
      state.saleTax = 0;
      state.total = 0;
      state.cart = [];
    },
    deleteItem(state, action) {
      // need id
      const item = state.cart.find((item) => item.data.id === action.payload);
      state.cart = state.cart.filter((item) => item.data.id !== action.payload);
      // console.log("item", item.data.price);
      // console.log(state.cart);
      state.cart.length <= 0
        ? (state.originPrice = 0)
        : (state.originPrice -= item.data.price);
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
export const { addTicket, deleteItem, resetCart, addCurrentTime } =
  cartSlice.actions;
export default cartSlice.reducer;
