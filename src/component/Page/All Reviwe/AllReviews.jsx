import React, { useState, useEffect } from "react";
import ReviewsCard from "./ReviewsCard";
import { useLoaderData } from "react-router-dom";
import { FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp, FaGamepad, FaStar, FaCalendarAlt, FaList } from "react-icons/fa";

const AllReviews = () => {
  const data = useLoaderData();
  const [reviews, setReviews] = useState(data || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("rating-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const reviewsPerPage = 9;

  // Extract unique genres from data
  const genres = ["all", ...new Set(data?.flatMap(review => 
    review.genre?.split(',').map(g => g.trim()).filter(Boolean) || []
  ))];

  // Filter and sort reviews
  useEffect(() => {
    setIsLoading(true);
    
    let filtered = [...data];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(review =>
        review.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.genre?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply genre filter
    if (selectedGenre !== "all") {
      filtered = filtered.filter(review =>
        review.genre?.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating-desc":
          return (b.rating || 0) - (a.rating || 0);
        case "rating-asc":
          return (a.rating || 0) - (b.rating || 0);
        case "year-desc":
          return (b.publishingYear || 0) - (a.publishingYear || 0);
        case "year-asc":
          return (a.publishingYear || 0) - (b.publishingYear || 0);
        case "title-asc":
          return (a.title || "").localeCompare(b.title || "");
        case "title-desc":
          return (b.title || "").localeCompare(a.title || "");
        default:
          return 0;
      }
    });
    
    setReviews(filtered);
    setCurrentPage(1);
    setIsLoading(false);
  }, [data, searchQuery, selectedGenre, sortBy]);

  // Calculate pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedGenre("all");
    setSortBy("rating-desc");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-linear-to-r from-purple-900/30 via-slate-900 to-purple-900/30 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-purple-600/20 to-pink-600/20 px-6 py-3 rounded-full mb-6">
            <FaGamepad className="text-amber-400 text-xl" />
            <span className="text-lg font-medium text-amber-200">Game Reviews Collection</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-linear-to-r from-amber-200 via-white to-purple-200 bg-clip-text text-transparent">
              All Game Reviews
            </span>
          </h1>
          
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-8">
            Browse through our extensive collection of game reviews from the community.
            Discover new games, read detailed reviews, and share your own experiences.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50">
              <div className="text-3xl font-bold text-white mb-1">{data?.length || 0}</div>
              <div className="text-slate-300 flex items-center gap-2 justify-center">
                <FaList />
                Total Reviews
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50">
              <div className="text-3xl font-bold text-white mb-1">
                {Math.max(...data?.map(r => r.rating) || [0]).toFixed(1)}
              </div>
              <div className="text-slate-300 flex items-center gap-2 justify-center">
                <FaStar />
                Highest Rating
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50">
              <div className="text-3xl font-bold text-white mb-1">
                {new Set(data?.map(r => r.genre?.split(',')[0])).size}
              </div>
              <div className="text-slate-300 flex items-center gap-2 justify-center">
                <FaGamepad />
                Genres
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="w-full lg:w-1/3">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <FaSearch />
                </div>
                <input
                  type="text"
                  placeholder="Search games by title or genre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/70 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Genre Filter */}
            <div className="w-full lg:w-1/4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <FaFilter />
                </div>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/70 border border-slate-700 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="all" className="bg-slate-800">All Genres</option>
                  {genres.slice(1).map((genre) => (
                    <option key={genre} value={genre} className="bg-slate-800">
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Options */}
            <div className="w-full lg:w-1/4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  {sortBy.includes('desc') ? <FaSortAmountDown /> : <FaSortAmountUp />}
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/70 border border-slate-700 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="rating-desc" className="bg-slate-800">Rating: High to Low</option>
                  <option value="rating-asc" className="bg-slate-800">Rating: Low to High</option>
                  <option value="year-desc" className="bg-slate-800">Year: Newest First</option>
                  <option value="year-asc" className="bg-slate-800">Year: Oldest First</option>
                  <option value="title-asc" className="bg-slate-800">Title: A to Z</option>
                  <option value="title-desc" className="bg-slate-800">Title: Z to A</option>
                </select>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetFilters}
              className="w-full lg:w-auto px-6 py-3 bg-linear-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-medium rounded-xl border border-slate-600 transition-all duration-300 hover:shadow-lg"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
          <div className="text-slate-300 mb-4 sm:mb-0">
            Showing <span className="font-bold text-white">{currentReviews.length}</span> of{" "}
            <span className="font-bold text-white">{reviews.length}</span> reviews
            {selectedGenre !== "all" && (
              <span className="ml-2 px-3 py-1 bg-purple-900/30 text-purple-300 text-sm rounded-full border border-purple-700/50">
                Genre: {selectedGenre}
              </span>
            )}
          </div>
          <div className="text-slate-400 text-sm">
            Sorted by:{" "}
            <span className="text-amber-300 font-medium">
              {sortBy === "rating-desc" && "Highest Rated"}
              {sortBy === "rating-asc" && "Lowest Rated"}
              {sortBy === "year-desc" && "Newest"}
              {sortBy === "year-asc" && "Oldest"}
              {sortBy === "title-asc" && "Title A-Z"}
              {sortBy === "title-desc" && "Title Z-A"}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-300">Loading reviews...</p>
            </div>
          </div>
        ) : (
          <>
            {/* No Results State */}
            {currentReviews.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl font-bold text-white mb-2">No Reviews Found</h3>
                <p className="text-slate-300 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                {/* Reviews Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {currentReviews.map((review) => (
                    <ReviewsCard key={review._id} review={review} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700/50 transition-colors"
                    >
                      Previous
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                            currentPage === pageNumber
                              ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                              : "bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-700/50"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700/50 transition-colors"
                    >
                      Next
                    </button>

                    <div className="text-slate-400 text-sm ml-4">
                      Page {currentPage} of {totalPages}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllReviews;