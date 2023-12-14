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
      // transformResponse: (response) => response.data,
      providesTags: ["Tickets"],
    }),
    getConcerts: builder.query({
      query: () => "/tickets/concert",
      // transformResponse: (response) => response.data,
      providesTags: ["Tickets"],
    }),
    getRes: builder.query({
      query: () => "/tickets/reservation",
      // transformResponse: (response) => response.data,
      providesTags: ["Tickets"],
    }),
    getCity: builder.query({
      query: () => "/tickets/city",
      providesTags: ["Tickets"],
    }),
    getFilter: builder.query({
      query: (data) => ({
        url: "/tickets/filter",
        body: data,
      }),
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
  useGetCityQuery,
  useGetFilterQuery,
} = ticketsApi;
