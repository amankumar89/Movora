import React, { useState, useEffect } from 'react';
import { X, Star, Calendar, Clock, Users } from 'lucide-react';
import type { Movie, MovieDetails, Credits } from '../types/movie';
import { getImageUrl, getMovieDetails, getMovieCredits } from '../services/tmdb';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (movie && isOpen) {
      fetchMovieData();
    }
  }, [movie, isOpen]);

  const fetchMovieData = async () => {
    if (!movie) return;
    
    setLoading(true);
    try {
      const [details, movieCredits] = await Promise.all([
        getMovieDetails(movie.id),
        getMovieCredits(movie.id)
      ]);
      setMovieDetails(details);
      setCredits(movieCredits);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-success';
    if (rating >= 6) return 'text-warning';
    return 'text-error';
  };

  if (!movie || !isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl w-full max-h-screen overflow-y-auto">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  src={getImageUrl(movie.poster_path, 'w342')}
                  alt={movie.title}
                  className="w-48 h-72 object-cover rounded-lg mx-auto md:mx-0"
                />
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">{movie.title}</h2>
                  {movieDetails?.tagline && (
                    <p className="text-base-content/70 italic mt-1">{movieDetails.tagline}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className={`flex items-center gap-1 ${getRatingColor(movie.vote_average)}`}>
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-base-content/50">({movie.vote_count} votes)</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-base-content/70">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(movie.release_date)}</span>
                  </div>
                  
                  {movieDetails?.runtime && (
                    <div className="flex items-center gap-1 text-base-content/70">
                      <Clock className="w-4 h-4" />
                      <span>{formatRuntime(movieDetails.runtime)}</span>
                    </div>
                  )}
                </div>

                {movieDetails?.genres && (
                  <div className="flex flex-wrap gap-2">
                    {movieDetails.genres.map((genre) => (
                      <span key={genre.id} className="badge badge-outline">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-base-content/80 leading-relaxed">
                  {movie.overview}
                </p>
              </div>
            </div>

            {/* Cast Section */}
            {credits?.cast && credits.cast.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5" />
                  <h3 className="text-xl font-semibold">Cast</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {credits.cast.slice(0, 8).map((actor) => (
                    <div key={actor.id} className="text-center">
                      <div className="avatar">
                        <div className="w-16 h-16 rounded-full">
                          <img
                            src={getImageUrl(actor.profile_path, 'w185') || '/placeholder-person.jpg'}
                            alt={actor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <h4 className="font-semibold text-sm mt-2">{actor.name}</h4>
                      <p className="text-xs text-base-content/70">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Details */}
            {movieDetails && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {movieDetails.budget > 0 && (
                  <div>
                    <span className="font-semibold">Budget:</span>
                    <span className="ml-2">${movieDetails.budget.toLocaleString()}</span>
                  </div>
                )}
                
                {movieDetails.revenue > 0 && (
                  <div>
                    <span className="font-semibold">Revenue:</span>
                    <span className="ml-2">${movieDetails.revenue.toLocaleString()}</span>
                  </div>
                )}
                
                <div>
                  <span className="font-semibold">Status:</span>
                  <span className="ml-2">{movieDetails.status}</span>
                </div>
                
                <div>
                  <span className="font-semibold">Original Language:</span>
                  <span className="ml-2">{movieDetails.original_language.toUpperCase()}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default MovieModal;