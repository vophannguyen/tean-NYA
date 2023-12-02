import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";

/** RTK end point
 *  fectch all data of user
 */
const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /// get all item in cart
    getCart: builder.query({
      query: () => "user/reservation",
      providesTags: ["Cart"],
    }),
    // delete item in cart
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/user/reservation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart", "Tickets"],
    }),
    // add item to cart
    addCart: builder.mutation({
      query: (id) => ({
        url: `/user/reservation/${id}`,
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
      invalidatesTags: ["Cart", "Tickets"],
    }),
    // add payment method
    addPayment: builder.mutation({
      query: (data) => ({
        url: "user/payment",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// store cart information
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
  //Reducers
  reducers: {
    // get current time when user add to cart, it need to handle countdown
    addCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    // User add ticket : add to cart , cal
    addTicket: (state, action) => {
      state.cart.push(action.payload);
      state.originPrice += action.payload.data.price;
      state.saleTax = state.originPrice * 0.075;
      state.total = state.originPrice + state.saleTax;
    },
    // add all information to receipt before reset to default
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
    // delete item in Cart, and cal again
    deleteItem(state, action) {
      const item = state.cart.find((item) => item.data.id === action.payload);
      state.cart = state.cart.filter((item) => item.data.id !== action.payload);
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
  useAddPaymentMutation,
} = cartApi;
export const { addTicket, deleteItem, resetCart, addCurrentTime } =
  cartSlice.actions;
export default cartSlice.reducer;
