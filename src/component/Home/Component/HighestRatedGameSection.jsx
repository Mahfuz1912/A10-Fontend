import React from "react";

const HighestRatedGameSection = () => {
  return (
    <section className="py-12 bg-linear-to-b from-slate-900 to-slate-800 text-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Highest Rated Games
            </h2>
            <p className="text-slate-400">Coming Soon......</p>
          </div>
          <div className="text-sm text-slate-500 hidden md:block">
            Curated picks · Updated regularly
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:scale-[1.01] transition-transform"
            >
              <div className="h-36 bg-slate-700/30 rounded mb-4 flex items-center justify-center text-slate-400">
                Image
              </div>
              <div className="h-4 bg-slate-700/30 rounded w-3/4 mb-2 animate-pulse" />
              <div className="h-3 bg-slate-700/30 rounded w-1/2 animate-pulse" />
              <div className="mt-3 flex items-center justify-between">
                <span className="badge bg-amber-500 text-black">
                  COMING SOON
                </span>
                <span className="text-slate-400 text-sm">—</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighestRatedGameSection;
