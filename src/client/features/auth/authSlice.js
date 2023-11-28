import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserAccount: builder.query({
      query: () => "/user/profile",
      providesTags: ["Me"],
    }),
    endpoints: (builder) => ({
      fetchAllUserItems: builder.query({
      query: () => "user/allitems"
    }),
    endpoints: (builder) => ({
      fetchUserReservationHistory: builder.query({
        query: () => "user/paymenthistory",
      })
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["Me"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["Me"],
    }),
  }),
})
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useFetchUserAccountQuery,
  useFetchUserReservationHistoryQuery,
} = authApi;

const TOKEN_KEY = "token";

const storeToken = (state, { payload }) => {
  state.token = payload.token;
  sessionStorage.setItem(TOKEN_KEY, payload.token);
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem(TOKEN_KEY),
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem(TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
  },
});

export const { logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
