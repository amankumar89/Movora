import { useState, useEffect, useCallback } from "react";
import type { Movie } from "../types/movie";
import {
  searchMovies,
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../services/tmdb";
import type { CategoryType } from "../components/CategoryTabs";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<CategoryType>("trending");
  const [trendingTimeWindow, setTrendingTimeWindow] = useState<"day" | "week">(
    "day"
  );

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let response;

      if (searchQuery.trim()) {
        response = await searchMovies(searchQuery);
      } else {
        switch (activeCategory) {
          case "trending":
            response = await getTrendingMovies(trendingTimeWindow);
            break;
          case "popular":
            response = await getPopularMovies();
            break;
          case "top_rated":
            response = await getTopRatedMovies();
            break;
          case "upcoming":
            response = await getUpcomingMovies();
            break;
          default:
            response = await getTrendingMovies();
        }
      }

      setMovies(response.results);
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, activeCategory, trendingTimeWindow]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback((category: CategoryType) => {
    setActiveCategory(category);
    setSearchQuery(""); // Clear search when changing category
  }, []);

  const handleTrendingTimeWindowChange = useCallback(
    (timeWindow: "day" | "week") => {
      setTrendingTimeWindow(timeWindow);
    },
    []
  );

  return {
    movies,
    loading,
    error,
    searchQuery,
    activeCategory,
    trendingTimeWindow,
    handleSearch,
    handleCategoryChange,
    handleTrendingTimeWindowChange,
    refetch: fetchMovies,
  };
};
