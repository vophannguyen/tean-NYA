import api from "../../store/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserAccount: builder.query({
      query: () => "/user/profile",
      providesTags: ["Me"],
    }),
    fetchAllUserItems: builder.query({
      query: () => "user/sellitem",
      providesTags: ["Res"],
      invalidatesTags: ["Me", "Order"],
    }),
    fetchUserReservationHistory: builder.query({
      query: () => "user/order",
      providesTags: ["Order"],
      invalidatesTags: ["Me", "Res"],
    }),
  }),
});

export const {
  useFetchUserAccountQuery,
  useFetchUserReservationHistoryQuery,
  useFetchAllUserItemsQuery,
  useFetchUpcomingReservationsQuery,
} = authApi;
