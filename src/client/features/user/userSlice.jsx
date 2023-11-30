import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserAccount: builder.query({
      query: () => "/user/profile",
      providesTags: ["Me"],
    }),
    fetchAllUserItems: builder.query({
      query: () => "user/sellitem",
    }),
    fetchUserReservationHistory: builder.query({
      query: () => "user/order",
    }),
  }),
});

export const {
    useFetchUserAccountQuery,
    useFetchUserReservationHistoryQuery,
    useFetchAllUserItemsQuery,
  } = authApi;
