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
      // transformResponse: (response) => response.data,
      providesTags: ["Tickets"],
    }),
    createTicket: builder.mutation({
      query: (ticket) => ({
        url: "/tickets/create",
        method: "POST",
        body: ticket,
      }),
      invalidatesTags: ["Tickets", "Res"],
    }),
    getMovies: builder.query({
      query: () => "/tickets/movies",
      transformResponse: (response) => response.data,
      providesTags: ["Tickets"],
    }),
    getConcerts: builder.query({
      query: () => "/tickets/concert",
      transformResponse: (response) => response.data,
      providesTags: ["Tickets"],
    }),
    getRes: builder.query({
      query: () => "/tickets/reservation",
      transformResponse: (response) => response.data,
      providesTags: ["Tickets"],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetByIdQuery,
  useCreateTicketMutation,
  useGetMoviesQuery,
  useGetConcertsQuery,
  useGetResQuery,
} = ticketsApi;
