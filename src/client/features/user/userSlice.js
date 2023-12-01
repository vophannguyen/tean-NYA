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
      invalidatesTags: ["Me", "Order", "Sold"],
    }),
    fetchUserReservationHistory: builder.query({
      query: () => "user/order",
      providesTags: ["Order"],
      invalidatesTags: ["Me", "Res"],
    }),
    getSoldItem: builder.query({
      query: () => "/user/solditem",
      transformResponse: (response) => response.data,
      providesTags: ["Sold"],
    }),
    addSoldItem: builder.mutation({
      query: (data) => ({
        url: "user/solditem",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sold"],
    }),
  }),
});

export const {
  useFetchUserAccountQuery,
  useFetchUserReservationHistoryQuery,
  useFetchAllUserItemsQuery,
  useFetchUpcomingReservationsQuery,
  useAddSoldItemMutation,
  useGetSoldItemQuery,
} = authApi;
