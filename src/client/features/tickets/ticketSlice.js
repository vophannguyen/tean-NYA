import api from "../../store/api";

const ticketsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => "/",
      transformResponse: (response) => response.students,
      providesTags: ["Tickets"],
    }),
    getById: builder.query({
      query: (id) => `/${id}`,
      transformResponse: (response) => response.ticket,
      providesTags: ["Tickets"],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetByIdQuery,
} = ticketsApi;
