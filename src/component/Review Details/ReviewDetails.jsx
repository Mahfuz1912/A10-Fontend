import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";

const ReviewDetails = () => {
  const review = useLoaderData();
  const { user } = useContext(authContext);
  console.log(review);

  const renderStars = (rating) => {
    const stars = [];
    const numeric = Number(rating) || 0;
    for (let i = 1; i <= 5; i++) {
      const filled = i <= Math.round(numeric / 2);
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${filled ? "text-amber-400" : "text-gray-400"}`}
          fill={filled ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.376-2.455a1 1 0 00-1.176 0L6.21 18.95c-.785.57-1.84-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.217 9.293c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.966z"
          />
        </svg>
      );
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

const handleAddToWatchList = (review) => {
  const watchListData = {
    reviewId: review._id,
    imageUrl: review.imageUrl,
    title: review.title,
    review: review.review,
    rating: review.rating,
    publishingYear: review.publishingYear,
    genre: review.genre,
    reviewerName: review.reviwerName,
    reviewerEmail: review.reviewerEmail,
    addWatchListReviewerName: user.displayName,
    addWatchListReviewerEmail: user.email,
  };

  fetch("https://a10-backend-eight.vercel.app/watchlist", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(watchListData),
  })
    .then(res => res.json())
    .then(data => console.log(data));
};


  return (
    <div className="min-h-screen py-12 px-4 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Review Details
        </h2>

        <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Left: Image */}
          <div className="md:col-span-1">
            <img
              src={review.imageUrl}
              alt={review.title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="md:col-span-2 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {review.title}
                  </h3>
                  <div className="mt-2 items-center gap-3">
                    <p>
                      {" "}
                      <span className="text-white font- text-sm">Genre: </span>
                      <span className="badge badge-sm bg-purple-600 text-white">
                        {review.genre}
                      </span>
                    </p>
                    <h1 className="text-sm text-slate-300">
                      Published: {review.publishingYear}
                    </h1>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-slate-300">Rating</div>
                  <div className="mt-1">{renderStars(review.rating)}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {review.rating}/10
                  </div>
                </div>
              </div>

              <div className="mt-6 text-slate-200 leading-relaxed">
                {review.review}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex gap-3">
                <button
                  onClick={() => handleAddToWatchList(review)}
                  className="btn bg-linear-to-r from-purple-600 to-amber-500 text-white border-none shadow"
                >
                  ➡️ Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
