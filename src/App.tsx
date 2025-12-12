import { useState } from "react";
import { Film } from "lucide-react";
import type { Movie } from "./types/movie";
import SearchBar from "./components/SearchBar";
import CategoryTabs from "./components/CategoryTabs";
import MovieGrid from "./components/MovieGrid";
import MovieModal from "./components/MovieModal";
import { useMovies } from "./hooks/useMovies";

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    movies,
    loading,
    error,
    searchQuery,
    activeCategory,
    trendingTimeWindow,
    handleSearch,
    handleCategoryChange,
    handleTrendingTimeWindowChange,
  } = useMovies();

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const getCategoryTitle = () => {
    if (searchQuery.trim()) {
      return `Search Results for "${searchQuery}"`;
    }

    switch (activeCategory) {
      case "trending":
        return `Trending ${
          trendingTimeWindow === "day" ? "Today" : "This Week"
        }`;
      case "popular":
        return "Popular Movies";
      case "top_rated":
        return "Top Rated Movies";
      case "upcoming":
        return "Upcoming Movies";
      default:
        return "Movies";
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-base-100 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            {/* Logo and Title */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <Film className="w-8 h-8 text-primary" />
                <h1 className="text-2xl md:text-3xl font-bold">Movora</h1>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search for movies..."
            />

            {/* Category Tabs */}
            {!searchQuery && (
              <CategoryTabs
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                trendingTimeWindow={trendingTimeWindow}
                onTrendingTimeWindowChange={handleTrendingTimeWindowChange}
              />
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-center">
            {getCategoryTitle()}
          </h2>
          {movies.length > 0 && !loading && (
            <p className="text-center text-base-content/70 mt-2">
              {movies.length} movies found
            </p>
          )}
        </div>

        {error && (
          <div className="alert alert-error mb-8">
            <span>{error}</span>
          </div>
        )}

        <MovieGrid
          movies={movies}
          onMovieClick={handleMovieClick}
          loading={loading}
        />

        {/* Load More Button (placeholder for future pagination) */}
        {movies.length > 0 && !loading && !searchQuery && (
          <div className="text-center mt-12">
            <button className="btn btn-outline btn-wide">
              Load More Movies
            </button>
          </div>
        )}
      </main>

      {/* Movie Details Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Footer */}
      <footer className="bg-base-100 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Film className="w-5 h-5 text-primary" />
              <span className="font-semibold">Movora</span>
            </div>
            <p className="text-sm text-base-content/70">
              Developed By Aman Kumar
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
