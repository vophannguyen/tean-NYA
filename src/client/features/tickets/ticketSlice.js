import api from "../../store/api";

const ticketsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => "/tickets",
      transformResponse: (response) => response.data,
      providesTags: ["Tickets"],
    }),
    getById: builder.query({
      query: (id) => `/tickets/${id}`,
      transformResponse: (response) => response.data,
      providesTags: ["Tickets"],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetByIdQuery,
} = ticketsApi;
