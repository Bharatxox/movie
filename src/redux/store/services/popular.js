import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const popularMoviesApi = createApi({
  reducerPath: "popularMovies",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.themoviedb.org/3/",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZGJiZjQ0NDFhZjUwMWU5YmM4YjhiMTVhMzI2MjlkOSIsInN1YiI6IjY2NWYyZmYzYmExZjVmMTk5MzUwYTFlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._NTz0S1wOxijDMPzn44Ldf2n1P00it-aHqB02UK7pWw",
    },
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: () => "movie/popular",
    }),
    getTopRatedMovies: builder.query({
      query: () => "movie/top_rated",
    }),
    upcomingMovies: builder.query({
      query: () => "movie/upcoming",
    }),
    searchMovies: builder.query({
      query: (search) => `search/multi?query=${search}&page=1`,
    }),
    configuration: builder.query({
      query: () => "/configuration",
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useSearchMoviesQuery,
  useUpcomingMoviesQuery,
  useConfigurationQuery,
} = popularMoviesApi;
