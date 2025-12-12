import React from "react";
import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  loading?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  onMovieClick,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="card bg-base-200 animate-pulse">
            <div className="h-64 sm:h-80 bg-base-300 rounded-t-lg"></div>
            <div className="card-body p-4 space-y-2">
              <div className="h-4 bg-base-300 rounded w-3/4"></div>
              <div className="h-3 bg-base-300 rounded w-1/2"></div>
              <div className="h-3 bg-base-300 rounded w-full"></div>
              <div className="h-3 bg-base-300 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-semibold mb-2">No movies found</h3>
        <p className="text-base-content/70">Try adjusting your search terms</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  );
};

export default MovieGrid;
