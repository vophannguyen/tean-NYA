import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";

/** RTK end point
 *  fectch all data of user
 */
const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /// get all item in cart
    getCart: builder.query({
      query: () => "user/cart",
      providesTags: ["Cart"],
    }),
    // delete item in cart
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/user/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart", "Tickets"],
    }),
    // add item to cart
    addCart: builder.mutation({
      query: (id) => ({
        url: `/user/cart/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Cart", "Tickets"],
    }),
    // add item to order history table
    addOrder: builder.mutation({
      query: (data) => ({
        url: "/user/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order", "Cart", "Tickets"],
    }),
    // delete single item in items table
    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `tickets/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart", "Tickets", "Res"],
    }),
    // add payment method
    addPayment: builder.mutation({
      query: (data) => ({
        url: "user/payment",
        method: "POST",
        body: data,
      }),
    }),
    getReciept: builder.query({
      query: (id) => `/user/order/reciept/${id}`,
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartMutation,
  useDeleteCartMutation,
  useAddOrderMutation,
  useDeleteTicketMutation,
  useAddPaymentMutation,
  useGetRecieptQuery,
} = cartApi;
// export const { addTicket, deleteItem, resetCart, addCurrentTime } =
//   cartSlice.actions;
// export default cartSlice.reducer;
