import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaStar, FaCalendarAlt, FaGamepad, FaEye, FaEllipsisV } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const MyReviewCard = ({ review, index, onDelete }) => {
  const { title, genre, publishingYear, rating, imageUrl, _id, review: reviewText } = review;
  const [showActions, setShowActions] = useState(false);

  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      title: "Delete Review?",
      html: `<p>Are you sure you want to delete your review of <strong>"${title}"</strong>?</p><p class="text-sm text-gray-400 mt-2">This action cannot be undone.</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`https://a10-backend-eight.vercel.app/deleteReview/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (data && (data.deletedCount > 0 || data.ok || data.success)) {
        if (typeof onDelete === "function") onDelete(id);
        
        await Swal.fire({
          title: "Deleted!",
          text: `Your review of "${title}" has been deleted.`,
          icon: "success",
          confirmButtonColor: "#8b5cf6",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete the review. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;

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

  return (
    <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 overflow-hidden">
      {/* Card Header with Index */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
            {index + 1}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <FaGamepad className="text-slate-500" />
            <span>Your Review</span>
          </div>
        </div>
        
        {/* Actions Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          >
            <FaEllipsisV />
          </button>
          
          {showActions && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800/95 backdrop-blur-lg border border-slate-700 rounded-xl shadow-2xl z-10 overflow-hidden">
              <NavLink
                to={`/reviewdetails/${_id}`}
                className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                onClick={() => setShowActions(false)}
              >
                <FaEye />
                View Details
              </NavLink>
              <NavLink
                to={`/updateReview/${_id}`}
                className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                onClick={() => setShowActions(false)}
              >
                <FaEdit />
                Edit Review
              </NavLink>
              <button
                onClick={() => {
                  setShowActions(false);
                  handleDelete(_id, title);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-600/20 transition-colors"
              >
                <FaTrashAlt />
                Delete Review
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Game Image */}
          <div className="flex-shrink-0">
            <div className="relative w-full lg:w-48 h-48 rounded-xl overflow-hidden border border-slate-700/50">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300/1e293b/94a3b8?text=Game+Image";
                  e.target.onerror = null;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            </div>
          </div>

          {/* Game Info */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {title}
                </h3>
                
                {/* Genre Tags */}
                {genre && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {genre.split(',').slice(0, 2).map((g, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600"
                      >
                        {g.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-1">
                  {renderStars(rating)}
                  <span className="text-2xl font-bold text-white">
                    {rating}<span className="text-sm text-slate-400">/10</span>
                  </span>
                </div>
                <div className="text-sm text-slate-400">Your Rating</div>
              </div>
            </div>

            {/* Review Preview */}
            <div className="mb-6">
              <div className="text-sm text-slate-400 mb-2">Your Review</div>
              <p className="text-slate-300 line-clamp-3">
                {reviewText || "No review text available"}
              </p>
            </div>

            {/* Stats and Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-700/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <FaCalendarAlt className="text-slate-500" />
                  <span className="text-white font-medium">{publishingYear}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <NavLink
                  to={`/reviewdetails/${_id}`}
                  className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 flex items-center gap-2"
                >
                  <FaEye />
                  View
                </NavLink>
                <NavLink
                  to={`/updateReview/${_id}`}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-blue-600/10 border border-blue-500/30 rounded-lg text-blue-400 hover:text-white hover:bg-blue-600/30 transition-all duration-300 flex items-center gap-2"
                >
                  <FaEdit />
                  Edit
                </NavLink>
                <button
                  onClick={() => handleDelete(_id, title)}
                  className="px-4 py-2 bg-gradient-to-r from-red-600/20 to-red-600/10 border border-red-500/30 rounded-lg text-red-400 hover:text-white hover:bg-red-600/30 transition-all duration-300 flex items-center gap-2"
                >
                  <FaTrashAlt />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviewCard;