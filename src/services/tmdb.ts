import axios from "axios";
import type { MovieDetails, Credits, MovieResponse } from "../types/movie";

const API_KEY = "6a93e63f25085202d7dbf316fc8de2f7";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getImageUrl = (
  path: string | null,
  size: string = "w500"
): string => {
  if (!path) return "/placeholder-movie.jpg";
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieResponse> => {
  const response = await tmdbApi.get("/search/movie", {
    params: { query, page },
  });
  return response.data;
};

export const getTrendingMovies = async (
  timeWindow: "day" | "week" = "day"
): Promise<MovieResponse> => {
  const response = await tmdbApi.get(`/trending/movie/${timeWindow}`);
  return response.data;
};

export const getPopularMovies = async (
  page: number = 1
): Promise<MovieResponse> => {
  const response = await tmdbApi.get("/movie/popular", {
    params: { page },
  });
  return response.data;
};

export const getTopRatedMovies = async (
  page: number = 1
): Promise<MovieResponse> => {
  const response = await tmdbApi.get("/movie/top_rated", {
    params: { page },
  });
  return response.data;
};

export const getUpcomingMovies = async (
  page: number = 1
): Promise<MovieResponse> => {
  const response = await tmdbApi.get("/movie/upcoming", {
    params: { page },
  });
  return response.data;
};

export const getMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (movieId: number): Promise<Credits> => {
  const response = await tmdbApi.get(`/movie/${movieId}/credits`);
  return response.data;
};
