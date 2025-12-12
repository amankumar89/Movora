import React from "react";
import { Star, Calendar } from "lucide-react";
import type { Movie } from "../types/movie";
import { getImageUrl } from "../services/tmdb";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-success";
    if (rating >= 6) return "text-warning";
    return "text-error";
  };

  return (
    <div
      className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onClick(movie)}
    >
      <figure className="relative overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 badge badge-primary gap-1">
          <Star className="w-3 h-3 fill-current" />
          <span className="text-xs font-semibold">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </figure>

      <div className="card-body p-4">
        <h3 className="card-title text-sm font-bold line-clamp-2 min-h-[2.5rem]">
          {movie.title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-base-content/70">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(movie.release_date)}</span>
        </div>

        <p className="text-xs text-base-content/80 line-clamp-3 mt-2">
          {movie.overview}
        </p>

        <div className="card-actions justify-between items-center mt-4">
          <div
            className={`flex items-center gap-1 ${getRatingColor(
              movie.vote_average
            )}`}
          >
            <Star className="w-4 h-4 fill-current" />
            <span className="font-semibold text-sm">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          <button className="btn btn-primary btn-sm">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
