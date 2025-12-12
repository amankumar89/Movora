import axios from "axios";
import type { MovieDetails, Credits, MovieResponse } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

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
