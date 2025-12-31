import React, { useContext } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";

const AddReview = () => {
  const { user } = useContext(authContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const title = form.title.value;
    const imageUrl = form.imageUrl.value;
    const review = form.review.value;
    const rating = Number(form.rating.value); // numeric
    const publishingYear = Number(form.publishingYear.value); // numeric
    const genre = form.genre.value;
    const reviewerName = user?.displayName; // spelling corrected
    const reviewerEmail = user?.email;

    const reviewData = {
      imageUrl,
      title,
      review,
      rating,
      publishingYear,
      genre,
      reviewerName,
      reviewerEmail,
    };
    console.log("Submitting review:", reviewData);

    fetch("https://a10-backend-eight.vercel.app/addReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          alert("✅ Review submitted successfully!");
          form.reset();
        } else {
          alert(
            `❌ Failed to submit review: ${data.message || "Unknown error"}`
          );
        }
        console.log("Server response:", data);
      })
      .catch((error) => {
        console.error("Network or server error:", error);
        alert("❌ Failed to submit review. Please check console for details.");
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-purple-400 mb-2">
            🎮 Add New Review
          </h2>
          <p className="text-slate-300 text-lg">
            Share your thoughts about your favorite games
          </p>
        </div>

        <div className="card bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Game Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate-300 font-semibold">
                    🎯 Game Title
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter the game title..."
                  className="input input-bordered bg-slate-700 border-purple-500/30 text-white placeholder-slate-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate-300 font-semibold">
                    🎯 Game Image URL
                  </span>
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Enter the game image URL..."
                  className="input input-bordered bg-slate-700 border-purple-500/30 text-white placeholder-slate-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  required
                />
              </div>

              {/* Review Text */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate-300 font-semibold">
                    📝 Your Review
                  </span>
                </label>
                <textarea
                  name="review"
                  placeholder="Share your detailed thoughts about this game..."
                  className="textarea textarea-bordered bg-slate-700 border-purple-500/30 text-white placeholder-slate-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 h-32 resize-none"
                  required
                ></textarea>
              </div>

              {/* Rating and Year Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-slate-300 font-semibold">
                      ⭐ Rating (1-10)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="rating"
                    min="1"
                    max="10"
                    placeholder="Rate from 1-10"
                    className="input input-bordered ..."
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-slate-300 font-semibold">
                      📅 Publishing Year
                    </span>
                  </label>
                  <input
                    type="number"
                    name="publishingYear"
                    min="1950"
                    max={new Date().getFullYear()}
                    placeholder="e.g. 2023"
                    className="input input-bordered ..."
                    required
                  />
                </div>
              </div>

              {/* Genre Selection */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate-300 font-semibold">
                    🎭 Game Genre
                  </span>
                </label>
                <select
                  name="genre"
                  className="select select-bordered bg-slate-700 border-purple-500/30 text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  required
                >
                  <option value="" disabled className="text-slate-400">
                    Select a genre
                  </option>
                  <option value="action" className="text-white bg-slate-700">
                    🎯 Action
                  </option>
                  <option value="rpg" className="text-white bg-slate-700">
                    ⚔️ RPG
                  </option>
                  <option value="adventure" className="text-white bg-slate-700">
                    🗺️ Adventure
                  </option>
                </select>
              </div>

              {/* User Info (Read-only) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-slate-300 font-semibold">
                      👤 Your Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={user?.displayName || ""}
                    readOnly
                    className="input input-bordered bg-slate-600 border-purple-500/20 text-slate-300 cursor-not-allowed"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-slate-300 font-semibold">
                      📧 Your Email
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered bg-slate-600 border-purple-500/20 text-slate-300 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-control pt-4">
                <button
                  type="submit"
                  className="btn bg-linear-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-600 text-white border-none shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-lg font-semibold py-3"
                >
                  🚀 Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 text-center">
          <div className="alert bg-slate-800/30 border border-purple-500/20 text-slate-300">
            <div>
              <span className="text-amber-400">💡 Tip:</span> Write detailed
              reviews to help other gamers make informed decisions!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
