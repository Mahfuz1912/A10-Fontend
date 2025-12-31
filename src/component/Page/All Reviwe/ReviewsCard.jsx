import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaCalendarAlt, FaGamepad, FaEye } from "react-icons/fa";

const ReviewsCard = ({ review }) => {
  const { imageUrl, title, rating, publishingYear, genre, _id } = review;
  const [isHovered, setIsHovered] = useState(false);

  // Calculate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

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
    <div className="group">
      <Link to={`/reviewdetails/${_id}`} className="block">
        <div
          className="relative bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Game Image with Overlay */}
          <div className="relative overflow-hidden">
            <div className="h-64 w-full">
              <img
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
                src={imageUrl}
                alt={title}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300/1e293b/94a3b8?text=Game+Image";
                  e.target.onerror = null;
                }}
              />
            </div>

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent opacity-80"></div>

            {/* Rating Badge */}
            <div className="absolute top-3 left-3">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-linear-to-r from-amber-600 to-orange-600 rounded-full backdrop-blur-sm">
                <FaStar className="text-white text-sm" />
                <span className="text-white font-bold">{rating}</span>
              </div>
            </div>
            {/* Year Badge */}
            {publishingYear && (
              <div className="absolute bottom-3 right-3">
                <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-900/80 border border-slate-700/50 rounded-full backdrop-blur-sm">
                  <FaCalendarAlt className="text-slate-300 text-xs" />
                  <span className="text-slate-200 text-sm font-medium">
                    {publishingYear}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Card Content */}
          <div className="p-5">
            {/* Game Title */}
            <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-purple-300 transition-colors">
              {title}
            </h3>

            {/* Star Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">{renderStars()}</div>
              <span className="text-slate-300 text-sm font-semibold">
                {rating}/10
              </span>
            </div>

            {/* Genre Tags */}
            {genre && (
              <div className="flex flex-wrap gap-2 mb-5">
                {genre
                  .split(",")
                  .slice(0, 2)
                  .map((g, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600"
                    >
                      {g.trim()}
                    </span>
                  ))}
                {genre.split(",").length > 2 && (
                  <span className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded-full">
                    +{genre.split(",").length - 2}
                  </span>
                )}
              </div>
            )}

            {/* View Details Button */}
            <div className="relative overflow-hidden rounded-xl bg-linear-to-r from-slate-700/50 to-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-all duration-300">
              <button className="w-full py-3 cursor-pointer text-center group">
                <div className="flex items-center justify-center gap-2 text-white font-semibold">
                  <FaEye className="transition-transform duration-300 group-hover:translate-x-1" />
                  <span>View Details</span>
                </div>
                <div className="absolute inset-0 bg-linear-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <FaGamepad className="text-slate-500" />
                <span>Game Review</span>
              </div>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </Link>
    </div>
  );
};

export default ReviewsCard;
