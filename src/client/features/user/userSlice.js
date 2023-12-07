import api from "../../store/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserAccount: builder.query({
      query: () => "/user/profile",
      providesTags: ["Me"],
      invalidatesTags: ["Login"],
    }),
    fetchAllUserItems: builder.query({
      query: () => "user/sellitem",
      providesTags: ["Res"],
      invalidatesTags: ["Me", "Order", "Sold", "Tickets"],
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
    // deleteItem: builder.mutation({
    //   query: (itemId) => ({
    //     url: `user/sellitem/${itemId}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Res'],
    // }),
  }),
});

export const {
  useFetchUserAccountQuery,
  useFetchUserReservationHistoryQuery,
  useFetchAllUserItemsQuery,
  useFetchUpcomingReservationsQuery,
  useAddSoldItemMutation,
  useGetSoldItemQuery,
  useDeleteItemMutation,
} = authApi;
