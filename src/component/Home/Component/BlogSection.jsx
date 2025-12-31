import React from "react";

const BlogSection = () => {
  return (
    <section className="py-12 bg-linear-to-b from-slate-900 to-slate-800 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Blog</h2>
        <p className="text-slate-300 mb-8">Blog Coming Soon......</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <article
              key={n}
              className="bg-slate-800/50 p-5 rounded-lg border border-slate-700"
            >
              <div className="h-40 bg-slate-700/30 rounded mb-4 object-cover flex items-center justify-center text-slate-400">
                Preview
              </div>
              <div className="h-4 bg-slate-700/30 rounded w-3/4 mb-2 animate-pulse" />
              <div className="h-3 bg-slate-700/30 rounded w-1/2 animate-pulse" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
