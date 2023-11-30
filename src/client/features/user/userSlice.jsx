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
    fetchUpcomingReservations: builder.query({
      query: () => "user/upcoming",
    })
  }),
});

export const {
    useFetchUserAccountQuery,
    useFetchUserReservationHistoryQuery,
    useFetchAllUserItemsQuery,
    useFetchUpcomingReservationsQuery,
  } = authApi;
