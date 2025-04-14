import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
});

const nextBaseQuery = fetchBaseQuery({
  fetchFn: fetch,
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

export { baseQuery, nextBaseQuery, fetchBaseQuery };
