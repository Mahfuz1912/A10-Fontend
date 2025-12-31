import React from "react";
import { FaStar, FaCalendarAlt, FaImage, FaGamepad } from "react-icons/fa";

const HighestRatedGameSection = ({ data }) => {
  // Sort games by rating in descending order and take top 4
  const highestRatedGames = data
    ? [...data] // Create a copy to avoid mutating original array
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 4)
    : [];

  // If no data or empty data array
  if (!data || data.length === 0) {
    return (
      <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Highest Rated Games
              </h2>
              <p className="text-slate-400">No games available</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
              >
                <div className="h-48 bg-slate-700/30 rounded-lg mb-4 flex flex-col items-center justify-center text-slate-400">
                  <FaGamepad className="text-4xl mb-2 opacity-50" />
                  <span>No game data</span>
                </div>
                <div className="space-y-2">
                  <div className="h-5 bg-slate-700/30 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-slate-700/30 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                <FaStar className="text-xl" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                Highest Rated Games
              </h2>
            </div>
            <p className="text-slate-400">Top picks based on user ratings</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 px-4 py-2 rounded-full">
            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            Top Rated · Updated Regularly
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highestRatedGames.map((game, index) => (
            <div
              key={game._id || game.id || index}
              className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-5 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1"
            >
              {/* Rank badge */}
              <div className="absolute -top-3 -left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-900">
                #{index + 1}
              </div>

              {/* Game Image */}
              <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg mb-4 overflow-hidden">
                {game.imageUrl ? (
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200/1e293b/94a3b8?text=Game+Image";
                      e.target.onerror = null;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                    <FaImage className="text-4xl mb-2 opacity-50" />
                    <span>No Image</span>
                  </div>
                )}
              </div>

              {/* Game Info */}
              <div>
                <h3 className="text-lg font-bold mb-2 line-clamp-1 group-hover:text-amber-200 transition-colors">
                  {game.title || "Untitled Game"}
                </h3>

                {/* Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <FaStar className="text-amber-500 mr-1" />
                      <span className="font-bold text-lg">
                        {game.rating ? game.rating.toFixed(1) : "N/A"}
                      </span>
                    </div>
                    <span className="text-slate-400 text-sm">/10</span>
                  </div>

                  {game.publishingYear && (
                    <div className="flex items-center text-slate-400">
                      <FaCalendarAlt className="mr-1" />
                      <span className="text-sm">{game.publishingYear}</span>
                    </div>
                  )}
                </div>

                {/* Genre Tags */}
                {game.genre && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.genre
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
                    {game.genre.split(",").length > 2 && (
                      <span className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded-full">
                        +{game.genre.split(",").length - 2}
                      </span>
                    )}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighestRatedGameSection;
