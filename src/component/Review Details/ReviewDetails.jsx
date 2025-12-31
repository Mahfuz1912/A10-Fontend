import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";
import {
  FaStar,
  FaCalendarAlt,
  FaGamepad,
  FaUser,
  FaBookmark,
  FaArrowLeft,
  FaClock,
  FaTag,
  FaEnvelope,
  FaPlus,
} from "react-icons/fa";
import Swal from "sweetalert2";

const ReviewDetails = () => {
  const review = useLoaderData();
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const {
    _id,
    imageUrl,
    title,
    review: reviewText,
    rating,
    publishingYear,
    genre,
    reviewerName,
    reviewerEmail,
    createdAt,
  } = review;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Render stars with visual rating
  const renderStars = (ratingValue) => {
    const numericRating = Number(ratingValue) || 0;
    const fullStars = Math.floor(numericRating / 2);
    const hasHalfStar = numericRating % 2 >= 1;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-amber-500 fill-current" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <FaStar className="text-gray-300 fill-current" />
            <FaStar className="text-amber-500 fill-current absolute top-0 left-0 w-1/2 overflow-hidden" />
          </div>
        );
      } else {
        stars.push(<FaStar key={i} className="text-gray-300 fill-current" />);
      }
    }
    return stars;
  };

  // Calculate rating percentage for visual bar
  const ratingPercentage = (rating / 10) * 100;

  const handleAddToWatchList = async () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to add games to your watchlist",
        icon: "warning",
        confirmButtonColor: "#8b5cf6",
        showCancelButton: true,
        cancelButtonColor: "#64748b",
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    setIsLoading(true);

    const watchListData = {
      reviewId: _id,
      imageUrl,
      title,
      review: reviewText,
      rating,
      publishingYear,
      genre,
      reviewerName,
      reviewerEmail,
      addWatchListReviewerName: user.displayName,
      addWatchListReviewerEmail: user.email,
      addedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "https://a10-backend-eight.vercel.app/watchlist",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(watchListData),
        }
      );

      const data = await response.json();

      if (data.insertedId) {
        setIsInWatchlist(true);
        await Swal.fire({
          title: "Added to Watchlist!",
          html: `
            <div class="text-center">
              <div class="text-5xl mb-4">🎮</div>
              <p class="text-lg mb-2"><strong>"${title}"</strong> has been added to your watchlist!</p>
              <p class="text-sm text-slate-400">You can view it in your watchlist anytime.</p>
            </div>
          `,
          icon: "success",
          confirmButtonColor: "#8b5cf6",
          confirmButtonText: "View Watchlist",
          showCancelButton: true,
          cancelButtonText: "Continue Browsing",
          timer: 3000,
          timerProgressBar: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/watchlist");
          }
        });
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to add to watchlist. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all duration-300 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Reviews
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-purple-600/20 to-pink-600/20 px-4 py-2 rounded-full mb-4">
                <FaGamepad className="text-amber-400" />
                <span className="text-sm font-medium text-amber-200">
                  Game Review
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-300">
                <div className="flex items-center gap-2">
                  <FaUser className="text-slate-400" />
                  <span>By {reviewerName || "Anonymous"}</span>
                </div>
                {createdAt && (
                  <div className="flex items-center gap-2">
                    <FaClock className="text-slate-400" />
                    <span>{formatDate(createdAt)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToWatchList}
                disabled={isLoading || isInWatchlist}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isLoading || isInWatchlist
                    ? "bg-green-600/20 border border-green-500/30 text-green-400 cursor-not-allowed"
                    : "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : isInWatchlist ? (
                  <>
                    <FaBookmark className="fill-current" />
                    In Watchlist
                  </>
                ) : (
                  <>
                    <FaPlus />
                    Add to Watchlist
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Game Info & Image */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden mb-6 border border-slate-700 shadow-2xl">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x400/1e293b/94a3b8?text=Game+Image";
                  e.target.onerror = null;
                }}
              />
            </div>

            {/* Review Content */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-8 bg-linear-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">Review</h2>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="text-slate-200 leading-relaxed whitespace-pre-line text-lg">
                  {reviewText}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details & Stats */}
          <div className="space-y-6">
            {/* Rating Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaStar className="text-amber-500" />
                Rating
              </h3>

              <div className="space-y-4">
                {/* Star Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {renderStars(rating)}
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {rating}
                    <span className="text-lg text-slate-400">/10</span>
                  </div>
                </div>

                {/* Rating Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Overall Rating</span>
                    <span className="text-white font-semibold">
                      {rating}/10
                    </span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000"
                      style={{ width: `${ratingPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Rating Description */}
                <div className="text-center pt-2">
                  <p className="text-slate-300 text-sm">
                    {rating >= 9
                      ? "Excellent"
                      : rating >= 7
                      ? "Good"
                      : rating >= 5
                      ? "Average"
                      : "Below Average"}
                  </p>
                </div>
              </div>
            </div>

            {/* Game Details Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaGamepad />
                Game Details
              </h3>

              <div className="space-y-4">
                {/* Publishing Year */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-700/50 rounded-lg">
                    <FaCalendarAlt className="text-slate-300" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Release Year</div>
                    <div className="text-white font-semibold">
                      {publishingYear || "N/A"}
                    </div>
                  </div>
                </div>

                {/* Genre */}
                {genre && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-700/50 rounded-lg mt-1">
                      <FaTag className="text-slate-300" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-2">Genre</div>
                      <div className="flex flex-wrap gap-2">
                        {genre.split(",").map((g, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-linear-to-r from-purple-900/30 to-pink-900/30 text-purple-300 text-sm rounded-full border border-purple-700/50"
                          >
                            {g.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reviewer Info Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaUser />
                Reviewer
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    {reviewerName?.[0]?.toUpperCase() || "A"}
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {reviewerName || "Anonymous"}
                    </div>
                    <div className="text-sm text-slate-400 flex items-center gap-1">
                      <FaEnvelope className="text-xs" />
                      {reviewerEmail || "No email provided"}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/50">
                  <div className="text-sm text-slate-400 mb-2">
                    Review Stats
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-2xl font-bold text-white">
                        {rating}
                      </div>
                      <div className="text-xs text-slate-400">Rating Given</div>
                    </div>
                    <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-2xl font-bold text-white">
                        {publishingYear || "N/A"}
                      </div>
                      <div className="text-xs text-slate-400">Release Year</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
