import React, { useContext, useEffect, useState, useMemo } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { authContext } from "../../AuthProvider/AuthProvider";
import MyReviewCard from "./MyReviewCard";
import { FaGamepad, FaStar, FaCalendarAlt, FaSortAmountDown, FaPlus, FaSpinner } from "react-icons/fa";

const MyReview = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const normalizedData = useMemo(
    () => (Array.isArray(data) ? data : []),
    [data]
  );
  const { user, loading } = useContext(authContext);
  const [myReviews, setMyReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Array.isArray(normalizedData) || !user) {
      setIsLoading(false);
      return;
    }
    
    const filtered = normalizedData.filter(
      (review) => review.reviewerEmail === user.email
    );
    
    setMyReviews(filtered);
    setFilteredReviews(filtered);
    setIsLoading(false);
  }, [normalizedData, user]);

  useEffect(() => {
    let filtered = [...myReviews];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(review =>
        review.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.genre?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "date-asc":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case "rating-desc":
          return (b.rating || 0) - (a.rating || 0);
        case "rating-asc":
          return (a.rating || 0) - (b.rating || 0);
        case "title-asc":
          return (a.title || "").localeCompare(b.title || "");
        case "title-desc":
          return (b.title || "").localeCompare(a.title || "");
        default:
          return 0;
      }
    });
    
    setFilteredReviews(filtered);
  }, [myReviews, searchQuery, sortBy]);

  const handleDelete = (id) => {
    setMyReviews(prev => prev.filter((r) => r._id !== id));
    setFilteredReviews(prev => prev.filter((r) => r._id !== id));
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-purple-500 mb-4" />
        <p className="text-slate-300 text-lg">Loading your reviews...</p>
      </div>
    );
  }

  if (!user || !user.email) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50">
            <div className="text-6xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
            <p className="text-slate-300 mb-6">
              Please login to view and manage your game reviews.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalReviews = myReviews.length;
  const avgRating = totalReviews > 0 
    ? (myReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / totalReviews).toFixed(1)
    : "0.0";
  const latestYear = totalReviews > 0
    ? Math.max(...myReviews.map(r => r.publishingYear || 0))
    : "N/A";

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-purple-600/20 to-pink-600/20 px-4 py-2 rounded-full mb-4">
                <FaGamepad className="text-amber-400" />
                <span className="text-sm font-medium text-amber-200">Your Game Reviews</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                Manage Your Reviews
              </h1>
              <p className="text-lg text-slate-300">
                View, edit, and delete your game reviews all in one place
              </p>
            </div>
            
            <button
              onClick={() => navigate("/addreview")}
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <FaPlus />
              Add New Review
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white">{totalReviews}</div>
                  <div className="text-sm text-slate-400">Total Reviews</div>
                </div>
                <div className="p-3 bg-purple-600/20 rounded-xl">
                  <FaGamepad className="text-2xl text-purple-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white">{avgRating}</div>
                  <div className="text-sm text-slate-400">Average Rating</div>
                </div>
                <div className="p-3 bg-amber-600/20 rounded-xl">
                  <FaStar className="text-2xl text-amber-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white">{latestYear}</div>
                  <div className="text-sm text-slate-400">Latest Game Year</div>
                </div>
                <div className="p-3 bg-blue-600/20 rounded-xl">
                  <FaCalendarAlt className="text-2xl text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="w-full lg:w-2/5">
              <div className="relative">
                <div className="absolute left-4 top-3.5 text-slate-400">
                  🔍
                </div>
                <input
                  type="text"
                  placeholder="Search your reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/70 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="w-full lg:w-2/5">
              <div className="relative">
                <div className="absolute left-4 top-3.5 text-slate-400">
                  <FaSortAmountDown />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/70 border border-slate-700 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="date-desc" className="bg-slate-800">Newest First</option>
                  <option value="date-asc" className="bg-slate-800">Oldest First</option>
                  <option value="rating-desc" className="bg-slate-800">Highest Rated</option>
                  <option value="rating-asc" className="bg-slate-800">Lowest Rated</option>
                  <option value="title-asc" className="bg-slate-800">Title A-Z</option>
                  <option value="title-desc" className="bg-slate-800">Title Z-A</option>
                </select>
              </div>
            </div>

            <div className="w-full lg:w-1/5 text-center">
              <div className="text-sm text-slate-400 mb-1">Showing</div>
              <div className="text-2xl font-bold text-white">
                {filteredReviews.length} <span className="text-sm text-slate-400">of {totalReviews}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div>
          {filteredReviews.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex p-6 bg-slate-800/50 rounded-2xl mb-6">
                <div className="text-6xl">📝</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {totalReviews === 0 ? "No Reviews Yet" : "No Matching Reviews"}
              </h3>
              <p className="text-slate-300 mb-6 max-w-md mx-auto">
                {totalReviews === 0 
                  ? "You haven't posted any game reviews yet. Start by sharing your thoughts on your favorite games!"
                  : "Try adjusting your search or filter criteria to find what you're looking for."
                }
              </p>
              {totalReviews === 0 && (
                <button
                  onClick={() => navigate("/addreview")}
                  className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                >
                  Create Your First Review
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredReviews.map((review, index) => (
                <MyReviewCard
                  key={review._id}
                  review={review}
                  index={index}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReview;