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
export const { useGetCartQuery, useAddCartMutation, useDeleteCartMutation } =
  cartApi;
