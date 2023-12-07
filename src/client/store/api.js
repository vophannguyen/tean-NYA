import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Empty central API slice.
 * Endpoints should be injected in their own slices.
 * If available, an auth token is added to all request headers.
 */
const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      // Content-Type=multipart/form-data; boundary=------WebKitFormBoundaryg7okV37G7Gfll2hf--

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default api;
