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
    createTicket: builder.mutation({
      query: (ticket) => ({
        url: "/tickets",
        method: "POST",
        body: ticket,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Tickets"],
    })
  }),
});

export const { 
useGetTicketsQuery, 
useGetByIdQuery,
useCreateTicketMutation,
} = ticketsApi;
